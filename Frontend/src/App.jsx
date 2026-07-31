
import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from './components/ProtectedRoute'
import NavBar from "./components/NavBar"
import ProjectForm from './components/ProjectForm'
import ProjectDetails from './pages/ProjectDetails'
import LookupDetails from './pages/LookupDetails'
import GenerateLookupForm from './components/GenerateLookupForm'

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
        <Route path="/create-project" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />
        <Route path="/generate-lookup" element={<ProtectedRoute><GenerateLookupForm /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      </Routes>

    </>
  )
}

export default App
