import { ViewTransition } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'

export default function TasksCardFallback() {
	return (
		<ViewTransition>
			<div className="w-full md:w-4/6">
				<Card>
					<CardHeader> Tasks </CardHeader>

					<CardContent>
						<div>
							<div className={`flex w-full items-center`}>
								<div className="grid w-full grid-cols-3 gap-4">
									Loading ...
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</ViewTransition>
	)
}
