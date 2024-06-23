import { Drawer, DrawerTrigger } from '@/components/ui/drawer'
import { getAllCategories } from '@/db/queries/product.queries'
import { GrDrawer } from 'react-icons/gr'

const DrawerTriggerBtn = async () => {
  const categories: ICategory[] = await getAllCategories()

  const categoryNames = categories.map((cat) => Object.keys(cat)).flat()

  return (
    <Drawer>
      <DrawerTrigger className='text-white md:hidden'>
        <GrDrawer />
        {/* <DrawerContents categories={categoryNames} /> */}
      </DrawerTrigger>
    </Drawer>
  )
}

export default DrawerTriggerBtn
