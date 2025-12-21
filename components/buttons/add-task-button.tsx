'use client'
import { Activity, useState } from 'react'
import AddTaskForm from '@/components/forms/add-task'
import { Button } from '@/components/ui/button'

export default function AddTaskButton() {
	const [showAddTask, setShowAddTask] = useState(false)
	return (
		<div className="flex w-full justify-center">
			<Activity mode={`${!showAddTask ? 'visible' : 'hidden'}`}>
				<Button onClick={() => setShowAddTask(true)}>Add Task</Button>
			</Activity>
			<Activity mode={`${showAddTask ? 'visible' : 'hidden'}`}>
				<AddTaskForm onCancel={() => setShowAddTask(false)} />
			</Activity>
		</div>
	)
}
