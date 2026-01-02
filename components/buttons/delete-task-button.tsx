import { IconX } from '@tabler/icons-react'
import { useDeleteTaskMutation } from '@/mutations/tasks-mutations'

export default function DeleteTaskButton({
	id,
	page,
	completed,
}: {
	id: string
	page: number
	completed: boolean
}) {
	const { mutate } = useDeleteTaskMutation({ page, completed })
	return (
		<button
			className="transition-transform duration-200 hover:scale-120"
			onClick={() => mutate(id)}
			type="button"
		>
			<IconX />
		</button>
	)
}
