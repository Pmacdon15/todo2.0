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
				className={`${showTask ? 'bg-accent/5' : ''} group border-b last:border-b-0 border-white/10 transition-colors duration-200 hover:bg-white/5`}
			>
				<div className={`flex w-full items-center p-4 px-8`}>
					<div className="grid w-full grid-cols-3 gap-6 items-center">
						<button
							className={`text-left font-medium text-lg transition-colors duration-200 hover:text-primary ${task.completed ? 'line-through opacity-50' : 'text-foreground/90'}`}
							onClick={() => setShowTask(!showTask)}
							type="button"
						>
							{task.name}
						</button>
						<div className="text-sm font-medium uppercase tracking-wider text-muted-foreground/70">
							{task.type}
						</div>
						<div className="text-sm text-muted-foreground/60 font-mono">
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
					<div className="px-8 pb-6 pt-2 text-foreground/70 leading-relaxed italic border-t border-white/5 mx-8">
						{task.description || 'No description provided.'}
					</div>
				</Activity>
			</div>
		</ViewTransition>
	)
}
