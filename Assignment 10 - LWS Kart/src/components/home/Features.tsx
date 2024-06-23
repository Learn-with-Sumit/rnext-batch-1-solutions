import { getDictionary } from '@/app/[lang]/dictionaries'
import Image from 'next/image'

const Features = async ({ lang }: ILang) => {
  const {
    features: {
      shipping: { free: freeShipping, order: orderOver },
      return: { money: moneyReturns, days: daysReturns },
      support: supportText,
      customer: customerSupport,
    },
  } = await getDictionary(lang)

  return (
    <div className='container py-16 animate-fadeUp dark:text-white'>
      <div className='w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center'>
        <div className='border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5 shadow-md dark:shadow-md dark:shadow-white animate-up-down'>
          <Image
            width={600}
            height={600}
            src='images/icons/delivery-van.svg'
            alt='Delivery'
            className='w-12 h-12 object-contain'
          />
          <div>
            <h4 className='font-medium capitalize text-lg'>{freeShipping}</h4>
            <p className='text-gray-500 text-sm'>{orderOver}</p>
          </div>
        </div>
        <div className='border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5 shadow-md dark:shadow-md dark:shadow-white animate-up-down'>
          <Image
            width={600}
            height={600}
            src='images/icons/money-back.svg'
            alt='Money Returns'
            className='w-12 h-12 object-contain'
          />
          <div>
            <h4 className='font-medium capitalize text-lg'>{moneyReturns}</h4>
            <p className='text-gray-500 text-sm'>{daysReturns}</p>
          </div>
        </div>
        <div className='border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5 shadow-md dark:shadow-md dark:shadow-white animate-up-down'>
          <Image
            width={600}
            height={600}
            src='images/icons/service-hours.svg'
            alt='Customer Support'
            className='w-12 h-12 object-contain'
          />
          <div>
            <h4 className='font-medium capitalize text-lg'>{supportText}</h4>
            <p className='text-gray-500 text-sm'>{customerSupport}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
