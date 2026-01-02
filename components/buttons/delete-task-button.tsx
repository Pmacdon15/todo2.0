import { IconX } from '@tabler/icons-react'
import { useDeleteTaskMutation } from '@/mutations/tasks-mutations'
import { Button } from '../ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'

export default function DeleteTaskButton({
	id,
	page,
	completed,
}: {
	id: string
	page: number
	completed: boolean
}) {
	const { mutate, error } = useDeleteTaskMutation({ page, completed })
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className='flex'>
					<button
						className="transition-transform duration-200 hover:scale-120"
						type="button"
					>
						<IconX />
					</button>
					<div className="text-red-500">{error?.message}</div>
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-106.25">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						This cannot be undone are you are you want to delete
						this task?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button onClick={() => mutate(id)} type="button">
						Delete task
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
