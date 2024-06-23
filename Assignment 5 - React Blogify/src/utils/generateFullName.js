export const generateFullName = (first, last) => {
  let fullName
  if (first && last) {
    fullName = first + ' ' + last
  }
  return fullName
}
