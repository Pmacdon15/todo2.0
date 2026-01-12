import { IconCalendar, IconMapPin, IconUser } from '@tabler/icons-react'
import AddClientButton from '@/components/buttons/add-client-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchClients } from '@/DAL/clients-dal'

export default async function ClientsPage() {
	const clients = await fetchClients()

	return (
		<div className="container mx-auto space-y-6 p-4">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-3xl">Clients</h1>
				<AddClientButton />
			</div>

			<div className="grid gap-6">
				{clients.length === 0 ? (
					<p className="py-10 text-center text-muted-foreground">
						No clients found. Add one to get started!
					</p>
				) : (
					clients.map((client) => (
						<Card className="overflow-hidden" key={client.id}>
							<CardHeader className="bg-muted/30">
								<CardTitle className="flex items-center gap-2">
									<IconUser className="text-primary" />
									{client.first_name} {client.last_name}
								</CardTitle>
								<div className="flex gap-4 text-muted-foreground text-sm">
									{client.email && (
										<span>{client.email}</span>
									)}
									{client.phone && (
										<span>{client.phone}</span>
									)}
								</div>
							</CardHeader>
							<CardContent className="p-0">
								<div className="divide-y">
									{client.addresses.map((address) => (
										<div
											className="flex flex-col justify-between gap-4 p-4 md:flex-row md:items-center"
											key={address.id}
										>
											<div className="flex items-start gap-3">
												<IconMapPin
													className="mt-1 flex-shrink-0 text-muted-foreground"
													size={18}
												/>
												<div>
													<p className="font-medium">
														{address.street}
													</p>
													<p className="text-muted-foreground text-sm">
														{address.city},{' '}
														{address.state}{' '}
														{address.zip}
													</p>
												</div>
											</div>

											<div className="flex flex-wrap gap-4 text-sm">
												<div className="flex items-center gap-1.5 rounded-full bg-secondary/50 px-2.5 py-1">
													<IconUser
														className="text-muted-foreground"
														size={14}
													/>
													<span className="font-medium">
														Assigned:
													</span>
													<span className="text-muted-foreground">
														{address.assigned_to ||
															'Unassigned'}
													</span>
												</div>
												<div className="flex items-center gap-1.5 rounded-full bg-secondary/50 px-2.5 py-1">
													<IconCalendar
														className="text-muted-foreground"
														size={14}
													/>
													<span className="font-medium">
														Schedule:
													</span>
													<span className="text-muted-foreground">
														{address.cutting_schedule ||
															'None'}
													</span>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					))
				)}
			</div>
		</div>
	)
}
