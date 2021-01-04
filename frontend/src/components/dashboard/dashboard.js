import React from 'react'
import Notifications from './notifications'
import ProjectList from '../tasks/listProj'
import { connect } from 'react-redux'
import { getProjects } from '../../stores/actions/getAllProjectsAction'
import { Redirect } from 'react-router-dom';

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.getProjects();
    }
    render() {
        // This is from map state to props
        const { projects, isLoggedIn } = this.props;
        // this.props.history.push('/'); (to be used after a deletion)
        //Container allows items to be contained in a central column
        //Materialize grid
        //  col s12 m6 means that 12 small size screens, 6 medium size screens
        //      Taking left half
        if (isLoggedIn === false) {
            return <Redirect to='/login'/>
        }
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects={projects}/>
                    </div>
                    <div className = "col s12 m5 offset-m1">
                    {
                        // Offset the screen on the right by 1 (the one we left out)
                        //<Notifications/>
                    }
                    </div>
                </div>
            </div>

        )
    }
}

// Redux is essentially giving a state where we store information
//  projectReducer.js contains more notes on Redux
const mapStateToProps = (state) => {
    // Create property "project" on the props(state which is combinedReducer, proj (projectReducer)
    //  and projects (item from the projectReducer initState))
    // "projects" is the prop, state.proj.projects is from Redux
    return {
        projects: state.proj.projects,
        isLoggedIn: state.auth.users.slice(-1)[0].isLoggedIn
    }
}


//dispatch is the store.dispatch function
const mapDispatchToProps = (dispatch) => {
    // dispatching given action when deletePost called- this.props.deletePost(this.props.projects.id)
    //if projects has a field id (it does, I think)
    return {
        getProjects: () => {dispatch(getProjects()) }
    }
}
/*
//USE ACTION_CREATOR (another file)
export const deletePost = (id) => {
    return {
        type: 'DELETE_POST',
        id
    }
}
*/


// Connect connects to the store and allows dashboard to use the 'projects' props that is created
//  Dashboard can now reference props.projects 
//Technically connect() is a function that returns a higher order component that
//  wraps the Dashboard, with a function specifying what we want to get
//Need to add the other map as well
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);