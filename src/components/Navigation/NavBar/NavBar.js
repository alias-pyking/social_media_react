import React from 'react';
import NavBarItem from './NavBarItem/NavBarItem';
const NavBar = (props) => {
    return (
        <div className='navbar-fixed'>
        <nav>
            <div className='nav-wrapper blue'>
            <div className="nav-wrapper blue container">
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
            </div>
        </nav> 
        </div>
       
    );
};

export default NavBar;