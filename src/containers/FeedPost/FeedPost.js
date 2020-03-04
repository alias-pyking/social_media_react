import React from 'react';
import Header from '../../components/Header/header';
import './FeedPost.css';
import PostButtons from './PostButtons/PostButtons';
const feedpost = (props) => {
    return (
        <article className="post">
            <Header authorImg = {props.authorProfileImage} username = {props.username}/>
            <div className='lowerSection'>
                <img src={props.image} className='postImg'/>
                <PostButtons url = {props.url} comments = {props.commentsUrl}/>
                <div className='footer'>
                <p> likes {props.likes} You liked {props.liked}</p>
                <p><b>{props.username}</b>  {props.caption}</p>
                </div>
            </div>
        </article>
    );
}

export default feedpost;