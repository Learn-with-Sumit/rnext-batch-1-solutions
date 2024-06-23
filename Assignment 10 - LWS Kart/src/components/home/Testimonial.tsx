'use client'
import { cn } from '@/lib/utils'
import { useParams } from 'next/navigation'
import { CardStack } from '../ui/card-stack'
export function Testimonial() {
  const { lang } = useParams()

  const isLocaleBengali = lang === 'bn'

  return (
    <>
      <h2 className='text-black font-semibold flex justify-center items-center text-5xl dark:text-white'>
        {isLocaleBengali ? 'প্রশংসাপত্রসমূহ' : 'Testimonials'}
      </h2>
      <div className='h-[40rem] flex items-center justify-center w-full'>
        <CardStack items={REVIEWS} />
      </div>
    </>
  )
}

// small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <span
      className={cn(
        'font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5 ',
        className
      )}
    >
      {children}
    </span>
  )
}

export const REVIEWS = [
  {
    id: 0,
    name: 'Alice Johnson',
    designation: 'Verified Buyer',
    content: (
      <p>
        LWS Kart has an incredible selection of products, and the customer
        service is top-notch. <Highlight>I received my order</Highlight> in just
        two days! Highly recommended.
      </p>
    ),
  },
  {
    id: 1,
    name: 'Bob Smith',
    designation: 'Frequent Shopper',
    content: (
      <p>
        The user interface is so easy to navigate, and I always find what I’m
        looking for. <Highlight>Prices are competitive</Highlight>, and the
        quality is superb. Will keep coming back!
      </p>
    ),
  },
  {
    id: 2,
    name: 'Carla Brown',
    designation: 'New Customer',
    content: (
      <p>
        I was skeptical at first, but LWS Kart exceeded my expectations.
        <Highlight>Returns are hassle-free</Highlight>, and the support team is
        very responsive. Definitely a five-star experience.
      </p>
    ),
  },
  {
    id: 3,
    name: 'David Wilson',
    designation: 'Tech Enthusiast',
    content: (
      <p>
        LWS Kart offers a fantastic range of electronics.{' '}
        <Highlight>Got a great deal</Highlight> on my new laptop. Delivery was
        prompt, and the product arrived in perfect condition.
      </p>
    ),
  },
  {
    id: 4,
    name: 'Eva Lee',
    designation: 'Fashion Blogger',
    content: (
      <p>
        I love shopping for clothes on LWS Kart. The variety is amazing, and
        <Highlight>the quality is top-notch</Highlight>. My wardrobe has never
        looked better!
      </p>
    ),
  },
]
