'use client'
import { Suspense, ViewTransition } from 'react'
import { DatePicker } from '@/components/date-picker'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from '@/components/ui/combobox'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const typesOfTasks = ['Personal', 'Work', 'Play', 'Other'] as const
export default function AddTaskForm({ onCancel }: { onCancel: () => void }) {
	return (
		<ViewTransition>
			{/* <div
				className="w-full items-center justify-center p-8"
				title="task-form"
			> */}
				<Card className="w-full shadow-lg">
					<CardHeader>
						<CardTitle>Add Task</CardTitle>
						<CardDescription>
							Please add task details
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form>
							<FieldGroup>
								<div className="grid grid-cols-2 gap-4">
									<Field>
										<FieldLabel htmlFor="task-form-name">
											Name
										</FieldLabel>
										<Input
											id="task-form-name"
											placeholder="Enter task name"
											required
										/>
									</Field>
									<Field>
										<FieldLabel htmlFor="task-form-type-of-task">
											Type of Task
										</FieldLabel>
										<Combobox items={typesOfTasks}>
											<ComboboxInput
												id="task-form-type-of-task"
												placeholder="Select a type of task"
												required
											/>
											<ComboboxContent>
												<ComboboxEmpty>
													No types found.
												</ComboboxEmpty>
												<ComboboxList>
													{(item) => (
														<ComboboxItem
															key={item}
															value={item}
														>
															{item}
														</ComboboxItem>
													)}
												</ComboboxList>
											</ComboboxContent>
										</Combobox>
									</Field>
								</div>

								<Field>
									<FieldLabel htmlFor="task-form-due-date">
										Due Date
									</FieldLabel>
									<Suspense>
										<DatePicker id="task-form-due-date" />
									</Suspense>
								</Field>

								<Field>
									<FieldLabel htmlFor="task-form-details">
										Details
									</FieldLabel>
									<Textarea
										id="task-form-details"
										placeholder="Add any additional comments"
									/>
								</Field>
								<Field orientation="horizontal">
									<Button type="submit">Submit</Button>
									<Button
										onClick={onCancel}
										type="button"
										variant={'secondary'}
									>
										Cancel
									</Button>
								</Field>
							</FieldGroup>
						</form>
					</CardContent>
				</Card>
			{/* </div> */}
		</ViewTransition>
	)
}
