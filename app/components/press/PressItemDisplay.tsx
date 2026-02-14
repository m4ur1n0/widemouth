
import { PressItem } from '@/types/sanity'
import { uiIndie as ui } from '../../ui/classes'


type Props = {
    item: PressItem
}

const PressItemDisplay = ({item}: Props) => {
  return (
    <div className="group py-3 px-1 transition-transform bg-zinc-50/25 hover:scale-[1.02] duration-300">
        <div className="flex items-start gap-3">
            <span className="text-zinc-400 group-hover:text-zinc-600 transition-colors mt-1 text-sm">&rarr;</span>
            <div className="flex-1">
                <h3 className={`${ui.h3} mb-1 group-hover:text-zinc-900 transition-colors`}>{item.title}</h3>
                <p className={`${ui.body} text-zinc-600 leading-relaxed`}>{item.description}</p>
            </div>
        </div>
    </div>
  )
}

export default PressItemDisplay