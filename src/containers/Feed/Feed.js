import React,{ Component} from 'react';
import './Feed.css';
import axios from 'axios';
import FeedPost from '../FeedPost/FeedPost';
class Feed extends Component{
    state = {
        posts:[],
        loaded:false,
    }
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/')
        .then((response) => {
            console.log(response);
            this.setState({posts:response.data.results, loaded:true});
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render(){
        const posts = this.state.posts.map(post =>{
            return <FeedPost
                    key = {post.url}
                    url ={post.url}
                    authorProfileImage= {post.userProfileImage}
                    authorProfileUrl = {post.userProfileUrl}
                    username = {post.userName}
                    image = {post.image}
                    caption = {post.caption}
                    likes = {post.likes}
                    liked = {post.liked}
                    commentsUrl = {post.comments}
                    />
        })
        return (
            <div>
            {this.state.loaded ? posts:<p>Loading ...</p>}
            </div>
        );
    }

}

export default Feed;
