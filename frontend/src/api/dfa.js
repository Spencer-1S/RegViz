import client from './client'

export async function buildDfa({ regex, alphabet, minimize }) {
  const response = await client.post('/dfa', { regex, alphabet, minimize })
  return response.data
}
