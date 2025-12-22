import prisma from '@/lib/prisma'

export async function fetchTasks() {
    'use cache'
	return await prisma.task.findMany()
}
