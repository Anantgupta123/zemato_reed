import axios from 'axios'

const API_BASE = '/api/food'

const api = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data', // For video upload
  },
})

export const foodAPI = {
  createReel: async (formData) => {
    const response = await api.post(API_BASE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
  getReels: async () => {
    const response = await api.get(`${API_BASE}/food`)
    return response.data
  },
}

export default api

