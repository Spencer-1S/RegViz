import axios from 'axios'

const envBase = import.meta.env.VITE_API_BASE
const baseURL = envBase ? `${envBase.replace(/\/$/, '')}/api` : '/api'

const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default client
