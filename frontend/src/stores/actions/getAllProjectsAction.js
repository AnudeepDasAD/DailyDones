// As action creator, this would normally return an action
//But, as middleware, it can return a function
export const getProjects = (project) => {
    return async (dispatch, getState) => {
        
        let res = await fetch('/getProjects', {
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
            var i;
            for (i in result) {
                var project = {
                    projectName: result[i].name, 
                    projectDesc: result[i].description,
                    author: result[i].author
                };
                dispatch({type: 'CREATE_PROJECT', project});
            }
            //dispatch({type: 'BAD_REQUEST', project});
            //dispatch({type: 'CREATE_PROJECT', result});
        }
        
    }
}