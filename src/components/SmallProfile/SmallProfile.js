import React from 'react';
import './SmallProfile.css';
const profile=props=>{
    return (
        <div className='smallProfile'>
            <img src = {props.profileImg} alt={props.authorName} className="smallProfileImg"/>
            <span className='smallProfileName'>{props.authorName}</span>
        </div>
    );
}
export default profile;