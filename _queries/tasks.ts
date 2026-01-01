import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchTasks } from '@/DAL/dal'

export function useTasksQuery() {
	const query = useSuspenseQuery({
		queryKey: ['tasks'],
		queryFn: async () => {
			return await fetchTasks()
		},
	})

	return [query as object, query] as const
}
// export function useWaitQuery(props: { wait: number }) {
//   const query = useSuspenseQuery({
//     queryKey: ['wait', props.wait],
//     queryFn: async () => {
//       const path = `/api/wait?wait=${props.wait}`
//       const url = baseUrl + path

//       const res: string = await (
//         await fetch(url, {
//           cache: 'no-store',
//         })
//       ).json()
//       return res
//     },
//   })

//   return [query.data as string, query] as const
// }
