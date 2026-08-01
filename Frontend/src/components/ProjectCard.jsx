
import React, { useState } from "react"
import { useProjects } from "../context/ProjectContext"
import { useNavigate } from "react-router-dom"

function ProjectCard({ project }) {

    const navigate = useNavigate()

    const { removeProject } = useProjects()

    const [error, setError] = useState(null)

    function handleDelete() {

        removeProject(project.id).then((result) => {

            if (result.error) {

                setError(result.error)

                setTimeout(() => {

                    setError(null)

                }, 5000)

            }

        })

    }

    function handleMore() {

        navigate(`/projects/${project.id}`)

    }

    function handleEdit() {

        navigate(`/projects/${project.id}/edit`)

    }

    return (

        <>

            <div className="main-projectcard-container">

                <div className="letter-projectcard">

                    <h1>{project.language.slice(0, 1).toUpperCase()}</h1>

                </div>

                <div className="title-projectcard" >

                    <h3>{project.title}</h3>

                </div>

                <div className="desription-projectcard" >

                    <p>

                        {
                            project.description.length > 100 ?
                                project.description.slice(0, 100) + "..."
                                :
                                project.description
                        }

                    </p>

                </div>

                <div className="buttons-container">

                    <button onClick={handleMore} className="more-button">MORE</button>
                    <button onClick={handleEdit} className="more-edit" >EDIT</button>
                    <button onClick={handleDelete} className="more-delete" >DELETE</button>

                </div>

                <div className="main-error-container">

                    {error ? <h1>{error}</h1> : null}

                </div>

            </div>

        </>

    )
}
export default ProjectCard;