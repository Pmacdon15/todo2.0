'use client'
import { Activity, useState, ViewTransition } from 'react'
import type { Task } from '@/lib/generated/prisma/client'
import DeleteTaskButton from '../buttons/delete-task-button'
import ToggleCompleteInput from '../inputs/toggle-complete-input'

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
			<div
				className={`${showTask ? 'bg-accent/5' : ''} group border-white/10 border-b transition-colors duration-200 last:border-b-0 hover:bg-white/5`}
			>
				<div className={`flex w-full items-center p-4 px-8`}>
					<div className="grid w-full grid-cols-3 items-center gap-6">
						<button
							className={`text-left font-medium text-lg transition-colors duration-200 hover:text-primary ${task.completed ? 'line-through opacity-50' : 'text-foreground/90'}`}
							onClick={() => setShowTask(!showTask)}
							type="button"
						>
							{task.name}
						</button>
						<div className="font-medium text-muted-foreground/70 text-sm uppercase tracking-wider">
							{task.type}
						</div>
						<div className="font-mono text-muted-foreground/60 text-sm">
							{task.due_date.toDateString()}
						</div>
					</div>

					<div className="ml-auto flex items-center gap-3">
						<ToggleCompleteInput task={task} />
						<DeleteTaskButton
							completed={task.completed}
							id={task.id}
							page={page}
						/>
					</div>
				</div>
				<Activity mode={showTask ? 'visible' : 'hidden'}>
					<div className="mx-8 border-white/5 border-t px-8 pt-2 pb-6 text-foreground/70 italic leading-relaxed">
						{task.description || 'No description provided.'}
					</div>
				</Activity>
			</div>
		</ViewTransition>
	)
}
