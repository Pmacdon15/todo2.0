'use client'
import { use } from 'react'
import type { Task } from '@/lib/generated/prisma/client'
import { Card, CardContent, CardHeader } from '../ui/card'
import TaskDisplay from './task-display'
export default function TasksCard({
	tasksPromise,
}: {
	tasksPromise: Promise<Task[]>
}) {
	const tasks = use(tasksPromise)

	const completed = tasks.length > 0 ? tasks[0].completed : false

	return (
		<div className="w-full rounded-xl shadow-lg md:w-4/6">
			<Card>
				<CardHeader>{completed ? 'Completed ' : ' '} Tasks</CardHeader>

				<CardContent>
					{tasks.map((task, index) => (
						<TaskDisplay key={task.name + index} task={task} />
					))}
				</CardContent>
			</Card>
		</div>
	)
}
