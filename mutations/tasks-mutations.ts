import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import type z from 'zod'
import { revalidatePathAction } from '@/actions/revlaidate-actions'
import {
	deleteTaskAction,
	newTaskAction,
	toggleTaskAction,
} from '@/actions/tasks-actions'
import { updateTagAction } from '@/actions/update-tag-action'
import type { formSchema } from '@/zod/tasks-schema'

export const useAddTaskMutation = ({
	onSuccess,
	page,
}: {
	onSuccess?: () => void
	page: number
}) => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof formSchema>) => {
			const result = await newTaskAction(data)
			if ('error' in result) throw new Error('Error adding task')

			return result
		},
		onSuccess: async () => {
			updateTagAction(`tasks-${false}-${page}`)
			onSuccess?.()
			toast.success('Task has been created')
		},
		onError: () => {
			toast.error('Error creating task')
		},
	})
}

export const useToggleTaskMutation = ({
	onSuccess,
}: {
	onSuccess?: () => void
}) => {
	return useMutation({
		mutationFn: async ({
			id,
			completed,
		}: {
			id: string
			completed: boolean
		}) => {
			const result = await toggleTaskAction(id, completed)
			if ('error' in result) throw new Error('Error toggling completed')

			return result
		},
		onSuccess: async () => {
			revalidatePathAction('/')
			onSuccess?.()
			toast.success('Task toggled completed')
		},
		onError: () => {
			toast.error('Error toggling completed')
		},
	})
}

export const useDeleteTaskMutation = ({
	page,
	completed,
	onSuccess,
}: {
	page: number
	completed: boolean
	onSuccess?: () => void
}) => {
	return useMutation({
		mutationFn: async (id: string) => {
			const result = await deleteTaskAction(id)
			if ('error' in result) throw new Error('Error adding task')

			return result
		},
		onSuccess: async () => {
			updateTagAction(`tasks-${completed}-${page}`)
			onSuccess?.()
			toast.success('Task has been deleted')
		},
		onError: () => {
			toast.error('Error deleting task')
		},
	})
}
