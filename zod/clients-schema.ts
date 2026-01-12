import z from 'zod'

export const addressSchema = z.object({
	street: z.string().min(1, 'Street is required'),
	city: z.string().min(1, 'City is required'),
	state: z.string().min(1, 'State is required'),
	zip: z.string().min(1, 'Zip is required'),
	assignedTo: z.string().optional(),
	cuttingSchedule: z.string().optional(),
})

export const clientSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z.string().email().optional().or(z.literal('')),
	phone: z.string().optional(),
	addresses: z
		.array(addressSchema)
		.min(1, 'At least one address is required'),
})

export type ClientFormValues = z.infer<typeof clientSchema>
export type AddressFormValues = z.infer<typeof addressSchema>
