import { Suspense } from 'react'
import TasksCardFallback from '@/components/fallbacks/tasks-card-fallback'
import TasksCard from '@/components/task/tasks-card'
import { fetchTasks } from '@/DAL/dal'
import type { Task } from '@/types/types'

export default function Page() {
	const tasksPromise = fetchTasks()
	const completedTasksPromise = tasksPromise.then((tasks) =>
		tasks.filter((task: Task) => task.completed),
	)
	const currentTasksPromise = tasksPromise.then((tasks) =>
		tasks.filter((task: Task) => !task.completed),
	)
	return (
		<>
			<Suspense fallback={<TasksCardFallback />}>
				<TasksCard tasksPromise={currentTasksPromise} />
			</Suspense>
			<Suspense fallback={<TasksCardFallback />}>
				<TasksCard tasksPromise={completedTasksPromise} />
			</Suspense>
		</>
	)
}
