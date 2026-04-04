import axios from 'axios'
import Cookies from 'js-cookie'

const API_BASE = '/api/auth'

const api = axios.create({
  withCredentials: true, // Include cookies
  headers: {
    'Content-Type': 'application/json',
  },
})

export const authAPI = {
  registerUser: async (data) => {
    const response = await api.post(`${API_BASE}/register`, data)
    return response.data
  },
  loginUser: async (data) => {
    const response = await api.post(`${API_BASE}/login`, data)
    return response.data
  },
  logoutUser: async () => {
    const response = await api.post(`${API_BASE}/logout`)
    return response.data
  },
  registerPartner: async (data) => {
    const response = await api.post(`${API_BASE}/patnerRegister`, data)
    return response.data
  },
  loginPartner: async (data) => {
    const response = await api.post(`${API_BASE}/patnerLogin`, data)
    return response.data
  },
  logoutPartner: async () => {
    const response = await api.post(`${API_BASE}/patnerLogout`)
    return response.data
  },
}

export default api

