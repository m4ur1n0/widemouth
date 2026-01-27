import {sanityFetch} from '@/sanity/lib/fetch'
import {
  ALBUMS_QUERY,
  BAND_MEMBERS_QUERY,
  MERCH_QUERY,
  PRESS_QUERY,
  SHOWS_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/sanity/lib/queries'

export const revalidate = 300

export default async function DebugPage() {
  const [settings, albums, shows, merch, members, press] = await Promise.all([
    sanityFetch({query: SITE_SETTINGS_QUERY, revalidate: 300}),
    sanityFetch({query: ALBUMS_QUERY, revalidate: 300}),
    sanityFetch({query: SHOWS_QUERY, revalidate: 60}),
    sanityFetch({query: MERCH_QUERY, revalidate: 300}),
    sanityFetch({query: BAND_MEMBERS_QUERY, revalidate: 300}),
    sanityFetch({query: PRESS_QUERY, revalidate: 300}),
  ])

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-8">
      <h1 className="text-2xl font-bold">Sanity Read Path Debug</h1>

      <Section title="Site Settings">{settings}</Section>
      <Section title={`Albums (${albums?.length ?? 0})`}>{albums}</Section>
      <Section title={`Shows (${shows?.length ?? 0})`}>{shows}</Section>
      <Section title={`Merch (${merch?.length ?? 0})`}>{merch}</Section>
      <Section title={`Band Members (${members?.length ?? 0})`}>{members}</Section>
      <Section title={`Press (${press?.length ?? 0})`}>{press}</Section>
    </main>
  )
}

function Section({title, children}: {title: string; children: unknown}) {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <pre className="rounded bg-neutral-900 text-neutral-100 p-4 overflow-auto text-sm">
        {JSON.stringify(children, null, 2)}
      </pre>
    </section>
  )
}
