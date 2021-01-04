// As action creator, this would normally return an action
//But, as middleware, it can return a function
export const createProject = (project) => {
    return async (dispatch, getState) => {
        //Make async call to database
        // continue dispatching the action as normal
        // via dispatch({<action>})

        // Add the project into the projects collection for this particular user
        var fetchHook = '/newProject';
        var type = 'CREATE_PROJECT';
        var body = JSON.stringify({
            name: project.projectName,
            description: project.projectDesc,
            author: project.author,
        });
        //console.log(project.editProj);
        if (project.editProj) {
            console.log('Reached the editProj')
            fetchHook += '/edit/'+project.title;
            body = JSON.stringify({
                name: project.projectName,
                description: project.projectDesc,
                author: project.author,
                newName: project.newProjectName,
                newDescription: project.newProjectDesc
            });
            let res = await fetch({fetchHook}, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            });
    
            let result = await res.json();
            console.log('Edit project was sent');
            console.log(result);
            console.log(result.success);
            if (result && result.success) {
                console.log(project);
                //alert('Creating project');
                dispatch({type: 'EDIT_PROJECT', project});
            } else if (result && result.success === false) {
                alert(result.msg);
                dispatch({type: 'BAD_REQUEST', project});
                //throw new Error('Unable to login. Please check username or password to try again')
            }
        } else {
            let res = await fetch('/newProject', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            });

            let result = await res.json();
            console.log('New project was sent');
            console.log(result);
            console.log(result.success);
            if (result && result.success) {
                //console.log(project);
                //alert('Creating project');
                dispatch({type: 'CREATE_PROJECT', project});
            } else if (result && result.success === false) {
                alert(result.msg);
                dispatch({type: 'BAD_REQUEST', project});
                //throw new Error('Unable to login. Please check username or password to try again')
            }
        }
        //action.type and action.project(payload)
        //dispatch({type: 'CREATE_PROJECT', project});
    }
}