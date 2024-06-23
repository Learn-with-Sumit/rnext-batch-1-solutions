import { FaBed, FaCouch, FaRegBuilding, FaUtensils } from 'react-icons/fa'
import { FaMattressPillow } from 'react-icons/fa6'

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'living room':
      return <FaBed />
    case 'sofa':
      return <FaCouch />
    case 'outdoor':
      return <FaRegBuilding />
    case 'kitchen':
      return <FaUtensils />
    case 'mattress':
      return <FaMattressPillow />
    default:
      return null
  }
}

export default getCategoryIcon
