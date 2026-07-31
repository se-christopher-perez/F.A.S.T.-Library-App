
import React, { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

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

            <button onClick={handleLogout}>LogOut</button>

            <div className="main-error-container">

                {error ? <h2>{error}</h2> : null}

            </div>

        </>

    )

}

export default NavBar