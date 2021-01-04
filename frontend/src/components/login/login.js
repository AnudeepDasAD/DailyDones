import React from 'react';
import SubmitButton from '../submitButton';
import UserStore from '../../stores/userStore';
import InputField from '../inputField';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { createLoginReq } from '../../stores/actions/loginActions'
import { createGoogleLoginReq } from '../../stores/actions/googleLogin'
import { createRegisterReq } from '../../stores/actions/registerActions'
import { createLogoutReq } from '../../stores/actions/logoutActions'
import { Redirect, NavLink } from 'react-router-dom';



//This will be replace with all the parts of the login screen

class Login extends React.Component {

    constructor(props){
        super(props);

        //Disable the button when it has already been clicked
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false
        }

        //this.responseGoogle = this.responseGoogle.bind();
    }



    setValueInInput(property, value) {
        value = value.trim(); //remove spaces

        //Setting the maximum length of the username and password to 12
        
        if (value.length > 12) {
            alert( [property] + " is 12 characters maximum");
            return;
        }
        
       this.setState({
           [property]: value
       })
    }



    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }



    async doLogin() {
        if(!this.state.username) {
            return;
        }
        if (!this.state.password) {
            return;
        }

        
        this.props.login(this.state).then(()=>{
            //After clicking login, the button is disabled
            console.log(this.props.name);
             if (this.props.name && this.props.name.length !== 0 && this.props.name.slice(-1)[0].username === this.state.username) {
                this.setState({
                    buttonDisabled: true
                })
            } else {
                console.log(this.props.name.slice(-1)[0]);
                console.log(typeof(this.props.name.slice(-1)[0]));
                this.resetForm();
            }
        }).catch((err) => {
            console.log(err);
            this.resetForm();
        });
    }

    async responseGoogle(response) {
        console.log('responseGoogle has been reached');
        console.log(response.profileObj.name);
        console.log(response);
        this.props.googleLogin(response).then(() => {
            console.log(this.props.name)
        }).catch((err) => {
            console.log(err);
            this.resetForm();
        })
    }

  render() {
    const isLoggedIn = this.props.name.slice(-1)[0].isLoggedIn;
    if (isLoggedIn === true) {
        return <Redirect to='/'/>
    }
    return (
        //e.target.value (val.target.value) is going to be passed in for the val in onChange
      <div className="container">
          <h5 className = "grey-text text-darken-3"> Log in</h5>
          <div className = "input-field">
            <InputField
                  type='text'
                  placeholder='Username'
                  value = {this.state.username ? this.state.username : ''}
                  onChange = { (val) => this.setValueInInput('username', val)}
              />
          </div>
          <div className = "input-field">
            <InputField
                type='password'
                placeholder='Password'
                value = {this.state.password ? this.state.password : ''}
                onChange = { (val) => this.setValueInInput('password', val)}
            />
          </div>
          <div className = "input-field">
            <NavLink to = '/'>
                <SubmitButton
                text={'Login'}
                disabled = {this.state.buttonDisabled}
                onClick = { () => {this.doLogin()}}
                />
            </NavLink>
          </div>

            <GoogleLogin
              //clientId='609330688497-0rm9gulub6ibk4e3g94dt0aqdcu794c6.apps.googleusercontent.com' // local
              clientId = '609330688497-qrimr3155pjtsn1qg3kj6n5n3ae8r9ti.apps.googleusercontent.com' //heroku
              buttonText='Use Google to Login or Register'
              onSuccess={(response) => {this.responseGoogle(response)}}
              onFailure={(response) => {this.responseGoogle(response)}}
              cookiePolicy={'single_host_origin'}
              isSignedIn={false}
            />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
    //console.log(state);
    return {
        name: state.auth.users
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        login: async (loginInfo) => dispatch(createLoginReq(loginInfo)),
        register: async (registerInfo) => dispatch(createRegisterReq(registerInfo)),
        googleLogin: async (googleLoginInfo) => dispatch(createGoogleLoginReq(googleLoginInfo)),
        logout: async (logoutInfo) => dispatch(createLogoutReq(logoutInfo))  //May not be necessary
    }
}

//Need to use compose from redux to connect several higher order components together
export default connect(mapStateToProps, mapDispatchToProps)(Login); 













/*import React, { Component } from 'react';
import loginAnim from '../../logo.svg';

export class login extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="base-container">
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={loginAnim} alt=""/>
                        <a href='https://www.freepik.com/vectors/technology'>Technology vector created by freepik - www.freepik.com</a>
                    </div>
                </div>
            </div>
            
        )
    }
}
*/

/*
<div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name='username' placeholder='username'/>
                            <label htmlFor="pasword">Password</label>
                        </div>
                    </div>
*/
