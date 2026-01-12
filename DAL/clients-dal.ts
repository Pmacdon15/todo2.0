import { cacheTag } from 'next/cache'
import pool from '@/lib/db'

export async function fetchClients() {
	'use cache'
	cacheTag('clients')

	const query = `
    SELECT 
      c.*,
      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', a.id,
            'street', a.street,
            'city', a.city,
            'state', a.state,
            'zip', a.zip,
            'assigned_to', a.assigned_to,
            'cutting_schedule', a.cutting_schedule
          ) 
        ) FILTER (WHERE a.id IS NOT NULL), 
        '[]'
      ) as addresses
    FROM clients c
    LEFT JOIN addresses a ON c.id = a.client_id
    GROUP BY c.id
    ORDER BY c.last_name ASC
  `

	const result = await pool.query(query)
	return result.rows
}
