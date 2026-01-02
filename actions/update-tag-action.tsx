'use server'

import { updateTag } from 'next/cache'

export async function updateTagAction(tag: string) {
	await updateTag(tag)
}
