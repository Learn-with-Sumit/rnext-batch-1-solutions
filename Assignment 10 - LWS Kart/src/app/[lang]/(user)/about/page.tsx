import { ContainerScrollSection } from '@/components/home/ContainerScrollSection'
import { FAQAccordion } from '@/components/home/FAQ'
import { Testimonial } from '@/components/home/Testimonial'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'LWS Kart About',
}

const AboutPage = () => {
  return (
    <main className='dark:bg-slate-800 dark:text-white'>
      <ContainerScrollSection />
      <Testimonial />
      <FAQAccordion />
    </main>
  )
}

export default AboutPage
