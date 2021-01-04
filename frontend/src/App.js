import React from 'react';
//import logo from './logo.svg';
import { observer } from 'mobx-react';
import Login from './components/login/login.js';
import Register from './components/login/register';
//import SubmitButton from './components/submitButton.js';
import './App.css';
import UserStore from './stores/userStore';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//import Chat from './components/chat';
import  Navbar  from './components/layout/nav';
import Dashboard from './components/dashboard/dashboard';
import Description from './components/tasks/description';
import NewProject from './components/tasks/newProject';
import { connect } from 'react-redux';

class App extends React.Component {
  
  render() {
    return (
      <BrowserRouter>
        <div className = "App">
          <Navbar/>
          <Switch>
            <Route exact path = '/' component={Dashboard}/>
            <Route path = '/delete/:name' component={Dashboard}/>
            <Route path = '/project/:id' component={Description}/>
            <Route path = '/login' component={Login}/>
            <Route path = '/register' component={Register}/>
            <Route exact path = '/newProject' component={NewProject}/>
            <Route exact path = '/newProject/edit/:title' component={NewProject}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

//'observer' forces App to listen for changes in the userStore
export default App;



/*async in order to use wait keyword
  async componentDidMount() {
    /*
    try {

      //fetches an api point called isLoggedIn
      //  Specifically fetches the json
      
      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();

      if (result && result.success) {
        console.log("Showing welcome");
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        //console.log("Will show loading");
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch(err) {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
    }
  }
    */
    
  
/*
    if (UserStore.loading) {
      return (
        <div className="app">
          <div className="container"> 
            Loading, please wait....
          </div>
        </div>
      )

    } else {
      //Going to move form to a new component
      //  Chat will now be postponed- <Chat/>
      //  Add a navigation bar
      if (UserStore.isLoggedIn) {
        console.log('logged in');
        return (
          <div className="app">
            <Router>
            <div className="container">
              <Nav/>
              {//Dashboard component
              }
              <p> Welcome { UserStore.username } </p>
              <Switch>
                {
                  //Make a Form component 
                }
                <Route path='/addTask' component={() => this.addTask}/>
              </Switch>
              <SubmitButton
                text={'Log out'}
                disabled = {false}
                onClick = { () => {this.doLogout()}}
              />
              {
              }
              </div>
              </Router>
          </div>
        ) 
        
      }
      return (
        <div className = "app">
          <div className = "container">
            <Login/>
          </div>
        </div>
      )
    }
    */
//Some of the following code was used to test with node

/*
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {apiResponse: "hello"};
  }

  callAPI() {
    fetch('http://localhost:9000/api')
    .then(res => res.text())
    .then(res => this.setState({apiResponse: res})); //Expecting only text to be received from the api
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
        <p>{this.state.apiResponse}</p>
      </div>
    );
  }
}*/
