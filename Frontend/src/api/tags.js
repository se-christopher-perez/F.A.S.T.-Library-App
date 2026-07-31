
export function fetchTags() {

    return fetch("http://localhost:5555/tags", {

        headers: { "Content-Type": "application/json" },
        credentials: "include"

    })
        .then((r) => {

            return r.json()

        })

}

export function createTag(name) {

    return fetch("http://localhost:5555/tags", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ "name": name })

    })
        .then((r) => {

            return r.json()

        })

}

export function connectTagToLookup(lookupId, tagName) {

    return fetch(`http://localhost:5555/lookups/${lookupId}/tags`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ "name": tagName })

    })
        .then((r) => {

            return r.json()

        })

}

export function disconnectTagFromLookup(lookupId, tagId) {

        return fetch(`http://localhost:5555/lookups/${lookupId}/tags/${tagId}`, {

        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include"

    })
        .then((r) => {

            if (r.ok) {

                return { success: true }

            }

            return r.json()

        })

}