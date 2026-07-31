
import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from './components/ProtectedRoute'
import NavBar from "./components/NavBar"
import ProjectDetails from './pages/ProjectDetails'
import LookupDetails from './pages/LookupDertails'

import './App.css'


function App() {

  const { user } = useAuth()

  return (

    <>

      {user ? <NavBar /> : null}

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
        <Route path="/lookups/:id" element={<ProtectedRoute><LookupDetails /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      </Routes>

    </>
  )
}

export default App
