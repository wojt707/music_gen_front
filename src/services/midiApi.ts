import axios from 'axios'

const API_BASE_URL = 'https://midiforgeapi.onrender.com/api'

type GenerateMidiResponse = Blob

const generateMidi = async (params: {
  genre: string
}): Promise<GenerateMidiResponse> => {
  try {
    const response = await axios.post<GenerateMidiResponse>(
      `${API_BASE_URL}/generate/`,
      params,
      {
        responseType: 'blob',
      }
    )
    return response.data
  } catch (error) {
    console.error('Error generating MIDI: ', error)
    throw error
  }
}

type Genre = {
  code: string
  name: string
}
type GetGenresResponse = Genre[]

const getGenres = async (): Promise<GetGenresResponse> => {
  try {
    const response = await axios.get<GetGenresResponse>(
      `${API_BASE_URL}/genres/`
    )
    return response.data
  } catch (error) {
    console.error('Error getting the genres: ', error)
    throw error
  }
}

export { generateMidi, getGenres }
