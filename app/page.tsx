import { Suspense } from 'react'
import TasksCardFallback from '@/components/fallbacks/tasks-card-fallback'
import TasksCard from '@/components/task/tasks-card'
import { fetchTasks } from '@/DAL/dal'

export default function Page(props: PageProps<'/'>) {
	const tasksPromise = props.searchParams.then((params) =>
		fetchTasks(params.page, false),
	)
	const completedTasksPromise = props.searchParams.then((params) =>
		fetchTasks(params.page, true),
	)

	return (
		<>
			<Suspense fallback={<TasksCardFallback />}>
				<TasksCard tasksPromise={tasksPromise} />
			</Suspense>
			<Suspense fallback={<TasksCardFallback />}>
				<TasksCard tasksPromise={completedTasksPromise} />
			</Suspense>
		</>
	)
}
