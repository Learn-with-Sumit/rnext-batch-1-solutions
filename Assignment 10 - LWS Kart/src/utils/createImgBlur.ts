const createImgBlur = async (url: string) => {
  // plaiceholder gives error with sharp module in prod, so, using a native solution and it works fine
  const imageBlur = await fetch(url).then(async (res) => {
    return Buffer.from(await res.arrayBuffer()).toString('base64')
  })

  return imageBlur
}
export default createImgBlur
