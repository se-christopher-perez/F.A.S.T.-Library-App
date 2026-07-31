
import React from "react"
import { useParams } from "react-router-dom"
import { useProjects } from "../context/ProjectContext"

function ProjectDetails() {
    
    const { id } = useParams()

    const { projects } = useProjects()

    const project = projects.find((project) => {

        return project.id === Number(id)

    })

    if (!project){

        return <h3>Project not found!</h3>

    }

    return (

        <div className="main-project-details-container">

            <h1>{project.title}</h1>

            <h2>Language: {project.language}</h2>

            <h3>Description: </h3>

            <p>{project.description}</p>
            
        </div>

    )
}
export default ProjectDetails;