'use client'
import { Activity, useState, ViewTransition } from 'react'
import { toggleComplete } from '@/actions/tasks-actions'
import type { Task } from '@/lib/generated/prisma/client'
import DeleteTaskButton from '../buttons/delete-task-button'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export default function TaskDisplay({
	task,
	page,
}: {
	task: Task
	page: number
}) {
	const [showTask, setShowTask] = useState(false)
	const [isCompleted, setIsCompleted] = useState(task.completed)

	return (
		<ViewTransition>
			<div className={`${showTask ? 'rounded-sm border p-4' : ''}`}>
				<div className={`flex w-full items-center`}>
					<div className="grid w-full grid-cols-3 gap-4">
						<Button
							className="mr-auto"
							onClick={() => setShowTask(!showTask)}
							variant={'ghost'}
						>
							{task.name}
						</Button>
						<div className="text-muted-foreground">{task.type}</div>
						<div>{task.due_date.toDateString()}</div>
					</div>

					<div className="flex items-center gap-1">
						<Input
							className="h-4 w-4 cursor-pointer"
							defaultChecked={isCompleted}
							onChange={() => {
								toggleComplete(task.id, task.completed)
								setIsCompleted(!task.completed)
							}}
							type="checkbox"
						/>
						<DeleteTaskButton
							completed={isCompleted}
							id={task.id}
							page={page}
						/>
					</div>
				</div>
				<Activity mode={showTask ? 'visible' : 'hidden'}>
					<div className="font-medium text-2xl">
						{task.description}
					</div>
				</Activity>
			</div>
		</ViewTransition>
	)
}
