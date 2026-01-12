import { IconChecklist } from '@tabler/icons-react'

export default function AppHeader() {
	return (
		<div className="glass glass-dark flex w-full max-w-2xl items-center justify-center gap-6 rounded-3xl p-10">
			<IconChecklist className="text-primary" size={48} />
			<h1 className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text font-bold text-5xl text-transparent tracking-tight">
				Next Task
			</h1>
		</div>
	)
}
