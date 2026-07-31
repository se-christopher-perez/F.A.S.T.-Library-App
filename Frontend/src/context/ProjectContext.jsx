
import { createContext, useContext, useState, useEffect } from "react"

import { fetchProjects, createProject, patchProject, deleteProject } from "../api/projects"
import { createLookup, deleteLookup } from "../api/lookups"
import { connectTagToLookup, disconnectTagFromLookup } from "../api/tags"

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

            if (data.error) return data

            setProjects((prevProjects) => [...prevProjects, data])

            return data

        })
            .catch((error) => {

                console.log(error)

                return { error: "Something went wrong! Please try again." }

            })

    }

    function updateProject(projectId, updates) {

        return patchProject(projectId, updates).then((data) => {

            if (data.error) return data

            setProjects((prevProjects) =>

                prevProjects.map((project) =>

                    project.id === projectId ? data : project

                )

            )

            return data

        })
            .catch((error) => {

                console.log(error)

                return { error: "Something went wrong! Please try again." }

            })

    }

    function removeProject(projectId) {

        return deleteProject(projectId).then((result) => {

            if (result.error) return result

            setProjects((prevProjects) => {

                return prevProjects.filter((project) => {

                    return project.id !== projectId

                })

            })

            return result

        })
            .catch((error) => {

                console.log(error)

                return { error: "Something went wrong! Please try again." }

            })

    }

    function addLookupToProject(projectId, lookupData) {

        return createLookup({ ...lookupData, project_id: projectId }).then((newLookup) => {

            if (newLookup.error) return newLookup

            function updateProject(project) {

                if (project.id !== projectId) return project

                const newLookupProject = { lookup: newLookup, project_id: projectId }
                const updatedLookupProjects = [...project.lookup_projects, newLookupProject]

                return { ...project, lookup_projects: updatedLookupProjects }

            }

            setProjects((prevProjects) => prevProjects.map(updateProject))

            return newLookup

        })
            .catch((error) => {

                console.log(error)

                return { error: "Something went wrong! Please try again." }

            })

    }

    function removeLookup(lookupId) {

        return deleteLookup(lookupId).then((result) => {

            if (result.error) return result

            function updateProject(project) {

                const filteredLookupProjects = project.lookup_projects.filter(

                    (lookup_project) => lookup_project.lookup.id !== lookupId

                )

                return { ...project, lookup_projects: filteredLookupProjects }
            }

            setProjects((prevProjects) => prevProjects.map(updateProject))

            return result

        })
            .catch((error) => {

                console.log(error)

                return { error: "Something went wrong! Please try again." }

            })

    }

    function addTagToLookup(lookupId, tagName) {

        return connectTagToLookup(lookupId, tagName).then((newLookupTag) => {

            if (newLookupTag.error) return newLookupTag

            function updateLookup(lookupProject) {

                if (lookupProject.lookup.id !== lookupId) return lookupProject

                const updatedTags = [...lookupProject.lookup.lookup_tags, newLookupTag]
                const updatedLookup = { ...lookupProject.lookup, lookup_tags: updatedTags }

                return { ...lookupProject, lookup: updatedLookup }

            }

            function updateProject(project) {

                const updatedLookupProjects = project.lookup_projects.map(updateLookup)

                return { ...project, lookup_projects: updatedLookupProjects }

            }

            setProjects((prevProjects) => prevProjects.map(updateProject))

            return newLookupTag

        })
            .catch((error) => {

                console.log(error)

                return { error: "Something went wrong! Please try again." }

            })

    }

    function removeTagFromLookup(lookupId, tagId) {

        return disconnectTagFromLookup(lookupId, tagId).then((result) => {

            if (result.error) return result

            function updateLookup(lookupProject) {

                if (lookupProject.lookup.id !== lookupId) return lookupProject

                const filteredTags = lookupProject.lookup.lookup_tags.filter((lt) => lt.tag_id !== tagId)
                const updatedLookup = { ...lookupProject.lookup, lookup_tags: filteredTags }

                return { ...lookupProject, lookup: updatedLookup }

            }

            function updateProject(project) {

                const updatedLookupProjects = project.lookup_projects.map(updateLookup)
                return { ...project, lookup_projects: updatedLookupProjects }

            }

            setProjects((prevProjects) => prevProjects.map(updateProject))

            return result

        })
            .catch((error) => {

                console.log(error)

                return { error: "Something went wrong! Please try again." }

            })

    }


    const values = { projects, setProjects, addProject, updateProject, removeProject, addLookupToProject, removeLookup, addTagToLookup, removeTagFromLookup }

    return (

        <ProjectContext.Provider value={values}>

            {children}

        </ProjectContext.Provider>

    )

}

export function useProjects() {

    return useContext(ProjectContext)

}