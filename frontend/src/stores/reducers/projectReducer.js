const initState = {
    projects: [
        {id: '1', title: 'Project 1: The First Mission', content: 'blah blah blah', author: 'Anudeep Das'},
        {id: '2', title: 'Project 2: Journey into Eisselcross', content: 'blahblahblah', author: 'Matthew Mercer'},
        {id: '3', title: 'Project 3: TravelerCon 3000', content: 'blahblahblah', author: 'Jester Lavorre'}
    ]
}

// redux store <-> reducer ( a function that interacts with the store)
// Reducer does not know the initial state, thus must specify
//Reducer is like a robot that fetches from the store, store must know which reducer it is dealing with
const projectReducer = (state = initState, action) => {
    var latest_id = parseInt(state.projects.slice(-1)[0].id, 10)
    console.log('Latest id is ', latest_id)
    switch(action.type) {
        case 'CREATE_PROJECT':
            var i;
            //Ensures that project duplicates aren't added during the getProjects from dashboard
            for (i in state.projects) {
                if (state.projects[i].title === action.project.projectName) {
                    return state;
                }
            }
            console.log('creating project');
            return {
                ...state,
                //Deal with id later
                projects: [...state.projects, {id: latest_id + 1, title: action.project.projectName, content: action.project.projectDesc, author:action.project.author}]
            }
        case 'EDIT_PROJECT':
            console.log('editing project');
            var i;
            for (i in state.projects) {
                if (state.projects[i].title === action.project.projectName) {
                    state.projects[i].title = action.project.newProjectName;
                    state.projects[i].content = action.project.newProjectDesc;
                }
            }
            return state;
        case 'DELETE_PROJECT':
            console.log('Deleting project in reducer');
            var i;
            var id;
            for (i in state.projects) {
                if (state.projects[i].title === action.project.projectName) {
                    id = state.projects[i].id;
                }
            }
            return {
                ...state,
                projects: state.projects.filter((project) => project.title !== action.project.title)
            }
        case 'BAD_REQUEST':
            return state;
    }
    return state; 
}

export default projectReducer;

//Note: we cannot get data from a database here (state returns, too slow)
//  And we should not access database on the frontend

// Basic pipeline: redux store -> component via mapStatetoProps
//                 component <-> Reducer (in order to add to or remove from store- component does not do this, must use reducer)
//                      This requires an action to be dispatched (with optional payload)
//                      Can grab data from database as async middleware between dispatch_action -> reducer
//  dispatch_action -> action_creator (pause, returns a function which gets data)
//                  -> after getting, continue with the action


// dispatch_action describes the changes that we want to make

/*
    const initState = {
        todos: [],
        done: []
    }
    function reducer(state=initState, action) {
        if (action === 'TODO') {
            //  This actually returns a new state
            return {
                ...state  // This is code that copies over the old state
                
                // Overriding the todos of the old state
                //  '...' gets the individual elements out of the state.todos
                todos: [...state.todos, action.todo]
                
            }
        } else if (action === 'DELETE_POST) {
            let newPosts = state.posts.filter(post => {
                return action.id !== post.id
            }); 
            return {
                ...state,
                posts: newPosts
            }
        }
    }

    //Subscribing to changes in the state
    store.subscribe(() => {
        blahblah
        console.log(store.getState())
    })

    // Actions
    // An action is a Javascript object
    const todoAction = { type: 'TODO', todo:'Do this'}
    store.dispatch(todoAction)
    */