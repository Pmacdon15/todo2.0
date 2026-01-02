'use server'

import type z from 'zod'
import type { Task } from '@/lib/generated/prisma/client'
import prisma from '@/lib/prisma'
import type { formSchema } from '@/zod/tasks-schema'

export async function toggleTaskAction(id: string, completed: boolean) {
	let result: Task
	try {
		result = await prisma.task.update({
			where: { id },
			data: { completed: !completed },
		})
		console.log('result for toggling completed: ', result)
		if (!result) throw new Error('Error toggling task completed.')
	} catch (e: unknown) {
		console.error('Error toggling task completed: ', e)
		return { error: 'Error updating DB.' }
	}
	return result
}

export async function deleteTaskAction(id: string) {
	let result: Task
	try {
		result = await prisma.task.delete({
			where: { id },
		})
		console.log('result for deleting task: ', result)
		if (!result) throw new Error('Error adding task.')
	} catch (e: unknown) {
		console.error('Error deleting task: ', e)
		return { error: 'Error updating DB.' }
	}
	return result
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
