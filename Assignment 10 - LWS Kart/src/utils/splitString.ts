export const splitString = (string: string) => {
  const characters = []

  const regex = /[\s\S]/gu

  let match

  while ((match = regex.exec(string)) !== null) {
    characters.push(match[0])
  }
  return characters
}
