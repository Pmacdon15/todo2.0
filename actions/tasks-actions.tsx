'use server'

import { updateTag } from 'next/cache'
import prisma from '@/lib/prisma'

export async function toggleComplete(id: string, completed: boolean) {
	await prisma.task.update({
		where: { id },
		data: { completed: !completed },
	})
	await updateTag('tasks')
}
