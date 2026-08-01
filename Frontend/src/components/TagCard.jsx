
import React from "react"

function TagCard({ tag, handleRemove }) {

    return (

        <>

            <span>

                {tag}

                <b onClick={handleRemove} className="x-button"> ❌ </b>

            </span>

        </>

    )

}

export default TagCard