'use client'

import { IconCalendar } from '@tabler/icons-react'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

function formatDate(date: Date | undefined) {
	if (!date) {
		return ''
	}

	return date.toLocaleDateString('en-US', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	})
}

function isValidDate(date: Date | undefined) {
	if (!date) {
		return false
	}
	return !Number.isNaN(date.getTime())
}

interface DatePickerProps {
	id: string
	placeholder?: string
	value: string | undefined
	onChange: (value: string) => void
}

export function DatePicker({
	id,
	placeholder,
	value,
	onChange,
}: DatePickerProps) {
	const [open, setOpen] = React.useState(false)

	const date = React.useMemo(() => (value ? new Date(value) : undefined), [value])
	const [month, setMonth] = React.useState<Date | undefined>(date)

	React.useEffect(() => {
		if (date) {
			setMonth(date)
		}
	}, [date])

	return (
		<div className="flex flex-col gap-3">
			<div className="relative flex gap-2">
				<Input
					className="bg-background pr-10"
					id={id}
					onChange={(e) => {
						const newDate = new Date(e.target.value)
						onChange(e.target.value)
						if (isValidDate(newDate)) {
							setMonth(newDate)
						}
					}}
					onKeyDown={(e) => {
						if (e.key === 'ArrowDown') {
							e.preventDefault()
							setOpen(true)
						}
					}}
					placeholder={placeholder}
					value={value ?? ''}
				/>
				<Popover onOpenChange={setOpen} open={open}>
					<PopoverTrigger asChild>
						<Button
							className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
							id="date-picker-trigger" 
							variant="ghost"
						>
							<IconCalendar className="size-3.5" />
							<span className="sr-only">Select date</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent
						align="end"
						alignOffset={-8}
						className="w-auto overflow-hidden p-0"
						sideOffset={10}
					>
						<Calendar
							captionLayout="dropdown"
							mode="single"
							month={month}
							onMonthChange={setMonth}
							onSelect={(newDate) => {
								onChange(formatDate(newDate))
								if (newDate) {
									setMonth(newDate)
								}
								setOpen(false)
							}}
							selected={date}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	)
}
