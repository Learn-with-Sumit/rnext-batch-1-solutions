'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useParams } from 'next/navigation'

export function FAQAccordion() {
  const { lang } = useParams()

  const isLocaleBengali = lang === 'bn'

  return (
    <>
      <h1 className='text-center mb-4 text-2xl font-semibold'>
        {isLocaleBengali
          ? 'প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী'
          : 'Frequently Asked Questions'}
      </h1>
      <Accordion
        type='single'
        collapsible
        className='w-[600px] m-auto rounded-md border shadow-md p-4 mb-12 pb-4'
      >
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            {isLocaleBengali ? 'LWS কার্ট কি?' : 'What is LWS Kart?'}
          </AccordionTrigger>
          <AccordionContent>
            {isLocaleBengali
              ? 'LWS কার্ট একটি উদ্ভাবনী ই-কমার্স প্ল্যাটফর্ম যা ইলেকট্রনিক্স থেকে ফ্যাশন পর্যন্ত বিভিন্ন ধরনের পণ্য অফার করে, যা চমৎকার গ্রাহক পরিষেবা এবং দ্রুত ডেলিভারির উপর গুরুত্ব দেয়।'
              : 'LWS Kart is an innovative e-commerce platform offering a wide variety of products, from electronics to fashion, with a focus on excellent customer service and fast delivery.'}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>
            {isLocaleBengali
              ? 'আমি কীভাবে আমার অর্ডার ট্র্যাক করতে পারি?'
              : 'How can I track my order?'}
          </AccordionTrigger>
          <AccordionContent>
            {isLocaleBengali
              ? 'আপনি LWS কার্ট-এ আপনার অ্যাকাউন্টে লগ ইন করে এবং অ্যাকাউন্ট পৃষ্ঠায় এবং আমার অর্ডার বিভাগে নেভিগেট করে আপনার অর্ডার ট্র্যাক করতে পারেন। প্রতিটি অর্ডারে একটি ট্র্যাকিং লিঙ্ক থাকবে যা আপনি আপনার ডেলিভারির বর্তমান অবস্থা দেখতে ব্যবহার করতে পারেন।'
              : 'You can track your order by logging into your account on LWS Kart and navigating to the account page and my orders section. Each order will have a tracking link that you can use to see the current status of your delivery.'}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>
            {isLocaleBengali
              ? 'কোন কোন পেমেন্ট পদ্ধতি গৃহীত হয়?'
              : 'What payment methods are accepted?'}
          </AccordionTrigger>
          <AccordionContent>
            {isLocaleBengali
              ? 'LWS কার্ট বিভিন্ন ধরণের পেমেন্ট পদ্ধতি গ্রহণ করে, যেমন ক্রেডিট/ডেবিট কার্ড, PayPal, এবং জনপ্রিয় মোবাইল পেমেন্ট বিকল্প। আমরা নিশ্চিত করি যে সমস্ত লেনদেন নিরাপদ এবং এনক্রিপ্টেড।'
              : 'LWS Kart accepts a variety of payment methods including credit/debit cards, PayPal, and popular mobile payment options. We ensure all transactions are secure and encrypted.'}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-4'>
          <AccordionTrigger>
            {isLocaleBengali
              ? 'আমি কি আইটেমগুলি ফেরত বা বিনিময় করতে পারি?'
              : 'Can I return or exchange items?'}
          </AccordionTrigger>
          <AccordionContent>
            {isLocaleBengali
              ? 'হ্যাঁ, LWS কার্টে একটি ঝামেলা মুক্ত রিটার্ন এবং বিনিময় নীতি রয়েছে। আপনি যদি আপনার ক্রয়ে সন্তুষ্ট না হন, তবে আইটেমটি তার আসল অবস্থায় থাকলে ডেলিভারির ৩০ দিনের মধ্যে আপনি এটি ফেরত বা বিনিময় করতে পারেন।'
              : 'Yes, LWS Kart has a hassle-free return and exchange policy. If you are not satisfied with your purchase, you can return or exchange it within 30 days of delivery, provided the item is in its original condition.'}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-5'>
          <AccordionTrigger>
            {isLocaleBengali
              ? 'আমি কীভাবে গ্রাহক সহায়তার সাথে যোগাযোগ করতে পারি?'
              : 'How can I contact customer support?'}
          </AccordionTrigger>
          <AccordionContent>
            {isLocaleBengali
              ? 'আপনি আমাদের ওয়েবসাইটের লাইভ চ্যাটের মাধ্যমে, support@lwskart.com-এ ইমেলের মাধ্যমে বা আমাদের গ্রাহক পরিষেবা হটলাইনে কল করে ২৪/৭ LWS কার্ট গ্রাহক সহায়তার সাথে যোগাযোগ করতে পারেন।'
              : 'You can contact LWS Kart customer support through our live chat on the website, via email at support@lwskart.com, or by calling our customer service hotline available 24/7.'}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}
