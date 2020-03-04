import React,{ Component} from 'react';
import './Feed.css';
import axios from 'axios';
import FeedPost from '../FeedPost/FeedPost';
import {connect} from 'react-redux';

class Feed extends Component{
    state = {
        posts:[],
        loaded:false,
    }
    componentDidMount(){
        // axios.get('http://127.0.0.1:8000/api/')
        // .then((response) => {
        //     console.log(response);
        //     this.setState({posts:response.data.results, loaded:true});
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
        // this.props.onLoadingPosts();
    }

    render(){
        // const posts = this.state.posts.map(post =>{
        //     return <FeedPost
        //             key = {post.url}
        //             url ={post.url}
        //             authorProfileImage= {post.userProfileImage}
        //             authorProfileUrl = {post.userProfileUrl}
        //             username = {post.userName}
        //             image = {post.image}
        //             caption = {post.caption}
        //             likes = {post.likes}
        //             liked = {post.liked}
        //             commentsUrl = {post.comments}
        //             />
        // })
        return (
            <div onClick = {this.props.onLoadingPosts}>
            {this.props.isAuth ? <p>authenticated</p>: <p> Not authenticated</p>}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        posts:state.posts,
        isAuth: state.auth.token !== null
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onLoadingPosts : () => dispatch({type:'LOADPOSTS'})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Feed);
