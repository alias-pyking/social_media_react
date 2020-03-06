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
        addCommentText:'',
        postingComment:false,
        error:null,
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
    onTextAreaChange = event =>{
        const newCommentText = event.target.value;
        if(newCommentText.length > 0){
            this.setState({addCommentText:newCommentText,error:null});
        } else{
            this.setState({addCommentText:'',})
        }
    }
    submitCommentForm = event =>{
        event.preventDefault();
        const comment = this.state.addCommentText;
        if(comment.length === 0){
            this.setState({error:"Please add some text..."});
        } else {
            this.setState({postingComment:true});
            const {id} = this.props.match.params;
            const {token} = this.state;
            const commentText = this.state.addCommentText;
            const url = 'http://127.0.0.1:8000/api/';
            const addCommentUrl = url + id +'/comments/add_comment/';
            console.log(addCommentUrl);
            const data = {
                text:commentText
            }
            const headers = {
                headers:{'Authorization': `token ${token}`},
            }
            axios.post(addCommentUrl,data,headers)
            .then( response =>{
                console.log(response.data);
                const newComment = response.data;
                const oldComments = this.state.comments;
                const newComments = [...oldComments,newComment];
                this.setState({
                    comments:newComments,
                    addCommentText:'',
                    postingComment:false,
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    postingComment:false,
                })
            })
        }
    }
    render(){
        let displayPost = <Spinner/>;
        let displayComments = <Spinner/>
        const {token} = this.state;
        const {postLoading,commentLoading, error} = this.state;
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
            displayComments = this.state.comments.map((comment,index)=>{
                return(
                    <Comment
                    key={index}
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
                    <div className='commentsList'>
                        {displayComments}   
                    </div>
                    <div className='addComment'>
                        <form>
                            <textarea 
                            onChange={this.onTextAreaChange}
                            className='addCommentTextArea'
                            placeholder='Add a comment'
                            value={this.state.addCommentText}
                            />
                            {this.state.postingComment?<p>posting...</p>:''}
                            {error ? <p className='errorText'>{error}</p>:''}

                            <button
                            onClick={this.submitCommentForm}
                            className='addCommentbutton' 
                            type='submit'
                            >Post</button>
                        </form>
                    </div>
                    
                </div> 
            </div>
        );
    }
}