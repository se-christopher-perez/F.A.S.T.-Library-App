
export function generateLookup(description){

    return fetch("http://localhost:5555/lookups/generate", {

        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({ description: description })

    })
    .then((r) => {

        return r.json()

    })

}