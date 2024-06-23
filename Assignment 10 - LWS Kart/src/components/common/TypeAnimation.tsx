import { TypeAnimation } from 'react-type-animation'

const TypeEffect = () => {
  // creating sequence by putting the time after each element of array
  const sequence = [
    'Outdoor',
    500,
    'Sofa',
    500,
    'Mattress',
    500,
    'Recliner',
    500,
    'Chair',
    500,
  ]

  return (
    <TypeAnimation
      sequence={sequence}
      wrapper='span'
      speed={10}
      style={{ fontSize: '16px', display: 'inline-block' }}
      repeat={Infinity}
      preRenderFirstString={true}
      cursor={true}
    />
  )
}

export default TypeEffect
