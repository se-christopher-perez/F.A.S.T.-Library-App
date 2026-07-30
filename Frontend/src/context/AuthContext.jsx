
import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        fetch("http://localhost:5555/check_session", {

            headers: { "Content-Type": "application/json" },
            credentials: "include"

        })
            .then((r) => {

                return r.ok ? r.json() : null

            })
            .then((data) => {

                setUser(data)

            })
            .catch((error) => {

                console.log(error)

            })
            .finally(() => setIsLoading(false))

    }, [])

    function login(loginInfo) {

        return fetch("http://localhost:5555/login", {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username: loginInfo["username"], password: loginInfo["password"] })

        })
            .then((r) => {

                return r.ok ? r.json() : null

            })
            .then((data) => {

                setUser(data)

            })
            .catch((error) => {

                console.log(error)

            })

    }

    function signup(signupInfo) {

        return fetch("http://localhost:5555/signup", {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username: signupInfo["username"], password: signupInfo["password"] })

        })
            .then((r) => {

                return r.ok ? r.json() : null

            })
            .then((data) => {

                setUser(data)

            })
            .catch((error) => {

                console.log(error)

            })

    }

    function logout(){

        return fetch("http://localhost:5555/logout", {

            method: "DELETE",
            credentials: "include"

        })
        .then((r) => {

            if (r.ok){

                setUser(null)

            }

        })
        .catch((error) => console.log(error))

    }

    const values = { user, isLoading, login, signup, logout }

    return (

        <AuthContext.Provider value={values}>
            { children }
        </AuthContext.Provider>

    )

}

export function useAuth() {

    return useContext(AuthContext)

}