import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '../ui/select'

export default function TaskTypeSelect() {
	return (
		<Select>
			<SelectTrigger className="ml-8 w-45">
				<SelectValue placeholder="Select type of task" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Type of task</SelectLabel>
					<SelectItem value="personal">Personal</SelectItem>
					<SelectItem value="work">Work</SelectItem>
					<SelectItem value="play">Play</SelectItem>
					<SelectItem value="other">Other</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
