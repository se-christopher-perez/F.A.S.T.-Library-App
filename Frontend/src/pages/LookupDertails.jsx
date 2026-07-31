

import React from "react"
import { useParams } from "react-router-dom"
import { useProjects } from "../context/ProjectContext"

function LookupDetails() {

    const { id } = useParams()

    const { projects } = useProjects()

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

    return (

        <div className="main-lookup-details-container">

            <div className="lookup-title-container">

                <h1>{existLookup.category.slice(0, 1).toUpperCase()}</h1>
                <h2>{existLookup.title}</h2>

            </div>

            <div className="lookup-description">

                <p><strong>Description/Prompt:</strong> {existLookup.description}</p>

            </div>

            <div className="lookup-content-container">

                <pre className="lookup-content">

                    {existLookup.content}

                </pre>

            </div>

            <div className="lookupdetail-explanations">

                <p><strong>Beginner:</strong> {existLookup.beginner_explanation}</p>

                <p><strong>Advanced:</strong> {existLookup.advance_explanation}</p>

            </div>

        </div>

    )
}
export default LookupDetails;