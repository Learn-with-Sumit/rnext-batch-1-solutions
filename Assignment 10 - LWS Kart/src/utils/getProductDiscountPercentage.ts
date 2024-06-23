const getProductDiscountPercentage = (
  price: number,
  discount_price: number
) => {
  return (Math.abs(price - discount_price) / discount_price) * 100
}
export default getProductDiscountPercentage
