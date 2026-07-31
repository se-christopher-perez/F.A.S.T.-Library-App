
import { createContext, useContext, useState, useEffect } from "react"
import { fetchProjects, createProject, updateProject, deleteProject } from "../api/projects"
import { useAuth } from "./AuthContext"

const ProjectContext = createContext()

export function ProjectProvider({ children }) {

    const { user } = useAuth()

    const [projects, setProjects] = useState([])

    useEffect(() => {

        if (!user) return

        fetchProjects().then((data) => {

            console.log(data.projects)

        })

    }, [user])

    const values = { projects, setProjects }

    return (

        <ProjectContext.Provider value={values}>

            {children}

        </ProjectContext.Provider>

    )

}