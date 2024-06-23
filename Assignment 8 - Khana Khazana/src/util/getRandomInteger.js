export default function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
