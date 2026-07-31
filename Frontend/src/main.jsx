
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
// import { ProjectsProvider } from "./context/ProjectsContext"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")).render(

  <BrowserRouter>

    <AuthProvider>

      {/* <ProjectsProvider> */}

        <App />

      {/* </ProjectsProvider> */}

    </AuthProvider>

  </BrowserRouter>
  
)