import React from 'react';
import {NavLink} from 'react-router-dom';
import './BottomBarItem.css';
const bottomBarItem = props => {
    return (
        <li className='bottomBarItem'>
            <NavLink
            activeClassName = 'active'
            to={props.path} className='bottomBarLink'>
                {props.name}
            </NavLink>
        </li>
    );
};

export default bottomBarItem;