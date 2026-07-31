
import React from "react";
import { useProjects } from "../context/ProjectContext";

function Dashboard() {

    const { projects } = useProjects()

    return (

        <div>

            {projects.map((project) => {

                return <p>{project.title}<br/>{project.description}</p>

            })}

        </div>

    )
}
export default Dashboard;