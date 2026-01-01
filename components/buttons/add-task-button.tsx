'use client'
import { useState } from 'react'
import AddTaskForm from '../forms/add-task/add-task-form'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export default function AddTaskButton() {
	const [open, setOpen] = useState(false)

	return (
		<Popover onOpenChange={setOpen} open={open}>
			<PopoverTrigger asChild>
				<Button>Add Task</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[90vw] max-w-md p-0 sm:w-96">
				<AddTaskForm onCancel={() => setOpen(false)} />
			</PopoverContent>
		</Popover>
	)
}
