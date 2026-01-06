'use client'
import { use } from 'react'
import type { Task } from '@/lib/generated/prisma/client'
import PaginationButton from '../buttons/pagination-button'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import TaskDisplay from './task-display'
export default function TasksCard({
	tasksPromise,
	pagePromise,
}: {
	tasksPromise: Promise<Task[]>
	pagePromise: Promise<number>
}) {
	const tasks = use(tasksPromise)
	const page = use(pagePromise)

	if (tasks.length < 1) return null
	const completed = tasks.length > 0 ? tasks[0].completed : false

	const pageNumber = page ?? 1

	console.log(page, pageNumber)
	return (
		<div className="w-full rounded-xl shadow-lg md:w-4/6">
			<Card>
				<CardHeader>{completed ? 'Completed ' : ' '} Tasks</CardHeader>

				<CardContent>
					{tasks.map((task, index) => (
						<TaskDisplay
							key={task.name + index}
							page={pageNumber}
							task={task}
						/>
					))}
					<CardFooter>
						<PaginationButton back completed={completed} />
						<PaginationButton completed={completed} />
					</CardFooter>
				</CardContent>
			</Card>
		</div>
	)
}
