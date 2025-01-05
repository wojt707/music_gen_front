import axios from 'axios'
import { BackendError, GenerateMidiParams } from '@/types'

// const API_BASE_URL = 'https://midiforgeapi.onrender.com/api'
const API_BASE_URL = 'http://127.0.0.1:8000/api'

type GenerateMidiResponse = Blob

const generateMidi = async (
  params: GenerateMidiParams
): Promise<GenerateMidiResponse> => {
  return axios
    .post<GenerateMidiResponse>(`${API_BASE_URL}/generate/`, params, {
      responseType: 'blob',
    })
    .then((response) => response.data)
    .catch(async (error) => {
      const statusCode = error.response.status
      const responseObj = await error.response.data.text()
      const message = JSON.parse(responseObj).message
      throw new BackendError(message, statusCode)
    })
}

type Genre = {
  code: string
  name: string
}
type GetGenresResponse = Genre[]

const getGenres = async (): Promise<GetGenresResponse> => {
  return axios
    .get<GetGenresResponse>(`${API_BASE_URL}/genres/`)
    .then((response) => response.data)
    .catch((error) => {
      const statusCode = error?.status
      const message = error?.response?.data?.message
      console.log(error)
      console.log(statusCode)
      console.log(message)
      if (!statusCode || !message) {
        throw error
      } else {
        throw new BackendError(message, statusCode)
      }
    })
}

export { generateMidi, getGenres }
