import React from 'react';
import { Link } from 'react-router-dom';
import  LinksIn  from './linksIn';
import LinksDef from './linksDef';
import { connect } from 'react-redux';
import { compose } from 'redux';

// No state so does not need to be a class

const Navbar = (props) => {
    const { user } = props;
    console.log(user);
    console.log(user.slice(-1)[0]);
    console.log(user.slice(-1)[0].isLoggedIn);
    const links = user.slice(-1)[0].isLoggedIn === true ? <LinksIn/> : <LinksDef/>
    return (
        <nav className = "nav-wrapper">
            <div className="container">
                <Link to='/' className="brand-logo"> DailyDones </Link>
                { links }
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    //console.log(state);
    return {
        user: state.auth.users
    }
}

export default connect(mapStateToProps)(Navbar);