import { useEffect, useState } from 'react'

const ScrollProgress = () => {
  const [scrollTop, setScrollTop] = useState(0)

  const onScroll = () => {
    const toScroll = window.scrollY

    // subtract the total height of page minus where the user has scrolled to
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    // getting how much user has scrolled
    const scrolled = (toScroll / height) * 100

    setScrollTop(scrolled)
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    // cleanup
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{ width: `${scrollTop}%` }}
      className='bg-black h-[5px] sticky top-0 left-0 z-[1] w-[100%]'
    >
      <div className='h-[5px] bg-green-500 w-[100%]'></div>
    </div>
  )
}
export default ScrollProgress
