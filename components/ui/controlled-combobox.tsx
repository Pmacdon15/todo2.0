'use client'

import type { Control, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from '@/components/ui/combobox'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'

interface ControlledComboboxProps {
	control: Control<FieldValues>
	name: string
	label: string
	items: readonly string[]
	placeholder: string
	emptyMessage?: string
}

export function ControlledCombobox({
	control,
	name,
	label,
	items,
	placeholder,
	emptyMessage = 'No items found.',
}: ControlledComboboxProps) {
	const id = name
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={id}>{label}</FieldLabel>
					<Combobox
						items={items}
						onValueChange={(newValue) => {
							field.onChange(newValue)
						}}
						value={field.value}
					>
						<ComboboxInput
							id={id}
							onBlur={field.onBlur}
							placeholder={placeholder}
						/>
						<ComboboxContent>
							<ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
							<ComboboxList>
								{(item) => (
									<ComboboxItem key={item} value={item}>
										{item}
									</ComboboxItem>
								)}
							</ComboboxList>
						</ComboboxContent>
					</Combobox>{' '}
					{fieldState.invalid && (
						<FieldError errors={[fieldState.error]} />
					)}
				</Field>
			)}
		/>
	)
}
