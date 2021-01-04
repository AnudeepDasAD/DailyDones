import React from 'react';

//This will be replace with all the parts of the login screen

class InputField extends React.Component {

  //e.target.value is the value of the input
  render() {
    return (
      //Whatever function we passed in is going to be called for onChange
      //  and the name of the prop will also be onChange and it will map to a
      //  a function
      <div className="inputField">
        <input
          className ='input'
          type = {this.props.type}
          placeholder = {this.props.placeholder}
          value = {this.props.value}
          onChange = { (e) => this.props.onChange(e.target.value)}>

        </input>
      </div>
    );
  }
}


export default InputField;