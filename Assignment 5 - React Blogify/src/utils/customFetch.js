import axios from 'axios'
import { BASE_URL } from '../constants.js'

const customFetch = axios.create({
  baseURL: BASE_URL,
})

export default customFetch
