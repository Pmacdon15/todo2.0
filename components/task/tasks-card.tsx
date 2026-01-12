'use client'
import { use } from 'react'
import type { Task } from '@/lib/generated/prisma/client'
import PaginationButton from '../buttons/pagination-button'
import NotTasksFallback from '../fallbacks/no-tasks-fallback'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import TaskDisplay from './task-display'
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
		<div className="w-full max-w-2xl rounded-3xl p-1 overflow-hidden transition-all duration-300 hover:shadow-2xl">
			<Card className="glass glass-dark border-none shadow-none">
				<CardHeader className="p-8 pb-4">
					<h2 className="font-semibold text-2xl text-foreground/80">
						{completed ? 'Completed ' : 'Active '} Tasks
					</h2>
				</CardHeader>

				<CardContent className="p-0">
					<div className="flex flex-col">
						{tasks.tasks.map((task, index) => (
							<TaskDisplay
								key={task.name + index}
								page={pageNumber}
								task={task}
							/>
						))}
					</div>
					<CardFooter className="flex justify-between p-8 pt-4">
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
