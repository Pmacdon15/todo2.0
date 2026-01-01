'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ViewTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ControlledCombobox } from '@/components/ui/controlled-combobox'
import { ControlledTextInput } from '@/components/ui/controlled-input'
import { ControlledTextArea } from '@/components/ui/controlled-textarea'
import { FieldGroup } from '@/components/ui/field'
import { FormActions } from './form-fields/form-actions'
import { TaskDueDatePicker } from './form-fields/task-due-date-picker'

const typesOfTasks = ['Personal', 'Work', 'Play', 'Other'] as const

const formSchema = z.object({
	name: z
		.string()
		.min(5, 'Task name must be at least 5 characters.')
		.max(32, 'Task name must be at most 32 characters.'),
	typeOfTask: z.string().min(1, 'Type of task is required.'),
	dueDate: z.string(),
	details: z
		.string()
		.min(5, 'Details must be at least 5 characters.')
		.max(100, 'Details must be at most 100 characters.'),
})

export default function AddTaskForm({ onCancel }: { onCancel: () => void }) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			typeOfTask: '',
			dueDate: undefined,
			details: '',
		},
	})

	function onSubmit(data: z.infer<typeof formSchema>) {
		console.log(data)
	}

	return (
		<ViewTransition>
			<Card className="w-full shadow-lg">
				<CardHeader>
					<CardTitle>Add Task</CardTitle>
					<CardDescription>Please add task details</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						id="form-add-task"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FieldGroup>
							<div className="grid grid-cols-2 gap-4">
								<ControlledTextInput
									control={form.control}
									label="Name"
									name="name"
									placeholder="Enter task name"
								/>
								<ControlledCombobox
									control={form.control}
									items={typesOfTasks}
									label="Type of Task"
									name="typeOfTask"
									placeholder="Select a type of task"
								/>
							</div>

							<TaskDueDatePicker
								control={form.control}
								id="dueDate"
								label="Due Date"
								name="dueDate"
								placeholder="Select a due date"
							/>

							<ControlledTextArea
								control={form.control}
								label="Details"
								name="details"
								placeholder="Add additional comments"
							/>

							<FormActions onCancel={onCancel} />
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</ViewTransition>
	)
}
