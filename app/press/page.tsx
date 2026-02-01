import { sanityFetch } from '@/sanity/lib/fetch'
import { PRESS_QUERY } from '@/sanity/lib/queries'
import { PressItem } from '@/types/sanity'
import { uiIndie as ui } from '../ui/classes'
import Link from 'next/link'
import PressItemDisplay from '../components/press/PressItemDisplay'

const page = async () => {
  const pressItems: PressItem[] = await sanityFetch({
    query: PRESS_QUERY,
    revalidate: 3600,
  })
  

  return (
    <div className={ui.page}>
      <main className={ui.section}>
        <div className={`${ui.container} ${ui.stack}`}>
          <header className="">
            <div className={ui.label}>Press</div>
            <h1 className={`${ui.h1} mt-2`}>COVERAGE</h1>
            <div className={`mt-6 ${ui.rule}`} />
          </header>

          <section className='max-h-[60vh] md:max-h-[52vh] overflow-y-scroll pb-10'>
            {pressItems && pressItems.length > 0 ? (
              <div className={ui.list}>
                {pressItems.map((item) => (
                  <Link
                    key={item._id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-6 hover:bg-white/20 transition-colors"
                  >
                    <PressItemDisplay item={item}/>
                  </Link>
                ))}

              </div>
            ) : (
              <p className={`${ui.body} text-zinc-500`}>No press items available</p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default page