// As action creator, this would normally return an action
//But, as middleware, it can return a function
export const createLogoutReq = (logoutInfo) => {
    console.log(logoutInfo);
    return async (dispatch, getState) => {
        //Make async call to database
        // Async call to the server to login
        let res = await fetch('/logout', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: logoutInfo.username,
            })
        });

        let result = await res.json();
        if (result && result.success) {
            dispatch({type: 'LOGOUT_REQUEST', logoutInfo});
        } else if (result && result.success === false) {
            alert(result.msg);
            //throw error;
        }
    }
}