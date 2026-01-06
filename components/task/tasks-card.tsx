'use client'
import { use } from 'react'
import type { Task } from '@/lib/generated/prisma/client'
import PaginationButton from '../buttons/pagination-button'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import TaskDisplay from './task-display'
import NotTasksFallback from '../fallbacks/no-tasks-fallback'
export default function TasksCard({
	tasksPromise,
	pagePromise,
}: {
	tasksPromise: Promise<{
		tasks: Task[]
		hasMore: boolean
	}>
	pagePromise: Promise<number>
}) {
	const tasks = use(tasksPromise)
	const page = use(pagePromise)

	if (tasks.tasks.length < 1) return <NotTasksFallback />
	const completed = tasks.tasks.length > 0 ? tasks.tasks[0].completed : false

	const pageNumber = page ?? 1

	console.log(page, pageNumber)
	return (
		<div className="w-full rounded-xl shadow-lg md:w-4/6">
			<Card>
				<CardHeader>{completed ? 'Completed ' : ' '} Tasks</CardHeader>

				<CardContent>
					{tasks.tasks.map((task, index) => (
						<TaskDisplay
							key={task.name + index}
							page={pageNumber}
							task={task}
						/>
					))}
					<CardFooter className="mt-4 flex justify-between p-8">
						<PaginationButton
							back
							completed={completed}
							hasMore={tasks.hasMore}
						/>
						<PaginationButton
							completed={completed}
							hasMore={tasks.hasMore}
						/>
					</CardFooter>
				</CardContent>
			</Card>
		</div>
	)
}
