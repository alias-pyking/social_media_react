import React from 'react';
import './Post.css';
import { Link } from 'react-router-dom';

const post = props =>{
    const styles = {
        backgroundImage:`url(${props.image})`,
        backgroundRepeat:'no-repeat',
    }
    return (
        <div className='col s12 m6 l4'>
        <Link to={'/p/'+props.id}>
            {/* <div 
            className='postImage'
            style = {styles}
            >
            </div> */}
            <img src = {props.image} className='responsive-img'/>
        </Link>
        </div>
    )
};
export default post;
