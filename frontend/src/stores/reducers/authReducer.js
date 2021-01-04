const initState = {
    users: [
        {username: 'Sample', isLoggedIn: false}
    ]
}

const authReducer = (state = initState, action) => {
    //console.log(state);
    switch(action.type) {
        /*
        default:
            return {
                ...state,
                users: [...state.users, {username: action.username, isLoggedIn: 'true'}]
            }
        */
        //Login and register requests both add the new user to the user list
        case 'REGISTER_REQUEST':
        case 'LOGIN_REQUEST':
            return {
                ...state,
                users: [...state.users, {username: action.loginInfo.username, isLoggedIn: true}]
            }
            /*
            case 'REGISTER_REQUEST':
                return {
                    ...state,
                    users: [...state.users, {username: action.loginInfo.username, isLoggedIn: 'false'}]
                }
            */
        case 'GOOGLE_LOGIN_REQUEST':
            return {
                ...state,
                users: [...state.users, {username: action.response.username, isLoggedIn: true}]
            }
        case 'LOGOUT_REQUEST':
            console.log(action.logoutInfo.username);
            return {
                ...state,
                users: state.users.filter((user) => user.username !== action.logoutInfo.username)
            }
        case 'LOGIN_ERROR':
        case 'REGISTER_ERROR':
            //throw new Error('Login error occured', action.err);
            return state;
        default:
            return state;
    }
}

export default authReducer;