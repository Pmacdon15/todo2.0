'use client'
import AddTaskButton from '@/components/buttons/add-task-button'
import TaskDisplay from '@/components/task/task-display'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const tasks: Task[] = [
	{
		name: 'Go to store',
		type: 'Personal',
		due_date: '12:12:2025',
		description: 'Get Milk',
		completed: false,
	},

	{
		name: 'Buy groceries',
		type: 'Personal',
		due_date: '12:23:2025',
		description: 'Milk, eggs, bread',
		completed: false,
	},
	{
		name: 'Team meeting',
		type: 'Work',
		due_date: '12:22:2025',
		description: 'Quarterly review discussion',
		completed: false,
	},
	{
		name: 'Gym workout',
		type: 'Health',
		due_date: '12:21:2025',
		description: 'Cardio and weights',
		completed: false,
	},
]

export default function Page() {
	return (
		<div className="w-4/6">
			<Card>
				<CardHeader>Tasks</CardHeader>
				<div className="mr-8 ml-auto">
					<AddTaskButton />
				</div>
				<CardContent>
					{tasks.map((task, index) => (
						<TaskDisplay key={task.name + index} task={task} />
					))}
				</CardContent>
			</Card>
		</div>
	)
}
