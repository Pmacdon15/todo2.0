import { Suspense } from 'react'
import TasksCardFallback from '@/components/fallbacks/tasks-card-fallback'
import TasksCard from '@/components/task/tasks-card'
import { fetchTasks } from '@/DAL/dal'

export default function Page(props: PageProps<'/'>) {
	const tasksPromise = props.searchParams.then((params) =>
		fetchTasks(params.page, false),
	)
	const completedTasksPromise = props.searchParams.then((params) =>
		fetchTasks(params.pageCompleted, true),
	)

	const pagePromise = props.searchParams.then(
		(params) => Number(params.page) ?? 1,
	)
	const pageCompletedPromise = props.searchParams.then(
		(params) => Number(params.pageCompleted) ?? 1,
	)

	return (
		<>
			<Suspense fallback={<TasksCardFallback />}>
				<TasksCard
					pagePromise={pagePromise}
					tasksPromise={tasksPromise}
				/>
			</Suspense>
			<Suspense fallback={<TasksCardFallback />}>
				<TasksCard
					pagePromise={pageCompletedPromise}
					tasksPromise={completedTasksPromise}
				/>
			</Suspense>
		</>
	)
}
