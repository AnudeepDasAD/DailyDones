// As action creator, this would normally return an action

//But, as middleware, it can return a function
export const createRegisterReq = (registerInfo) => {
    return async (dispatch, getState) => {
        //Make async call to database
        
        let res = await fetch('/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: registerInfo.username,
                password: registerInfo.password,
                name: registerInfo.firstName
            })
        });

        let result = await res.json();
        console.log('Result was received');
        console.log(result);
        console.log(result.success);
        if (result && result.success) {
            console.log(registerInfo);
            alert('Registering user');
            dispatch({type: 'REGISTER_REQUEST', registerInfo});
        } else if (result && result.success === false) {
            alert(result.msg);
            dispatch({type: 'REGISTER_ERROR', registerInfo});
            //throw new Error('Unable to login. Please check username or password to try again')
        }
    }
}