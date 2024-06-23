import { GiBrain, GiPadlock, GiPadlockOpen } from 'react-icons/gi'
import { GoMail } from 'react-icons/go'
import { GrDocumentText } from 'react-icons/gr'
import { RxAvatar } from 'react-icons/rx'

const getFocusedFieldIcons = (field: string) => {
  switch (field.toLowerCase()) {
    case 'fullname':
      return <RxAvatar className='text-3xl text-blue-400' />
    case 'password':
      return <GiPadlock className='text-3xl text-blue-400' />
    case 'confirmedpassword':
      return <GiPadlockOpen className='text-3xl text-blue-400' />
    case 'email':
      return <GoMail className='text-3xl text-blue-400' />
    case 'agreement':
      return <GrDocumentText className='text-3xl text-blue-400' />
    case 'remember':
      return <GiBrain className='text-3xl text-blue-400' />
    default:
      return null
  }
}
export default getFocusedFieldIcons
