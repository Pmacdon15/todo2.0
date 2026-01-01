'use client'

import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'

export function FormActions({ onCancel }: { onCancel: () => void }) {
	return (
		<Field orientation="horizontal">
			<Button type="submit">Submit</Button>
			<Button onClick={onCancel} type="button" variant={'secondary'}>
				Cancel
			</Button>
		</Field>
	)
}
