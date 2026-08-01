
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useProjects } from "../context/ProjectContext"

function EditLookup() {

    const { id } = useParams()

    const navigate = useNavigate()

    const { projects, updateLookup } = useProjects()

    let existLookup = null

    for (const project of projects) {

        for (const lookupProject of project.lookup_projects) {

            if (lookupProject.lookup.id === Number(id)) {

                existLookup = lookupProject.lookup

            }

        }

    }

    if (!existLookup) {

        return <p>Lookup not found!</p>

    }

    const [formData, setFormData] = useState({

        title: existLookup.title,
        description: existLookup.description,
        category: existLookup.category,
        content: existLookup.content,
        beginner_explanation: existLookup.beginner_explanation,
        advance_explanation: existLookup.advance_explanation

    })

    const [error, setError] = useState(null)

    function handleSubmit(e) {

        e.preventDefault()

        updateLookup(Number(id), formData).then((data) => {

            if (data.error) {

                setError(data.error)

                setTimeout(() => {

                    setError(null)

                }, 5000)

            } else {

                navigate(`/lookups/${id}`)

            }

        })

    }

    return (

        <>

            <div className="main-lookup-edit-form-container">

                <div className="lookup-edit-form-title-container">

                    <h1>Edit Lookup: </h1>

                </div>

                <form onSubmit={handleSubmit} className="lookup-edit-form">

                    <div className="title-category-container">

                        <label htmlFor="title-input">Title: </label>
                        <input id="title-input" type="text" value={formData.title} onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, title: e.target.value }))} />

                        <label htmlFor="category-input">Category: </label>
                        <select id="category-input" value={formData.category} onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, category: e.target.value }))}>

                            <option value="">Select a category</option>
                            <option value="Syntax">Syntax</option>
                            <option value="Algorithm">Algorithm</option>
                            <option value="Formula">Formula</option>
                            <option value="Tools">Tools</option>

                        </select>

                    </div>

                    <div className="description-container">

                        <label htmlFor="description-input">Description: </label>
                        <textarea id="description-input" value={formData.description} onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, description: e.target.value }))}></textarea>

                    </div>

                    <div className="content-container">

                        <label htmlFor="content-input">Content: </label>
                        <textarea id="content-input" value={formData.content} onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, content: e.target.value }))}></textarea>

                    </div>

                    <div className="beginner-explanation-container">

                        <label htmlFor="beginner-explanation-input">Beginner Explanation: </label>
                        <textarea id="beginner-explanation-input" value={formData.beginner_explanation} onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, beginner_explanation: e.target.value }))}></textarea>

                    </div>

                    <div className="advance-explanation-container">

                        <label htmlFor="advance-explanation-input">Advanced Explanation: </label>
                        <textarea id="advance-explanation-input" value={formData.advance_explanation} onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, advance_explanation: e.target.value }))}></textarea>

                    </div>

                    <div className="submit-container">

                        <input type="submit" value="Update" />

                    </div>

                </form>

                <div className="main-error-container">

                    {error ? <h2>{error}</h2> : null}

                </div>

            </div>

        </>

    )

}


export default EditLookup