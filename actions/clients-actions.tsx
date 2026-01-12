'use server'

import { revalidateTag } from 'next/cache'
import pool from '@/lib/db'
import { type ClientFormValues, clientSchema } from '@/zod/clients-schema'

export async function newClientAction(data: ClientFormValues) {
	const validated = clientSchema.safeParse(data)
	if (!validated.success) {
		return { error: 'Invalid form data' }
	}

	const { firstName, lastName, email, phone, addresses } = validated.data

	const client = await pool.connect()
	try {
		await client.query('BEGIN')

		const clientResult = await client.query(
			`INSERT INTO clients (first_name, last_name, email, phone)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
			[firstName, lastName, email || null, phone || null],
		)

		const clientId = clientResult.rows[0].id

		for (const addr of addresses) {
			await client.query(
				`INSERT INTO addresses (client_id, street, city, state, zip, assigned_to, cutting_schedule)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
				[
					clientId,
					addr.street,
					addr.city,
					addr.state,
					addr.zip,
					addr.assignedTo || null,
					addr.cuttingSchedule || null,
				],
			)
		}

		await client.query('COMMIT')

		revalidateTag('clients')
		return { success: true }
	} catch (error) {
		await client.query('ROLLBACK')
		console.error('Error creating client:', error)
		return { error: 'Failed to create client' }
	} finally {
		client.release()
	}
}
