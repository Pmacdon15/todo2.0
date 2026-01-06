import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PaginationButton({
	completed,
	back = false,
}: {
	completed: boolean
	back?: boolean
}) {
	const searchParams = useSearchParams()
	const router = useRouter()

	const page =
		Number(searchParams.get(`page${completed ? 'Completed' : ''}`)) || 1

	return (
		<div>
			{back ? (
				<button
					className="transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
					disabled={!page || page === 1}
					onClick={() =>
						router.push(
							`/?page${completed ? 'Completed' : ''}=${page - 1}`,
						)
					}
					type="button"
				>
					<IconCaretLeft />
				</button>
			) : (
				<button
					className="transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
					onClick={() =>
						router.push(
							`/?page${completed ? 'Completed' : ''}=${page + 1}`,
						)
					}
					type="button"
				>
					<IconCaretRight />
				</button>
			)}
		</div>
	)
}
