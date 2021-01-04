// As action creator, this would normally return an action
//But, as middleware, it can return a function
export const getProjectAction = (project) => {
    return async (dispatch, getState) => {
        //Make async call to database
        // continue dispatching the action as normal
        // via dispatch({<action>})

        // Add the project into the projects collection for this particular user
        // console.log('Reached here getprojaction');
        let res = await fetch('/project/:id', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            /*
            body: JSON.stringify({
                name: project.projectName,
                description: project.projectDesc,
                author: project.author
            })
            */
        });

        let result = await res.json();
        console.log(result);
        if (result) {
            dispatch({type: 'GET_PROJECT', project});
        }
        /*
        console.log(result);
        console.log(result.success);
        if (result && result.success) {
            console.log(project);
            dispatch({type: 'CREATE_PROJECT', project});
        } else if (result && result.success === false) {
            alert(result.msg);
            dispatch({type: 'BAD_REQUEST', project});
            //throw new Error('Unable to login. Please check username or password to try again')
        }
        */
        
        //action.type and action.project(payload)
        //dispatch({type: 'CREATE_PROJECT', project});
    }
}