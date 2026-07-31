
import React from "react";
import { useProjects } from "../context/ProjectContext";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";

function Dashboard() {

    const { projects } = useProjects()

    return (

        <div className="main-dashboard-container">

            <ProjectForm/>

            <div className="projects-container">

                <h1>Projects</h1>

                {projects.map((project) => {

                    return <ProjectCard key={project.id} project={project} />

                })}

            </div>

        </div>

    )
}
export default Dashboard;