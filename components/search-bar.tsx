import AddTaskButton from './buttons/add-task-button'
import TaskTypeSelect from './selectors/task-type-select'

export default function SearchBar() {
	return (
		<div className="glass glass-dark flex w-full max-w-2xl items-center justify-between gap-6 rounded-3xl p-6">
			<TaskTypeSelect />
			<div className="flex items-center">
				<AddTaskButton />
			</div>
		</div>
	)
}
