import React from 'react'

const Summary = ({project}) => {
    return (
        <div className= "card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title"> {project.title} </span>
                {//<p>Posted by {project.author} </p>
                }
                <p>Posted by {project.author} </p>
                {
                   // <p className = "grey-text"> 27 September 1:00 PM</p>
                } 
            </div>
        </div>
    )
}

export default Summary