import type {QueryParams} from 'next-sanity'
import {client} from './client'

export async function sanityFetch<const Q extends string>({
  query,
  params = {},
  revalidate = 60,
}: {
  query: Q
  params?: QueryParams
  revalidate?: number | false
}) {
  return client.fetch(query, params, {
    cache: revalidate === false ? 'no-store' : 'force-cache',
    next: revalidate !== false ? { revalidate, tags: ['sanity'] } : undefined,
  })
}
