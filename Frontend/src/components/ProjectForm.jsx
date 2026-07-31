
import { useState } from "react"
import { useProjects } from "../context/ProjectContext"

function ProjectForm() {

    const { addProject } = useProjects()

    const [formData, setFormData] = useState({

        title: "",
        description: "",
        language: ""

    })

    const [error, setError] = useState(null)

    function handleSubmit(e) {

        e.preventDefault()

        addProject(formData).then((data) => {

            if (data.error) {

                setError(data.error)

                setTimeout(() => {

                    setError(null)

                }, 5000)

            } else {

                setFormData({

                    title: "",
                    description: "",
                    language: ""

                })

            }

        })
            .catch((error) => {

                console.log(error)

            })

    }

    return (

        <>

            <div className="main-form-container">

                <div className="form-title-container">

                    <h1>Create a Project: </h1>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="title-language-container">

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

                    </div>

                    <div className="description-container">


                        <label htmlFor="description-input">Description: </label>
                        <textarea id="description-input" value={formData.description} onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, description: e.target.value }))} ></textarea>

                    </div>

                    <div className="submit-container">

                        <input type="submit" value="CREATE" />

                    </div>

                    <div className="error-handle-container">

                        {error ? <h1>{error}</h1> : null}

                    </div>

                </form >

            </div >

        </>

    )

}

export default ProjectForm