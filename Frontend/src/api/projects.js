
export function fetchProjects() {

    return fetch("http://localhost:5555/projects", {

        headers: { "Content-Type": "application/json" },
        credentials: "include"

    })
        .then((r) => {

            return r.json()

        })
        .then((data) => {

            return data

        })

}

export function createProject(projectData) {

    return fetch("http://localhost:5555/projects", {

        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(projectData)

    })
        .then((r) => {

            return r.json()

        })
        .then((data) => {

            return data

        })

}

export function patchProject(projectId, updates) {

    return fetch(`http://localhost:5555/projects/${projectId}`, {

        method: "PATCH",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updates)

    })
        .then((r) => {

            return r.json()

        })
        .then((data) => {

            return data

        })

}

export function deleteProject(projectId) {

    return fetch(`http://localhost:5555/projects/${projectId}`, {

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