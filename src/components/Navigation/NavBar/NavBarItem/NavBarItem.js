import React from 'react';
import {NavLink} from 'react-router-dom';
const navBarItem = props => {
    return (
        <li>
            <NavLink
            to={props.path}>
                <i className='material-icons'>{props.name}</i>
            </NavLink>
        </li>
    );
};

export default navBarItem;