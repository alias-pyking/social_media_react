import React,{ Component} from 'react';
import './Feed.css';
import FeedPost from '../FeedPost/FeedPost';
import * as actionCreators from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Link } from 'react-router-dom';
 
class Feed extends Component{
    componentDidMount(){
        const {isAuth}  = this.props;
        if(!isAuth) {
            this.props.history.push('/auth');
        }
        const {loadPosts,token} = this.props;
        console.log(loadPosts);
        loadPosts(token);

    }

    render(){
        let posts = <Spinner/>;
        const {loading} = this.props;
        if(!loading) {
            console.log(this.props.posts,'[Feed.js 24]');
            posts = this.props.posts.map((post) => {
                return <FeedPost
                key = {post.id}
                id = {post.id}
                url ={post.url}
                user_id= {post.user_id}
                token = {this.props.token}
                authorProfileImage= {post.userProfileImage}
                authorProfileUrl = {post.userProfileUrl}
                username = {post.userName}
                image = {post.image}
                caption = {post.caption}
                likes = {post.likes}
                liked = {post.liked}
                commentsUrl = {post.comments}
                />
            });
            console.log(this.props);
            console.log(this.props.posts);
        }
        return (
            <div className='feed'>
                <Link to='/new'>Add new </Link>
                {posts}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        posts:state.feed.posts,
        isAuth: state.auth.token !== null,
        token: state.auth.token,
        loading:state.feed.loading,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        loadPosts:(token) => dispatch(actionCreators.loadFeed(token)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Feed);
