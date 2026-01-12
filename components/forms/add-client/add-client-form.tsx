'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { ViewTransition } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ControlledTextInput } from '@/components/ui/controlled-input'
import { FieldGroup } from '@/components/ui/field'
import { useAddClientMutation } from '@/mutations/clients-mutations'
import { type ClientFormValues, clientSchema } from '@/zod/clients-schema'

export default function AddClientForm({ onCancel }: { onCancel: () => void }) {
	const { mutate, isPending } = useAddClientMutation({
		onSuccess: () => {
			form.reset()
			onCancel()
		},
	})

	const form = useForm<ClientFormValues>({
		resolver: zodResolver(clientSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			addresses: [
				{
					street: '',
					city: '',
					state: '',
					zip: '',
					assignedTo: '',
					cuttingSchedule: '',
				},
			],
		},
	})

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'addresses',
	})

	function onSubmit(data: ClientFormValues) {
		mutate(data)
	}

	return (
		<ViewTransition>
			<Card className="w-full shadow-lg">
				<CardHeader>
					<CardTitle>Add Client</CardTitle>
					<CardDescription>
						Enter client details and addresses
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						id="form-add-client"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FieldGroup>
							<div className="grid grid-cols-2 gap-4">
								<ControlledTextInput
									control={form.control}
									label="First Name"
									name="firstName"
									placeholder="First Name"
								/>
								<ControlledTextInput
									control={form.control}
									label="Last Name"
									name="lastName"
									placeholder="Last Name"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<ControlledTextInput
									control={form.control}
									label="Email"
									name="email"
									placeholder="Email (optional)"
									type="email"
								/>
								<ControlledTextInput
									control={form.control}
									label="Phone"
									name="phone"
									placeholder="Phone (optional)"
								/>
							</div>

							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<h3 className="text-lg font-medium">
										Addresses
									</h3>
									<Button
										onClick={() =>
											append({
												street: '',
												city: '',
												state: '',
												zip: '',
												assignedTo: '',
												cuttingSchedule: '',
											})
										}
										size="sm"
										type="button"
										variant="outline"
									>
										<IconPlus className="mr-2 h-4 w-4" />{' '}
										Add Address
									</Button>
								</div>

								{fields.map((field, index) => (
									<div
										className="space-y-4 rounded-lg border p-4"
										key={field.id}
									>
										<div className="flex items-center justify-between">
											<h4 className="font-medium">
												Address {index + 1}
											</h4>
											{fields.length > 1 && (
												<Button
													onClick={() =>
														remove(index)
													}
													size="sm"
													type="button"
													variant="ghost"
												>
													<IconTrash className="h-4 w-4 text-red-500" />
												</Button>
											)}
										</div>

										<ControlledTextInput
											control={form.control}
											label="Street"
											name={`addresses.${index}.street`}
											placeholder="123 Main St"
										/>

										<div className="grid grid-cols-3 gap-4">
											<ControlledTextInput
												control={form.control}
												label="City"
												name={`addresses.${index}.city`}
												placeholder="City"
											/>
											<ControlledTextInput
												control={form.control}
												label="State"
												name={`addresses.${index}.state`}
												placeholder="State"
											/>
											<ControlledTextInput
												control={form.control}
												label="Zip"
												name={`addresses.${index}.zip`}
												placeholder="Zip"
											/>
										</div>

										<div className="grid grid-cols-2 gap-4">
											<ControlledTextInput
												control={form.control}
												label="Assigned To"
												name={`addresses.${index}.assignedTo`}
												placeholder="Assignee"
											/>
											<ControlledTextInput
												control={form.control}
												label="Cutting Schedule"
												name={`addresses.${index}.cuttingSchedule`}
												placeholder="Weekly, Bi-weekly, etc."
											/>
										</div>
									</div>
								))}
							</div>

							<div className="flex justify-end gap-2 pt-4">
								<Button
									onClick={onCancel}
									type="button"
									variant="ghost"
								>
									Cancel
								</Button>
								<Button disabled={isPending} type="submit">
									{isPending ? 'Saving...' : 'Save Client'}
								</Button>
							</div>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</ViewTransition>
	)
}
