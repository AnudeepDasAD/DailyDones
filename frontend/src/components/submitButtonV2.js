import React from 'react';

//This will be replace with all the parts of the login screen

class SubmitButtonV2 extends React.Component {

  //Whenever a button is defined, disabled, onClick, and text would need to be provided
  render() {
    return (
      <div className="submitButton">
          <button
          className = "btn blue lighten-1 z-depth-0"
          disabled = {this.props.disabled}
          onClick = {(props) => this.props.onClick(props)}>
            {this.props.text}
          </button>
      </div>
    );
  }
}


export default SubmitButtonV2;