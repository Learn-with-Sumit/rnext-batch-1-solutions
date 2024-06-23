import { BASE_URL } from '../../constants.js'

const Avatar = ({ avatar, ...props }) => {
  return avatar ? (
    <img src={`${BASE_URL}/uploads/avatar/${avatar}`} alt='avatar-image' />
  ) : (
    <span>{props.firstName[0]}</span>
  )
}
export default Avatar
