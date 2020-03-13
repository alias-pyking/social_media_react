import React from 'react';
import NavBarItem from './NavBarItem/NavBarItem';
import { NavLink } from 'react-router-dom';
const bottomBar = (props) => {
    return (
        <nav>
            <div className="nav-wrapper blue">
            <ul className=''>
                <NavBarItem path='/' name='home'/>
                <div className='right'>
                    <NavBarItem path='/new' name='add_a_photo' />
                    <NavBarItem path='/explore' name='explore'/>
                    <NavBarItem path = '/profile' name='account_circle' />
                    <NavBarItem path='/acc' name='person_add' />
                    <NavBarItem path = '/' name='search' />
                </div>
            </ul>
            </div>
        </nav> 
       
    );
}

export default bottomBar;