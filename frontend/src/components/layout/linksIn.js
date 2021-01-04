import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createLogoutReq } from '../../stores/actions/logoutActions';
import SubmitButton from '../submitButton';


// No state so does not need to be a class

class LinksIn extends React.Component {
    constructor(props){
        super(props);
    }

    logout() {
        this.props.logout(this.props.user);
    }

    render(){
        return (
            <ul className = "right">
                <li> <NavLink to='/newProject'>New Project</NavLink></li>
                <li> 
                    <SubmitButton
                        text={'Logout'}
                        disabled = {false}
                        onClick = { () => {this.logout()}}
                    />
                </li>
                {//Little circle for the username
                }
                <li> <NavLink to='/' className = 'btn btn-floating blue lighten-1'>DJ</NavLink></li>
            </ul>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.users.slice(-1)[0]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: async (user) => dispatch(createLogoutReq(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LinksIn);