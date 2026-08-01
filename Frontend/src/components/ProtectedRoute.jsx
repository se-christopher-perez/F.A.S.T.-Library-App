
import { useAuth } from "../context/AuthContext"
import { Navigate  } from "react-router-dom"
import loadGif from "../images/load.gif"

function ProtectedRoute({ children }) {

    const { user, isLoading } = useAuth()

    if (isLoading) {

        return <p>Loading...</p>

    }

    if (!user) {

        return <Navigate to="/login" />

    }

    return children

}

export default ProtectedRoute