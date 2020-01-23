import React from 'react';
import './Post.css';
import { Link } from 'react-router-dom';

const post = props =>{
    const styles = {
        backgroundImage:`url(${props.image})`,
        backgroundRepeat:'no-repeat',
    }
    return (
        <Link to={'/p/'+props.id}>
            <div 
            className='postImage'
            style = {styles}
            >
            </div>
        </Link>
    )
};
export default post;
