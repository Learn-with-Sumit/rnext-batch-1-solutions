'use client'

import { Slider } from '@/components/ui/slider'
import useSidebarFilter from '@/hooks/product-hooks/useSidebarFilter'
import { COLORS } from '@/utils/constants'
import { useParams } from 'next/navigation'

const ColorSlider = () => {
  const { handleSelectColor, color } = useSidebarFilter()

  const { lang } = useParams()

  const isLocaleBengali = lang === 'bn'

  return (
    <div>
      <div
        className='my-4 bg-slate-200 w-fit p-2 rounded-full'
        style={{
          backgroundColor: color,
        }}
      ></div>
      <p
        style={{
          color,
        }}
        className='capitalize'
      >
        {isLocaleBengali && color === 'Color' ? 'রঙ' : color}
      </p>
      <Slider
        onValueChange={(value: any) => handleSelectColor(COLORS[value[0]])}
        value={[COLORS.indexOf(color)]}
        max={6}
        step={1}
      />
    </div>
  )
}

export default ColorSlider
