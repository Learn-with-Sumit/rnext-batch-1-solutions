const bengaliNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']

export const convertToBengali = (number: number) => {
  return number
    .toString()
    .split('')
    .map((digit) => bengaliNums[digit as any])
    .join('')
}
