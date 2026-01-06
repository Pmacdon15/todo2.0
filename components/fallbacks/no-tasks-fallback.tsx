import { ViewTransition } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
export default function NotTasksFallback() {
	return (
		<ViewTransition>
			<div className="w-full rounded-xl shadow-lg md:w-4/6">
				<Card>
					<CardHeader>No tasks to display</CardHeader>

					<CardContent>
						<div className={`flex w-full items-center`}>
							<div className="grid w-full grid-cols-3 gap-4">
								No tasks
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</ViewTransition>
	)
}
