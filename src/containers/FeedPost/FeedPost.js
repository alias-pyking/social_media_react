import React from 'react';
import Header from '../../components/Header/header';
import './FeedPost.css';
import LikeCompnent from './LikeCompnent/LikeComponent';
import {Link} from 'react-router-dom';
const feedpost = (props) => {
    return (
        
        <article className="feedpost">
            <Header user_id = {props.user_id} authorImg = {props.authorProfileImage} username = {props.username}/>
            <div className='lowerSection'>
                <img src={props.image} className='postImg' alt={props.caption}/>
                <LikeCompnent
                    feedpost
                    url = {props.url}
                    id = {props.id}
                    token = {props.token}
                    likes = {props.likes}
                    liked = {props.liked}/>
                <div className='footer'>
                <p><b>{props.username}</b>  {props.caption}</p>
                </div>
            </div>
        </article>
    );
}

export default feedpost;