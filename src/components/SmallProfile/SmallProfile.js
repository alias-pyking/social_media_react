import React from 'react';
import './SmallProfile.css';
import { Link } from 'react-router-dom';
const profile= props =>{
    console.log(props.user_id,'[SmallProfile.js 5]');
    return (
        <div className='smallProfile'>
            
            <Link to = {'/acc/'+props.user_id}>
                <img src = {props.profileImg} alt={props.authorName} className="smallProfileImg"/>
                <span className='smallProfileName'>{props.authorName}</span>
            </Link>
        </div>
    );
}
export default profile;