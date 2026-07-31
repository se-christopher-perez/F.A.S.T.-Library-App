

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

                <h2>Description</h2>

                <p><strong>Description/Prompt:</strong> {existLookup.description}</p>

            </div>

            <div className="lookup-content-container">
                
                <h2>Content</h2>

                <pre className="lookup-content">

                    {existLookup.content}

                </pre>

            </div>

            <div className="lookup-detail-explanations">

                <h2>Explainations</h2>

                <p><strong>Beginner:</strong> {existLookup.beginner_explanation}</p>

                <p><strong>Advanced:</strong> {existLookup.advance_explanation}</p>

            </div>

            <div className="lookup-tags">

                <h2>Tags</h2>

                {existLookup.lookup_tags.map((lookupTag) => {

                    return <p key={lookupTag.id} className="tag-chip">{lookupTag.tag.name}</p>

                })}

            </div>

        </div>

    )
}
export default LookupDetails;