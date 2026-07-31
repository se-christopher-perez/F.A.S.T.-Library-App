
import React, { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

function NavBar() {

    const navigate = useNavigate()

    const { logout } = useAuth()

    const [error, setError] = useState(null)

    function handleLogout() {

        logout().then((result) => {

            if (result.error) {

                setError(result.error)

                setTimeout(() => {

                    setError(null)

                }, 5000)

            } else {

                navigate("/login")

            }

        })

    }

    return (

        <>

            <nav className="main-navbar-container">

                <Link to="/">Dashboard</Link>
                <Link to="/create-project">Create Project</Link>
                <Link to="/generate-lookup">Generate Lookup</Link>
                
                <button onClick={handleLogout}>Logout</button>

            </nav>

            <div className="main-error-container">

                {error ? <h2>{error}</h2> : null}

            </div>

        </>

    )

}

export default NavBar