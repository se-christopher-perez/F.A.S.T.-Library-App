
import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Login() {

    const navigate = useNavigate()

    const { login } = useAuth()

    const [loginInfo, setLoginInfo] = useState({

        username: "",
        password: ""

    })

    const [error, setError] = useState(null)

    function handleLogin(e) {

        e.preventDefault()

        login(loginInfo).then((result) => {

            if (result.error) {

                setError(result.error)

                setTimeout(() => {

                    setError(null)

                }, 5000)

            } else {

                navigate("/")

            }

        })

    }

    return (

        <div className="main-login-container">

            <h1>F.A.S.T. LIBRARY</h1>

            <div className="login-container">

                <form onSubmit={handleLogin}>

                    <label htmlFor="username-input">Username: </label>
                    <input id="username-input" type="text" placeholder="Username" value={loginInfo.username} onChange={(e) => setLoginInfo((prevLoginInfo) => ({ ...prevLoginInfo, username: e.target.value }))} />

                    <label htmlFor="password-input">Password: </label>
                    <input id="password-input" type="password" placeholder="Password" value={loginInfo.password} onChange={(e) => setLoginInfo((prevLoginInfo) => ({ ...prevLoginInfo, password: e.target.value }))} />

                    <input type="submit" value="Login" />

                </form>

                <br />

                <span>Need an account? </span><Link to="/signup">Sign Up</Link>

            </div>

            <div className="main-error-container">

                {error ? <h2>{error}</h2> : null}

            </div>

        </div>

    )
}
export default Login;