'use client'
import { Activity, useState, ViewTransition } from 'react'
import type { Task } from '@/lib/generated/prisma/client'
import DeleteTaskButton from '../buttons/delete-task-button'
import ToggleCompleteInput from '../inputs/toggle-complete-input'
import { Button } from '../ui/button'

export default function TaskDisplay({
	task,
	page,
}: {
	task: Task
	page: number
}) {
	const [showTask, setShowTask] = useState(false)

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
						<ToggleCompleteInput task={task} />
						<DeleteTaskButton
							completed={task.completed}
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
