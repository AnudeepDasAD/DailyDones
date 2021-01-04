// As action creator, this would normally return an action
//But, as middleware, it can return a function
export const createLoginReq = (loginInfo) => {
    return async (dispatch, getState) => {
        //Make async call to database
        // Async call to the server to login
        let res = await fetch('/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: loginInfo.username,
                password: loginInfo.password
            })
        });
        //console.log(res);
        let result = await res.json();
        console.log('Result was received');
        console.log(result);
        console.log(result.success);
        if (result && result.success) {
            console.log(loginInfo);
            dispatch({type: 'LOGIN_REQUEST', loginInfo});
        } else if (result && result.success === false) {
            alert(result.msg);
            dispatch({type: 'LOGIN_ERROR', loginInfo});
            //throw new Error('Unable to login. Please check username or password to try again')
        }
        /*
            .catch((res) => console.log(res);
            result = res.json();
            console.log('Result was received');
            console.log(result);
            console.log(result.success);
            if (result && result.success) {
                console.log(loginInfo);
                dispatch({type: 'LOGIN_REQUEST', loginInfo});
            } else if (result && result.success === false) {
                alert(result.msg);
                dispatch({type: 'LOGIN_ERROR', loginInfo});
                //throw new Error('Unable to login. Please check username or password to try again')
            }
        }).catch((err)=>{
            console.log('Error case');
            dispatch({type: 'LOGIN_ERROR', err});
        })*/

        /*
        console.log('Waiting');
        let result = await res.json();
        console.log('Waiting still');
        */
        
    }
};