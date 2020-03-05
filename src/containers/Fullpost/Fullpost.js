import React from 'react';
import axios from 'axios';
import './Fullpost.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Header from '../../components/Header/header';
import Like from './Like/Like';
import Comment from './Comment/Comment';
export default  class FullPost extends React.Component{
    state = {
        postLoading:true,
        post:{},
        comments:[],
        commentLoading:true,
        token: localStorage.getItem('token'),
    }
    componentDidMount(){
        const {token} = this.state;
        const {id} = this.props.match.params;
        const url = 'http://127.0.0.1:8000/api/';
        const postUrl = url+id;
        const commentsUrl = postUrl+"/comments";
        const header = {
            headers:{'Authorization': `token ${token}`},
        };
        axios.get(postUrl, header)
        .then(response =>{
            console.log(response.data);
            this.setState({
                postLoading:false,
                post:response.data,
            });
        })
        .catch(error =>{
            console.log(error);
        })
        axios.get(commentsUrl,header)
        .then(response => {
            console.log(response.data);
            this.setState({
                comments:response.data,
                commentLoading:false
            })
        })
        .catch(error =>{
            console.log(error);
        })
    }
    
    render(){
        let displayPost = <Spinner/>;
        let displayComments = <Spinner/>
        const {token} = this.state;
        const {postLoading,commentLoading} = this.state;
        if(!postLoading) {
            const {post}  = this.state;
            displayPost = (
                <div className='post'>
                    <Header authorImg = {post.userProfileImage} username = {post.userName} />
                    <div className='lowerSection'>
                        <img src={post.image} className='postImg' alt={post.caption}/>
                        <Like
                            token = {token}
                            url = {post.url}
                            id = {post.id}
                            likes = {post.likes}
                            liked = {post.liked}/>
                        <div className='footer'>
                            <p> <b>{post.userName}</b>  {post.caption}</p>
                        </div>
                    </div>
                </div>
            );
        }
        if(!commentLoading) {
            console.log(this.state.comments)
            displayComments = this.state.comments.map(comment=>{
                return(
                    <Comment
                    profileImg={comment.urlToProfileImage}
                    username = {comment.userName}
                    comment = {comment.text}
                    />
                )
            });
        }
        return(
            <div className='fullPost'>
                {displayPost}
                <div className='commentSection'> 
                    <h3 className='commentHead'>Comments</h3>
                    {displayComments}
                </div> 
            </div>
        );
    }
}