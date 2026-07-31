
import { React } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from './components/ProtectedRoute'
// import ProjectDetail from "./pages/ProjectDetail"
import NavBar from "./components/NavBar"

import { useAuth } from './context/AuthContext'

function App() {

  const { user } = useAuth()

  return (

    <>

      {user ?
        (

          <NavBar />

        ) : (

          <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          </Routes>

        )}

    </>
  )
}

export default App
