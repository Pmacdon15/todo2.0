import { Suspense } from 'react'
import TasksCard from '@/components/task/tasks-card'
import { fetchTasks } from '@/DAL/dal'
import type { Task } from '@/types/types'
// const tasks: Task[] = [
// 	{
// 		name: 'Go to store',
// 		type: 'Personal',
// 		due_date: '12:12:2025',
// 		description: 'Get Milk',
// 		completed: true,
// 	},

// 	{
// 		name: 'Buy groceries',
// 		type: 'Personal',
// 		due_date: '12:23:2025',
// 		description: 'Milk, eggs, bread',
// 		completed: false,
// 	},
// 	{
// 		name: 'Team meeting',
// 		type: 'Work',
// 		due_date: '12:22:2025',
// 		description: 'Quarterly review discussion',
// 		completed: false,
// 	},
// 	{
// 		name: 'Gym workout',
// 		type: 'Health',
// 		due_date: '12:21:2025',
// 		description: 'Cardio and weights',
// 		completed: false,
// 	},
// ]

export default async function Page() {
	const tasks = await fetchTasks()
	const completedTasks = tasks.filter((task: Task) => task.completed)
	const currentTasks = tasks.filter((task: Task) => !task.completed)
	return (
		<Suspense>
			<TasksCard tasks={currentTasks} />
			<TasksCard tasks={completedTasks} />
		</Suspense>
	)
}
