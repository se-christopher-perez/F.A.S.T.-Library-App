
import React from "react"
import { useAuth } from "../context/AuthContext"

function UserCard() {

    const { user } = useAuth()

    return (

        <>

            <div className="main-user-card-container">

                <h1>{user.username.slice(0, 1).toUpperCase()}</h1>

                <p>Username: {user.username}</p>

            </div>

        </>

    )

}

export default UserCard