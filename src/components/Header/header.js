import React from 'react';
import './header.css';

const header = props => {
    return (
        <div className='header'>
            <img src = {props.authorImg} className='authorImg'/>
            <span className='authorName'>{props.username}</span>
        </div>
    );
}


export default header;