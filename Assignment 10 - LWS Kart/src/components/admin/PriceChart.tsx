'use client'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { useParams } from 'next/navigation'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const PriceChart = ({ products }: { products: IProduct[] }) => {
  const { lang } = useParams()

  // options for the chart
  const options: ChartOptions = {
    responsive: true,

    scales: {
      y: {
        grid: {
          color: 'black',
        },
      },
      x: {
        grid: {
          color: 'black',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: lang === 'en' ? 'Product Prices' : 'পন্যের মুল্যসমূহ',
      },
    },
  }

  // take product names as labels
  const labels = products?.map((product: IProduct) => product.product_name)
  const data = {
    labels,
    datasets: [
      {
        label: lang === 'en' ? 'Price' : 'মুল্য',
        data: products?.map((product: IProduct) => product.discount_price),
        backgroundColor: 'rgb(186, 22, 98)',
      },
    ],
  }

  return (
    <div className='overflow-x-auto'>
      <div className='hidden sm:block'>
        <Bar
          fallbackContent={
            <p className='text-red-500'>Sorry, failed to render</p>
          }
          options={options as any}
          data={data}
        />
      </div>
      <div className='block sm:hidden'>
        <Bar
          fallbackContent={
            <p className='text-red-500'>Sorry, failed to render</p>
          }
          height={300}
          options={options as any}
          data={data}
        />
      </div>
    </div>
  )
}

export default PriceChart
