import z from 'zod'

export const formSchema = z.object({
	name: z
		.string()
		.min(2, 'Task name must be at least 2 characters.')
		.max(32, 'Task name must be at most 32 characters.'),
	typeOfTask: z.string().min(1, 'Type of task is required.'),
	dueDate: z.string(),
	details: z
		.string()
		.min(5, 'Details must be at least 5 characters.')
		.max(100, 'Details must be at most 100 characters.'),
})
