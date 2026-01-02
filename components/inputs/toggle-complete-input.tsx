'use client'
import type { Task } from '@/lib/generated/prisma/client'
import { useToggleTaskMutation } from '@/mutations/tasks-mutations'
import { Input } from '../ui/input'

export default function ToggleCompleteInput({ task }: { task: Task }) {
	const { mutate, error } = useToggleTaskMutation({})
	return (
		<div className="flex items-center gap-4">
			<Input
				className="h-4 w-4 cursor-pointer"
				defaultChecked={task.completed}
				onChange={() => {
					mutate({ id: task.id, completed: task.completed })
				}}
				type="checkbox"
			/>
			<div className="text-red-500">{error?.message}</div>
		</div>
	)
}
