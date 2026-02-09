import { sanityFetch } from '@/sanity/lib/fetch'
import { MERCH_QUERY } from '@/sanity/lib/queries'
import MerchItemDisplay from '../components/merch/MerchItemDisplay'
import { MerchItemWithUrl } from '@/types/sanity'
import { uiIndie as ui } from '../ui/classes'

const page = async () => {
  const merchItems: MerchItemWithUrl[] = await sanityFetch({
    query: MERCH_QUERY,
    revalidate: 300,
  })

  return (
    <div className={ui.page}>
      <main className={`${ui.section}`}>
        <div className={`${ui.container} ${ui.stack}`}>
          <header className="">
            <div className={ui.label}>Merch</div>
            <h1 className={`${ui.h1} mt-2`}>
              <span className={ui.messyWrap}>SHOP</span>
            </h1>
            <div className={`mt-6 ${ui.rule}`} />
          </header>

          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-16  ">
                {merchItems && merchItems.length > 0 ? (
                    merchItems.map((item) => (
                        <MerchItemDisplay key={item._id} {...item} />
                        
                    ))
                ) : (
                    <p className="col-span-full text-center text-zinc-500">No merch items available</p>
                )}

                {merchItems && merchItems.length > 0 ? (
                    merchItems.map((item) => (
                        <MerchItemDisplay key={item._id} {...item} />
                        
                    ))
                ) : (
                    <p className="col-span-full text-center text-zinc-500">No merch items available</p>
                )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default page