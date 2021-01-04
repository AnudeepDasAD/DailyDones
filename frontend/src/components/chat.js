/*
import React from 'react';
import SubmitButton from './submitButton';
import io from 'socket.io-client'
import InputField from './inputField';

//const socket = io.connect('http://localhost:3000');


//Frontend listener
socket.on('chat-msg', (data) => {
    console.log("Back at frontend");
});


class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        }
    }

    setValueInInput(st, value) {
        this.setState({
            [st]: value
        })
    }
    onEmit() {
        console.log('Sending message');
        //Name of message is chat message
        socket.emit('chat-msg', {
            message: this.state.message
        })
    }
    render() {
        return (
            <div id='chat-window'>
                <InputField
                    type='Type your message here'
                    placeholder='Message'
                    value = {this.state.message ? this.state.message : ''}
                    onChange = { (val) => this.setValueInInput('message', val)}
                 />
               {// <input id='message' type='text' placeholder="Message"/>
                }
                <SubmitButton
                    text={'Send'}
                    disabled={false}
                    onClick={() => {this.onEmit()}}
                />
            </div>
        );
    }
}

export default Chat;
*/
