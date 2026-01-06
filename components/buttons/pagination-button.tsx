import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PaginationButton({ back = false }: { back?: boolean }) {
	const searchParams = useSearchParams()
	const router = useRouter()

	const page = Number(searchParams.get('page')) || 1

	return (
		<div>
			{back ? (
				<button
					disabled={!page || page === 1}
					onClick={() => router.push(`/?page=${page - 1}`)}
					type="button"
				>
					<IconCaretLeft />
				</button>
			) : (
				<button
					onClick={() => router.push(`/?page=${page + 1}`)}
					type="button"
				>
					<IconCaretRight />
				</button>
			)}
		</div>
	)
}
