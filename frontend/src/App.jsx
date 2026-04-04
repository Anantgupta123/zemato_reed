import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import Home from './pages/Home.jsx'
import UserAuth from './pages/UserAuth.jsx'
import PartnerAuth from './pages/PartnerAuth.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Navbar from './components/Navbar.jsx'
import './index.css'

function AppContent() {
  const { user, partner, token } = useAuth()
  const isAuthenticated = token && (user || partner)

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-auth" element={<UserAuth />} />
          <Route path="/partner-auth" element={<PartnerAuth />} />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

