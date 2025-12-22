import type { Task } from '@/types/types'
import AddTaskButton from '../buttons/add-task-button'
import TaskTypeSelect from '../selectors/task-type-select'
import { Card, CardContent, CardHeader } from '../ui/card'
import TaskDisplay from './task-display'
export default function TasksCard({ tasks }: { tasks: Task[] }) {
	return (
		<div className="w-4/6">
			<Card>
				<CardHeader>Tasks</CardHeader>
				<div className="flex justify-between">
					<TaskTypeSelect />
					<div className="mr-8 ml-auto">
						<AddTaskButton />
					</div>
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
