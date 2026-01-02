'use server'

import { revalidatePath, updateTag } from 'next/cache'
import type z from 'zod'
import type { Task } from '@/lib/generated/prisma/client'
import prisma from '@/lib/prisma'
import type { formSchema } from '@/zod/tasks-schema'

export async function toggleComplete(id: string, completed: boolean) {
	await prisma.task.update({
		where: { id },
		data: { completed: !completed },
	})
	revalidatePath('/', 'page')
}

export async function deleteTaskAction(
	id: string,
	page: number,
	pageCompleted: number,
) {
	await prisma.task.delete({
		where: { id },
	})
	updateTag(`tasks-${false}-${pageCompleted}`)
	updateTag(`tasks-${true}-${pageCompleted}`)
	updateTag(`tasks-${false}-${page}`)
	updateTag(`tasks-${true}-${page}`)
}

export async function newTaskAction(data: z.infer<typeof formSchema>) {
	let result: Task
	try {
		result = await prisma.task.create({
			data: {
				name: data.name,
				type: data.typeOfTask,
				due_date: new Date(data.dueDate).toISOString(),
				description: data.details,
				completed: false,
			},
		})
		console.log('result for adding new task: ', result)
		if (!result) throw new Error('Error adding task.')
	} catch (e: unknown) {
		console.error('Error adding task: ', e)
		return { error: 'Error updating DB.' }
	}
	// await updateTag('tasks')
	return result
}
