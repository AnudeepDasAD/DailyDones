// As action creator, this would normally return an action

import { ResumeToken } from "mongodb";

//But, as middleware, it can return a function
export const createGoogleLoginReq = (response) => {
    return async (dispatch, getState) => {
        let res = await fetch('/googleUser', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: response.profileObj.name,
            }) 
          });
        let resultJson = await res.json();
        console.log(resultJson ? 'Result received' : 'Result not received');
        console.log(resultJson);
        console.log(resultJson.success ? 'Successful receipt' : 'Unsuccessful receipt');
        console.log(resultJson.username);
    
        if (resultJson && resultJson.success) {
            //NEED TO ALTER THE LOGIN INFO
            response.username = resultJson.username;
            dispatch({type: 'GOOGLE_LOGIN_REQUEST', response});
        } else if (resultJson && resultJson.success === false) {
            if (resultJson.msg === "Successfully added new user, login again") {
                //console.log("Please login again");
            } else {
                alert(resultJson.msg);
                //throw new Error('Unable to receive response');
                dispatch({type: 'LOGIN_ERROR', response})
            }
        }
    }
};