
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useProjects } from "../context/ProjectContext"

function EditProject() {

    const { id } = useParams()
    const navigate = useNavigate()
    const { projects, updateProject } = useProjects()

    const project = projects.find((project) => {
        return project.id === Number(id)
    })

    const [formData, setFormData] = useState({
        title: "",
        language: "",
        description: ""
    })

    const [error, setError] = useState(null)

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title,
                language: project.language,
                description: project.description
            })
        }
    }, [project])

    if (!project) {
        return <p>Project not found</p>
    }

    function handleSubmit(e) {

        e.preventDefault()

        updateProject(Number(id), formData).then((data) => {

            if (data.error) {
                setError(data.error)
                setTimeout(() => setError(null), 5000)
            } else {
                navigate(`/projects/${id}`)
            }

        })

    }

    return (

        <>

            <div className="main-edit-form-container">

                <form onSubmit={handleSubmit} className="edit-form">

                    <label htmlFor="title-input">Title: </label>
                    <input id="title-input" type="text" value={formData.title} onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, title: e.target.value }))} />

                    <label htmlFor="language-input">Language: </label>
                    <select id="language-input" value={formData.language} onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, language: e.target.value }))}>

                        <option value="">Select a category</option>
                        <option value="python">Python</option>
                        <option value="sql">SQL</option>
                        <option value="javascript">JS</option>
                        <option value="ruby">Ruby</option>
                        <option value="c#">C#</option>
                        <option value="c++">C++</option>

                    </select>

                    <label htmlFor="description-input">Description: </label>
                    <textarea id="description-input" value={formData.description} onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, description: e.target.value }))} ></textarea>

                    <input type="submit" value="Update" />

                </form>

                <div className="main-error-container">

                    {error ? <h2>{error}</h2> : null}

                </div>

            </div>

        </>

    )

}

export default EditProject