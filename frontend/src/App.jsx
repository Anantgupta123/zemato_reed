import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { AuthProvider } from './context/AuthContext'

import './App.css'
import './styles/theme.css'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
