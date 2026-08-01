
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProjects } from "../context/ProjectContext"

function LookupCard({ lookup }) {

    const navigate = useNavigate()

    const { removeLookup } = useProjects()
    const [error, setError] = useState(null)

    function handleMore() {

        navigate(`/lookups/${lookup.id}`)

    }

    function handleDelete() {

        removeLookup(lookup.id).then((result) => {

            if (result.error) {

                setError(result.error)

                setTimeout(() => setError(null), 5000)

            }

        })


    }

    function handleEdit() {

        navigate(`/lookups/${lookup.id}/edit`)

    }

    return (

        <div className="main-lookupcard-container">

            <div className="title-lookupcard" >

                <h3>{lookup.title}</h3>
                
                <br />

            </div>

            <div className="lookupcard-container">

                <div className="letter-lookupcard">

                    <h1>{lookup.category.slice(0, 1).toUpperCase()}</h1>

                </div>

                <br />

                <p>

                    {
                        lookup.description.length > 100 ?
                            lookup.description.slice(0, 100) + "..."
                            :
                            lookup.description
                    }

                </p>

            </div>

            <div className="buttons-container">

                <button onClick={handleMore} className="more-button">MORE</button>
                <button onClick={handleEdit} className="edit-button" >EDIT</button>
                <button onClick={handleDelete} className="delete-button">DELETE</button>

            </div>

            <div className="error-handle-container">

                {error ? <h1>{error}</h1> : null}

            </div>

        </div>
    )

}

export default LookupCard