
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ProjectProvider } from "./context/ProjectContext"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")).render(

  <BrowserRouter>

    <AuthProvider>

      <ProjectProvider>

        <App />

      </ProjectProvider>

    </AuthProvider>

  </BrowserRouter>
  
)