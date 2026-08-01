
import { useState } from "react"
import { useProjects } from "../context/ProjectContext"
import { generateLookup } from "../api/ai"
import TagCard from "./TagCard"

function GenerateLookupForm() {

    const { projects, addLookupToProject } = useProjects()

    const [question, setQuestion] = useState("")
    const [generated, setGenerated] = useState(null)
    const [projectId, setProjectId] = useState("")
    const [error, setError] = useState(null)

    const [tags, setTags] = useState([])
    const [tagInput, setTagInput] = useState("")

    function handleGenerate(e) {

        e.preventDefault()

        generateLookup(question).then((data) => {

            if (data.error) {

                setError(data.error)

                setTimeout(() => {

                    setError(null)

                }, 5000)

            } else {

                console.log(data)

                setGenerated(data)

                setQuestion("")

            }

        })

    }

    function handleSave(e) {

        e.preventDefault()

        if (!projectId) {

            setError("Please select a project!")

            setTimeout(() => {

                setError(null)

            }, 5000)

            return

        }

        addLookupToProject(Number(projectId), { ...generated, tags }).then((data) => {

            if (data.error) {

                setError(data.error)

                setTimeout(() => {

                    setError(null)

                }, 5000)

            } else {

                setGenerated(null)

                setProjectId("")

                setTags([])

            }

        })

    }

    function handleTag(e) {

        if (e.key === "Enter") {

            e.preventDefault()

            setTags((prevTags) => [...prevTags, tagInput.toLowerCase()])

            setTagInput("")

        }

    }

    return (

        <div className="main-generator-container">


            <div className="main-generator-form-container">

                <form className="generator-form" onSubmit={handleGenerate}>

                    <label htmlFor="question-input">Question: </label>
                    <input id="question-input" value={question} onChange={(e) => setQuestion(e.target.value)} />

                    <input type="submit" value="⚙️ GENERATE ⚙️" />

                    <br />

                </form>

                {generated ? (

                    <div className="generated-preview">

                        <h3>{generated.title}</h3>

                        <p>{generated.category}</p>

                        <pre>{generated.content}</pre>

                        <p>{generated.beginner_explanation}</p>

                        <p>{generated.advance_explanation}</p>

                    </div>

                ) : null}

                <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>

                    <option value="">Select a Project</option>

                    {projects.map((project) => {

                        return <option key={project.id} value={project.id}>{project.title}</option>

                    })}

                </select>

                <div className="main-tags-container">

                    <label htmlFor="tag-input">Input Tags: </label>
                    <input id="tag-input" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTag} />

                    <div className="tags-container">

                        {tags ? <label>Tags: </label> : null}

                        {tags.map((tag, index) => {

                            return <TagCard key={index} tag={tag} handleRemove={() => setTags((prevTags) => prevTags.filter((t) => t !== tag))} />

                        })}

                    </div>

                </div>

                <br /><br />

                <button onClick={handleSave}>⚙️ Save ⚙️</button>

                <div className="main-error-container">

                    {error ? <h2>{error}</h2> : null}

                </div>

            </div>

        </div>

    )

}

export default GenerateLookupForm