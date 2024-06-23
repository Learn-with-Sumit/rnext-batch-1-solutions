import { getDictionary } from '@/app/[lang]/dictionaries'
import { getAllCategories } from '@/db/queries/product.queries'
import StaggeredDropDown from '../ui/staggered-dropdown'

const Dropdown = async ({ lang }: ILang) => {
  const categories: ICategory[] = await getAllCategories()
  const { filter } = await getDictionary(lang)
  const categoryNames = categories.map((cat) => Object.keys(cat)).flat()

  return (
    <StaggeredDropDown
      categoryNames={categoryNames}
      lang={lang}
      filter={filter}
    />
  )
}
export default Dropdown
