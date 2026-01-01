import AddTaskButton from './buttons/add-task-button'
import TaskTypeSelect from './selectors/task-type-select'

export default function SearchBar() {
	return (
		<div className="flex w-4/6 items-center justify-center gap-4 rounded-xl border-2 p-8 font-medium text-4xl shadow-2xl">
			<TaskTypeSelect />
			<div className="mr-8 ml-auto">
				<AddTaskButton />
			</div>
		</div>
	)
}
