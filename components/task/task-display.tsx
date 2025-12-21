'use client'
import { Activity, useState } from 'react'
import { Button } from '../ui/button'

interface Task {
	name: string
	type: string

	due_date: string
	description: string
	completed: boolean
}

export default function TaskDisplay({ task }: { task: Task }) {
	const [showTask, setShowTask] = useState(false)
	return (
		<div className={` ${showTask ? 'rounded-sm border p-4' : ''}`}>
			<div className="grid grid-cols-3 gap-4">
				<Button
					className="mr-auto"
					onClick={() => setShowTask(!showTask)}
					variant={'ghost'}
				>
					{task.name}
				</Button>
				<div className="text-muted-foreground">{task.type}</div>
				<div>{task.due_date}</div>
			</div>
			<Activity mode={showTask ? 'visible' : 'hidden'}>
				<div className="font-medium text-2xl">{task.description}</div>
			</Activity>
		</div>
	)
}
