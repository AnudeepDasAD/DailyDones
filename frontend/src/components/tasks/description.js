import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import SubmitButtonV2 from '../submitButtonV2'
import { NavLink } from 'react-router-dom';
import { deleteProject } from '../../stores/actions/deleteProjectAction'
import { Redirect } from 'react-router-dom';


//import { getProjectAction } from '../../stores/actions/getProjectAction';

const doEdit = async (props) => {
    //console.log(props.match);
    return;
}

const doDelete = async (props) => {
    //console.log(props.project); //works
    props.deleteProject({title: props.project.title});
}

// Should no longer use url- will take a passed in project and show its info
const Description = (props) => {
    // props contains router information
    //const id = props.match.params.id;
    const { project, isLoggedIn } = props;
    if (isLoggedIn === false) {
        return <Redirect to='/login'/>
    }
    return (
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title"> {project.title} </span>
                    <p>{project.content}</p>
                </div>
                <div className = "input-field">
                    <NavLink to={'/newProject/edit/'+ project.title} key={project.id}>  
                        <SubmitButtonV2
                            text={'Edit'}
                            disabled = {false}
                            onClick = { (event) => doEdit(props) }
                        /> 
                    </NavLink>
                </div>
                <div className = "input-field">
                    <NavLink to={'/delete/'+ project.title} key={project.id}>  
                        <SubmitButtonV2
                            text={'Delete'}
                            disabled = {false}
                            onClick = { (event) => doDelete(props) }
                        />
                    </NavLink>
                </div>
                <div className = "card-action grey lighten-4 grey-text">
                    <div>Posted by {project.author}</div>
                    {
                        // <div>27, September 1:00PM</div>
                    }
                </div>
            </div>
        </div>
        
    )
}

// We don't go to the database to get the item because it is already in the redux store

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    //ownProps is the props of the component before attaching anything else
    const id = ownProps.match.params.id;
    const projects = state.proj.projects;
    //console.log(projects);

    //Search projects for the project with the id that we have
    if (projects) {
        var i;
        for (i = 0; i < projects.length; i++) {
            //console.log(projects[i])
            if (parseInt(projects[i].id) == id) {
                return {
                    project: projects[i],
                    isLoggedIn: state.auth.users.slice(-1)[0].isLoggedIn
                }
            }
        }
    }

    return {

    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        //The function will dispatch an "action" (not action, but middleware this time)
        deleteProject: (project) => dispatch(deleteProject(project))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)(Description)
)