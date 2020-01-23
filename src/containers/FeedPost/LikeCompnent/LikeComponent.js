import React from 'react';
import './LikeComponent.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default class LikeComponent extends React.Component{
    state = {
        liked: this.props.liked,
        likes: this.props.likes,
    }
    handleLikeclick = (event) =>{
        event.preventDefault();
        const {url,token} = this.props;
        const likePostUrl = url+'like/';
        const header = {
            headers:{'Authorization': `token ${token}`},
        };
        axios.post(likePostUrl,null,header)
        .then((response) => {
            console.log(response.data);
            const {liked} = this.state;
            if(liked) {
                // dislike the post
                this.setState({
                    liked:!liked,
                    likes:this.state.likes - 1,
                });
            } else{
                // like the post
                this.setState({
                    liked:!liked,
                    likes:this.state.likes + 1,
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        let likeButtonClasses = ['postlikeButton'];
        const {liked, likes} = this.state;
        console.log(liked);
        if(liked) {
            likeButtonClasses.push('Liked');
        }
        let likeKeyword = 'likes';
        if(likes === 1) {
            likeKeyword = 'like';
        }

        return (
            <div>
            <div className='buttons'>
                <button className={likeButtonClasses.join(' ')} onClick = {this.handleLikeclick}>Like</button>
                {this.props.feedpost ? <Link to={'/p/'+this.props.id} className='postlikeButton'>Comment</Link>:''}
            </div>
            <div className='likesSection'>
                <p>{this.state.likes} {likeKeyword} {this.state.liked ? <b> You liked </b>:''} </p>
            </div>
            </div>
        )
    }
}