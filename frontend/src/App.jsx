import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

export default function App() {
  const isAuth = !!localStorage.getItem('token')
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
    </Routes>
  )
}
