import { cacheTag } from 'next/cache'
import prisma from '@/lib/prisma'

export async function fetchTasks(
	page: string | string[] | undefined,
	completed: boolean,
) {
	'use cache'
	const pageNumber = page
		? Array.isArray(page)
			? parseInt(page[0], 10)
			: parseInt(page, 10)
		: 1
	cacheTag(`tasks-${completed}-${pageNumber}`)
	const pageSize = 10

	const skip = (pageNumber - 1) * pageSize

	const tasks = await prisma.task.findMany({
		where: {
			completed,
		},
		skip,
		take: pageSize,
		orderBy: {
			due_date: 'asc',
		},
	})
	console.log(tasks)
	return tasks
}
