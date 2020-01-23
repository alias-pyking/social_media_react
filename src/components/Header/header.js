import React from 'react';
import './header.css';
import SmallProfile from '../SmallProfile/SmallProfile'
const header = props => {
    console.log(props.user_id,'[Header.js 5]')
    return (
        <div className='header'>
            <SmallProfile user_id = {props.user_id} profileImg = {props.authorImg} authorName = {props.username}/>
        </div>
    );
}


export default header;