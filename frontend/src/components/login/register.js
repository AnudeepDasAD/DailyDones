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

class Register extends React.Component {

    constructor(props){
        super(props);

        //Disable the button when it has already been clicked
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false,
            firstName: '',
            lastName: ''
        }
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


    async doRegister() {
      if(!this.state.username) {
          return;
      }
      if (!this.state.password) {
          return;
      }

      
      this.props.register(this.state).then(()=>{
          //After clicking login, the button is disabled
          //console.log(this.props.name);
          console.log(this.state);
          this.resetForm();
      }).catch((err) => {
          console.log(err);
          this.resetForm();
      });
    }


    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
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
          <h5 className = "grey-text text-darken-3"> Register </h5>
          <div className = "input-field">
            <InputField
                type='text'
                placeholder='FirstName'
                value = {this.state.firstName ? this.state.firstName : ''}
                onChange = { (val) => this.setValueInInput('firstName', val)}
            />
            </div>
            <div className = "input-field">
            <InputField
                type='text'
                placeholder='LastName'
                value = {this.state.lastName ? this.state.lastName : ''}
                onChange = { (val) => this.setValueInInput('lastName', val)}
            />
            </div>
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
          <NavLink to='\register'>
              <SubmitButton
                text={'Register'}
                disabled = {this.state.buttonDisabled}
                onClick = { () => {this.doRegister()}}
              />
          </NavLink>
          </div>
          {
            /*
            <GoogleLogin
            //clientId='609330688497-0rm9gulub6ibk4e3g94dt0aqdcu794c6.apps.googleusercontent.com' // local
            clientId = '609330688497-qrimr3155pjtsn1qg3kj6n5n3ae8r9ti.apps.googleusercontent.com' //heroku
            buttonText='Use Google to Login or Register'
            onSuccess={(response) => {this.responseGoogle(response)}}
            onFailure={(response) => {this.responseGoogle(response)}}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
            />
            */
          }
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
      register: async (registerInfo) => dispatch(createRegisterReq(registerInfo)),
      googleLogin: async (googleLoginInfo) => dispatch(createGoogleLoginReq(googleLoginInfo)),
      logout: async (logoutInfo) => dispatch(createLogoutReq(logoutInfo))  //May not be necessary
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);


