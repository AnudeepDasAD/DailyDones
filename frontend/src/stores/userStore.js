import { extendObservable } from 'mobx';

class UserStore {
    constructor() {
        //Contains properties for what is being stored
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            username: ""
        });
    }
}

//Returns a UserStore object
export default new UserStore();