import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PaginationButton({
	completed,
	back = false,
	hasMore,
}: {
	completed: boolean
	back?: boolean
	hasMore: boolean
}) {
	const searchParams = useSearchParams()
	const router = useRouter()

	const page =
		Number(searchParams.get(`page${completed ? 'Completed' : ''}`)) || 1

	return (
		<div>
			{back ? (
				<button
					className="flex items-center transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
					disabled={!page || page === 1}
					onClick={() =>
						router.push(
							`/?page${completed ? 'Completed' : ''}=${page - 1}`,
						)
					}
					type="button"
				>
					<IconCaretLeft /> Back
				</button>
			) : (
				<button
					className="flex items-center transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
					disabled={!hasMore}
                    onClick={() =>
						router.push(
							`/?page${completed ? 'Completed' : ''}=${page + 1}`,
						)
					}
					type="button"
				>
					Forward
					<IconCaretRight />
				</button>
			)}
		</div>
	)
}
