import axios from 'axios'
import { BackendError, GenerateMidiParams, Genre } from '@/types'

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

const getGenres = async (): Promise<Genre[]> => {
  return axios
    .get<Genre[]>(`${API_BASE_URL}/genres/`)
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

type SampleResponse = {
  [key: string]: string
}

const getPianoSamples = async (): Promise<SampleResponse> => {
  const sampleNames = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8']

  const sampleUrls: SampleResponse = {}

  await Promise.all(
    sampleNames.map(async (sampleName) => {
      await axios
        .get(`${API_BASE_URL}/samples/${sampleName}v8.mp3`, {
          responseType: 'arraybuffer',
        })
        .then((response) => {
          const audioUrl = URL.createObjectURL(new Blob([response.data]))
          sampleUrls[sampleName] = audioUrl
        })
        .catch((error) => {
          console.error('Error fetching piano samples:', error)
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
    })
  )
  return sampleUrls
}

export { generateMidi, getGenres, getPianoSamples }
