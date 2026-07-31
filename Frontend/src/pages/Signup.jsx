
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Signup() {

    const navigate = useNavigate()

    const { signup } = useAuth()

    const [signUpInfo, setSignUpInfo] = useState({

        username: "",
        password: ""

    })

    const [error, setError] = useState(null)

    function handleSignUp(e) {

        e.preventDefault()

        signup(signUpInfo).then((result) => {

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

        <div className="main-signup-container">

            <div className="signup-container">

                <form onSubmit={handleSignUp}>

                    <label htmlFor="username-input">Username: </label>
                    <input id="username-input" type="text" placeholder="Username" value={signUpInfo.username} onChange={(e) => setSignUpInfo((prevSignUpInfo) => ({ ...prevSignUpInfo, username: e.target.value }))} />

                    <label htmlFor="password-input">Password: </label>
                    <input id="password-input" type="password" placeholder="Password" value={signUpInfo.password} onChange={(e) => setSignUpInfo((prevSignUpInfo) => ({ ...prevSignUpInfo, password: e.target.value }))} />

                    <input type="submit" value="Sign Up" />

                </form>

            </div>

            <div className="main-error-container">

                {error ? <h2>{error}</h2> : null}

            </div>

        </div>

    )
}
export default Signup;