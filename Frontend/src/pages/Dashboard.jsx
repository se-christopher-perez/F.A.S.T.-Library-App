
import React from "react";
import { useProjects } from "../context/ProjectContext";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import UserCard from "../components/UserCard";

function Dashboard() {

    const { projects } = useProjects()

    return (

        <div className="main-dashboard-container">

            <UserCard />

            <div className="projects-container">

                <h1>Projects</h1>

                <div className="project-grid-container">

                    {

                        projects.length === 0 ? (

                            <p>You have no projects yet! To get started, head to create project!</p>

                        ) : (

                            projects.map((project) => {

                                return <ProjectCard key={project.id} project={project} />

                            })

                        )

                    }


                </div>

            </div>

        </div>

    )
}
export default Dashboard;