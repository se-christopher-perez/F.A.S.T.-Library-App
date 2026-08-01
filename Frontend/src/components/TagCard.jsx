
import React from "react"

function TagCard({ tag, handleRemove }){

    return (

        <>
        
        <span>
            
            {tag}
            
            <button onClick={handleRemove}>×</button>
            </span>

        </>

    )

}

export default TagCard