function getOccurrence(array: any[], value: number) {
  var count = 0
  array.forEach((v) => v === value && count++)
  return count
}

const getColorForTitle = (title: number): string => {
  switch (title) {
    case 5:
      return 'bg-green-500'
    case 4:
      return 'bg-fuchsia-500'
    case 3:
      return 'bg-cyan-500'
    case 2:
      return 'bg-blue-500'
    case 1:
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

export { getColorForTitle, getOccurrence }
