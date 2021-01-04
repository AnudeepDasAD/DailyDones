// As action creator, this would normally return an action
//But, as middleware, it can return a function
export const deleteProject = (project) => {
    return async (dispatch, getState) => {
        let res = await fetch('/delete/'+ project.title, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: project.title,
                //description: project.projectDesc,
                //author: project.author
            })
        });
    
        let result = await res.json();
        console.log('Delete project was sent');
        console.log(result);
        console.log(result.success);
        if (result && result.success) {
            console.log(project);
            dispatch({type: 'DELETE_PROJECT', project});
        } else if (result && result.success === false) {
            alert(result.msg);
             dispatch({type: 'BAD_REQUEST', project});        }
    }
}