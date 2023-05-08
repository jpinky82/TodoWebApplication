import React from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navigation from './Components/Navigation'
import ToDos from './Components/ToDos/ToDos'
import Categories from './Components/Categories/Categories'
import About from './Components/About/About'
import Login from './Components/Auth/Login'
import NotFound from './Components/NotFound/NotFound'
import Footer from './Components/Footer'
import AuthProvider from './Contexts/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute'
import Profile from './Components/Profile/Profile'


export default function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<ProtectedRoute><ToDos /></ProtectedRoute>} />
            <Route path='/ToDos' element={<ProtectedRoute><ToDos /></ProtectedRoute>} />
            <Route path='/Categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path='/About' element={<About />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
        <Footer />
      </AuthProvider>
    </div>
  )
}

