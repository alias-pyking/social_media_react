import React from 'react';
import Header from '../../components/Header/header';
import './FeedPost.css';
import LikeCompnent from './LikeCompnent/LikeComponent';
const feedpost = (props) => {
    return (
        
        <div className="card hoverable">
            <Header user_id = {props.user_id} authorImg = {props.authorProfileImage} username = {props.username}/>
            <div className='lowerSection'>
                <div className='card-image'>
                    <img src={props.image} className='responsive-img' alt={props.caption}/>
                </div>
                <div className='card-content'>
                <p><b>{props.username}</b>  {props.caption}</p>
                </div>
                <div className='card-action'>
                <LikeCompnent
                    feedpost
                    url = {props.url}
                    id = {props.id}
                    token = {props.token}
                    likes = {props.likes}
                    liked = {props.liked}/>
                </div>
            </div>
        </div>
    );
}

export default feedpost;