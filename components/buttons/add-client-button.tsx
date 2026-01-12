'use client'

import { IconUserPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import AddClientForm from '../forms/add-client/add-client-form'

export default function AddClientButton() {
	const [open, setOpen] = useState(false)

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button className="gap-2">
					<IconUserPlus size={18} />
					Add Client
				</Button>
			</DialogTrigger>
			<DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
				<AddClientForm onCancel={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	)
}
