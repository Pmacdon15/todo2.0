import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import type z from 'zod'
import { newTaskAction } from '@/actions/tasks-actions'
import { updateTagAction } from '@/actions/update-tag-action'
import type { formSchema } from '@/zod/tasks-schema'

export const useAddTaskMutation = ({
	onSuccess,
}: {
	onSuccess?: () => void
}) => {
	return useMutation({
		mutationFn: async (data: z.infer<typeof formSchema>) => {
			const result = await newTaskAction(data)
			if ('error' in result) throw new Error('Error adding task')
				
			return result
		},
		onSuccess: async () => {
			onSuccess?.()
			updateTagAction('tasks')
			toast.success('Task has been created')
		},
		onError: () => {
			toast.error('Error creating task')
		},
	})
}
