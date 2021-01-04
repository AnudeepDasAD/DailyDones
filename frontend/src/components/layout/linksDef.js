import React from 'react';
import { NavLink } from 'react-router-dom';

// No state so does not need to be a class

const LinksDef = () => {
    return (
        <ul className = "right">
            <li> <NavLink to='/register'>Sign Up</NavLink></li>
            <li> <NavLink to='/login'>Log In</NavLink></li>
        </ul>
    ) 
}

export default LinksDef;