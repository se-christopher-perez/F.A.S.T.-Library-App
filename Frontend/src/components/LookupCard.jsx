
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

    return (

        <div className="main-lookupcard-container">

            <div className="lookupcard-container">

                <div className="letter-lookupcard">

                    <h1>{lookup.category.slice(0, 1).toUpperCase()}</h1>

                </div>


                <div className="title-lookupcard" >

                    <h3>{lookup.title}</h3>

                </div>

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

                <button onClick={handleMore}>MORE</button>
                <button onClick={handleDelete} >DELETE</button>

            </div>

            <div className="error-handle-container">

                {error ? <h1>{error}</h1> : null}

            </div>

        </div>
    )

}

export default LookupCard