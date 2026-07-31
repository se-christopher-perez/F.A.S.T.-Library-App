
import { useAuth } from "../context/AuthContext"
import { Navigate  } from "react-router-dom"
import loadGif from "../images/load.gif"

function ProtectedRoute({ children }) {

    const { user, isLoading } = useAuth()

    if (isLoading) {

        console.log("Loading state active")

        return <img src={loadGif} alt="Loading..." />

    }

    if (!user) {

        return <Navigate to="/login" />

    }

    return children

}

export default ProtectedRoute