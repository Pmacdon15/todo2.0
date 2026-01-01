'use client'

import { Suspense } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { DatePicker } from '@/components/date-picker'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field'

interface ControlledDatePickerProps<T extends FieldValues> {
	control: Control<T>
	name: Path<T>
	label: string
	id: string
	placeholder?: string
}

export function TaskDueDatePicker<T extends FieldValues>({
	control,
	name,
	label,
	id,
	placeholder,
}: ControlledDatePickerProps<T>) {
	return (
		<FieldGroup>
			<Controller
				control={control}
				name={name}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={id}>{label}</FieldLabel>
						<Suspense>
							<DatePicker
								id={id}
								onChange={field.onChange}
								placeholder={placeholder}
								value={field.value}
							/>
						</Suspense>
						{fieldState.invalid && (
							<FieldError errors={[fieldState.error]} />
						)}
					</Field>
				)}
			/>
		</FieldGroup>
	)
}
