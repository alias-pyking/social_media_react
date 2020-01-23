import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
const profile = props =>{
    return (
        <div className='profile'>
            <div className='profileUpperSection'>
                <img src={props.profileImg} alt = {props.username} className='profileImg'/>
                <div className='followSection'>
                    <Link to='/profile/followers'>Followers {props.followers}</Link>
                    <Link to= '/profie/following'>Following {props.following}</Link>
                </div>
            </div>
            <b className='username'>{props.username}</b>
        </div>
    );
};

export default profile;