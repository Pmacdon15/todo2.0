import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { newClientAction } from '@/actions/clients-actions'
import type { ClientFormValues } from '@/zod/clients-schema'

export const useAddClientMutation = ({
	onSuccess,
}: {
	onSuccess?: () => void
} = {}) => {
	return useMutation({
		mutationFn: async (data: ClientFormValues) => {
			const result = await newClientAction(data)
			if ('error' in result) throw new Error(result.error)

			return result
		},
		onSuccess: async () => {
			onSuccess?.()
			toast.success('Client has been created')
		},
		onError: (error) => {
			toast.error(error.message || 'Error creating client')
		},
	})
}
