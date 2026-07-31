
import { createContext, useContext, useState, useEffect } from "react"
import { fetchProjects, createProject, patchProject, deleteProject } from "../api/projects"
import { useAuth } from "./AuthContext"

const ProjectContext = createContext()

export function ProjectProvider({ children }) {

    const { user } = useAuth()

    const [projects, setProjects] = useState([])

    useEffect(() => {

        if (!user) return

        fetchProjects().then((data) => {

            setProjects(data.projects)

        })

    }, [user])

    function addProject(newProject) {

        return createProject(newProject).then((data) => {

            setProjects((prevProjects) => [...prevProjects, data])

            return data

        })

    }

    function updateProject(projectId, updates) {

        return patchProject(projectId, updates).then((data) => {

            setProjects((prevProjects) =>

                prevProjects.map((project) =>

                    project.id === projectId ? data : project

                )

            )

            return data

        })

    }

    function removeProject(projectId) {

        return deleteProject(projectId).then((success) => {

            if (success) {

                setProjects((prevProjects) =>

                    prevProjects.filter((project) => project.id !== projectId)

                )

            }

            return success

        })

    }


    const values = { projects, setProjects, addProject, updateProject, removeProject }

    return (

        <ProjectContext.Provider value={values}>

            {children}

        </ProjectContext.Provider>

    )

}

export function useProjects() {

    return useContext(ProjectContext)

}