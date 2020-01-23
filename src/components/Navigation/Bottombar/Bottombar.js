import React from 'react';
import './Bottombar.css';
import BottomBarItem from './BottomBarItem/BottomBarItem';
const bottomBar = (props) => {
    return (
        <div className='bottomBar'>
            <ul className = 'bottomBarItems'>
                <BottomBarItem path = "/" name="Home"/>
                <BottomBarItem path ="/explore" name="Explore"/>
                <BottomBarItem path = "/profile" name="Profile"/>
            </ul>
        </div>
    );
}

export default bottomBar;