'use client'
import { use } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import TaskDisplay from './task-display'
export default function TasksCard({
	tasksPromise,
}: {
	tasksPromise: Promise<
		{
			id: string
			name: string
			type: string
			due_date: string
			description: string
			completed: boolean
		}[]
	>
}) {
	const tasks = use(tasksPromise)
	
	const completed = tasks.length > 0 ? tasks[0].completed : false

	return (
		<div className="w-full md:w-4/6">
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
