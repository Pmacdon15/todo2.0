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

	const pageSize = 10
	const skip = (pageNumber - 1) * pageSize

	cacheTag(`tasks-${completed}-${pageNumber}`)

	const tasksPlusOne = await prisma.task.findMany({
		where: { completed },
		skip,
		take: pageSize + 1, // 👈 only change
		orderBy: {
			due_date: 'asc',
		},
	})

	const hasMore = tasksPlusOne.length > pageSize

	const tasks = hasMore
		? tasksPlusOne.slice(0, pageSize)
		: tasksPlusOne

	return {
		tasks,
		hasMore,
	}
}
