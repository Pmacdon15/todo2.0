import { cacheTag } from 'next/cache'
import prisma from '@/lib/prisma'

export async function fetchTasks() {
	'use cache'
	cacheTag('tasks')
	return await prisma.task.findMany()
}
