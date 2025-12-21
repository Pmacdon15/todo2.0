import { IconChecklist } from '@tabler/icons-react'

export default function AppHeader() {
	return (
		<h1 className="flex w-4/6 items-center justify-center gap-4 rounded-xl border-2 p-8 font-medium text-4xl shadow-2xl">
			{' '}
			<IconChecklist size={38} />
			Next Task
		</h1>
	)
}
