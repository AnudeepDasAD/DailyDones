import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../stores/actions/projectActions'
import { Redirect } from 'react-router-dom';

export class NewProject extends Component {
    constructor(props){
        super(props);
        //console.log(props);
    }
    componentDidMount() {
        if (this.state.editProj) {
            document.getElementById("newProjectName").value = this.state.projectName;
            document.getElementById("newProjectDesc").value = this.state.projectDesc;
        } else {
            document.getElementById("projectName").value = this.state.projectName;
            document.getElementById("projectDesc").value = this.state.projectDesc;
        }
        this.setState({
            newProjectName: this.state.projectName,
            newProjectDesc: this.state.projectDesc
        })
    }
    state = {
        author: this.props.name.slice(-1)[0].username, 
        projectName: this.props.editTitle ? this.props.editTitle : '',
        projectDesc: this.props.editProjectDesc ? this.props.editProjectDesc : '',
        newProjectName: '',
        newProjectDesc: '',
        editProj: this.props.editTitle ? true : false
    }

    handleSubmit = (e)  => {
        e.preventDefault(); //Prevents form submission by pressing enter
        
        console.log('state is: ', this.state);
        this.props.createProject(this.state).then((data) => {
            //return <Redirect to='/'/>
            document.getElementById("newProj").reset();
            if (data) {
                alert(data.msg);
            }
            this.setState({
                author: this.props.name.slice(-1)[0].username,
                projectName: '',
                projectDesc: ''
            })
        })
        //this.props.history.push('/');
        
    }

    handleChange = (e) => {
        //Update state: set the id (projectDesc or projectName)
        //  to the value that is entered by the user
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {

        const isLoggedIn = this.props.name.slice(-1)[0].isLoggedIn;
        if (isLoggedIn === false) {
            return <Redirect to='/login'/>
        }
        return (
            //value = {this.state.projectName} as a param
            <div className = "container">
                <form onSubmit = {this.handleSubmit} className="white" id="newProj">
                    <h5 className = "grey-text text-darken-3"> Create new project</h5>
                    <div className = "input-field">
                        <label htmlFor="projectName"> {this.state.editProj ? '' : 'Project name'} </label>
                        <input type="text" id = {this.state.editProj ? "newProjectName":"projectName"}
                        onChange={this.handleChange}/>
                    </div>

                    <div className = "input-field">
                        <label htmlFor="projectDesc"> {this.state.editProj ? '' : 'Project description'} </label>
                        <textarea id={this.state.editProj ? "newProjectDesc" : "projectDesc"} className="materialize-textarea"
                        onChange={this.handleChange}></textarea>
                    </div>

                    <div className = "input-field">
                        <button className = "btn blue lighten-1 z-depth-0"> {this.state.editProj ? 'Edit' : 'Create'} </button>
                    </div>
                </form>
            </div>
        )
    }
}

const getEditProjectDesc = (projects, editTitle) => {
    var i;
    for (i in projects) {
        //console.log(projects[i]);
        if (editTitle === projects[i].title) {
            return projects[i].content;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    var editTitle = ownProps.match.params.title;
    console.log(editTitle); //undefined if not an edit
    var editProjectDesc = editTitle ? getEditProjectDesc(state.proj.projects, editTitle) : '';
    return {
        editTitle: editTitle,
        editProjectDesc: editProjectDesc,
        name: state.auth.users,
        projects: state.proj.projects
    }
}

// Given a project, dispatch it (similar to given an action dispatch)
//createProject is like an action-creator (see file to see what is returned)
const mapDispatchToProps = (dispatch) => {
    return {
        //The function will dispatch an "action" (not action, but middleware this time)
        createProject: (project) => dispatch(createProject(project))
    }
}

// First parameter is mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(NewProject)
