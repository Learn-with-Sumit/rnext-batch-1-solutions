export const getLikeCountString = (likes) => {
  return likes.length === 0
    ? 'No Likes'
    : likes.length === 1
      ? '1 Like'
      : `${likes.length} Likes`
}
