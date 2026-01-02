import { type Prisma, PrismaClient } from '../lib/generated/prisma/client'
import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
	adapter,
})

const taskData: Prisma.TaskCreateInput[] = [
	{
		name: 'Go to store',
		type: 'Personal',
		due_date: new Date('2025-12-12'),
		description: 'Get Milk',
		completed: true,
	},
	{
		name: 'Buy groceries',
		type: 'Personal',
		due_date: new Date('2025-12-23'),
		description: 'Milk, eggs, bread',
		completed: false,
	},
	{
		name: 'Team meeting',
		type: 'Work',
		due_date: new Date('2025-12-22'),
		description: 'Quarterly review discussion',
		completed: false,
	},
	{
		name: 'Gym workout',
		type: 'Health',
		due_date: new Date('2025-12-21'),
		description: 'Cardio and weights',
		completed: false,
	},
]
export async function main() {
	try {
		const tables =
			await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`
		console.log('Tables in public schema:', tables)

		for (const task of taskData) {
			await prisma.task.create({ data: task })
		}
		console.log('Seeding completed successfully.')
	} catch (e) {
		console.error(e)
		process.exit(1)
	} finally {
		await prisma.$disconnect()
	}
}

main()
