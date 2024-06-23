import Link from 'next/link'
import { ToastAction } from './toast'

const ActionOfToast = ({
  alt,
  text,
  link,
}: {
  alt: string
  text: string
  link: string
}) => {
  return (
    <ToastAction altText={alt}>
      <Link href={link}>{text}</Link>
    </ToastAction>
  )
}

export default ActionOfToast
