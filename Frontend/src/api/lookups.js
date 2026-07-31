
export function fetchLookups() {

    return fetch("http://localhost:5555/lookups", {

        headers: { "Content-Type": "application/json" },
        credentials: "include"

    })
        .then((r) => {

            return r.json()

        })

}

export function createLookup(lookupData) {

    return fetch("http://localhost:5555/lookups", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(lookupData)

    })
        .then((r) => {

            return r.json()

        })

}

export function patchLookup(lookupId, updates) {

    return fetch(`http://localhost:5555/lookups/${lookupId}`, {

        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updates)

    })
        .then((r) => {

            return r.json()

        })

}

export function deleteLookup(lookupId) {

    return fetch(`http://localhost:5555/lookups/${lookupId}`, {

        method: "DELETE",
        credentials: "include"

    })
        .then((r) => {

            if (r.ok) {

                return { success: true }

            }

            return r.json()

        })

}