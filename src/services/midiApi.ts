import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000/api'

const generateMidi = async (params: { genre: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate/`, params, {
      responseType: 'blob',
    })
    return response.data
  } catch (error) {
    console.error('Error generating MIDI: ', error)
    throw error
  }
}

export { generateMidi }
