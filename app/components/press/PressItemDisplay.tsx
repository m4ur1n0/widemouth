
import { PressItem } from '@/types/sanity'
import { uiIndie as ui } from '../../ui/classes'


type Props = {
    item: PressItem
}

const PressItemDisplay = ({item}: Props) => {
  return (
    <div className="flex justify-between items-center px-2">
        <div>
            <h3 className={`${ui.h3} mb-1`}>{item.title}</h3>
            <p className={`${ui.body} text-zinc-700`}>{item.description}</p>
        </div>

        <p className='text-gray-600 font-bold text-2xl mr-10'>&rarr;</p>
    </div>
  )
}

export default PressItemDisplay