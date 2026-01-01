'use client'

import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from '@/components/ui/combobox'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'

interface ControlledComboboxProps {
	control: Control<any>
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
										value={field.value}
										onValueChange={(newValue) => {
											field.onChange(newValue);
										}}
									>
										<ComboboxInput
											id={id}
											placeholder={placeholder}
											ref={field.ref}
											onBlur={field.onBlur}
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
									</Combobox>					{fieldState.invalid && (
						<FieldError errors={[fieldState.error]} />
					)}
				</Field>
			)}
		/>
	)
}
