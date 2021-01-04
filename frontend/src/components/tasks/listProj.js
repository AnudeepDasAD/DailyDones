import React from 'react'
import Summary from './projSummary'
import Description from './description'
import { NavLink } from 'react-router-dom';


// Caller is going to be sending a props with the projects
const ProjectList = ({projects}) => {
    return (
        //section is a materialize style keyword, project-list is our own
        <div className="project-list section">
            {   // Add an onSubmit which fetches desription
                projects && projects.map(project => {
                    var link = '/project/'+project.id;
                    return (
                        <ul>
                            <li> <NavLink to={link} key={project.id}> <Summary project={project} /> </NavLink> </li>
                        </ul>
                    )
                })
            }
        </div>
    )
}

export default ProjectList;