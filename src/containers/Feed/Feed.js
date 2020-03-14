import React,{ Component} from 'react';
import './Feed.css';
import FeedPost from '../FeedPost/FeedPost';
import * as actionCreators from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-insta';
import { Link } from 'react-router-dom';

class Feed extends Component{
    componentDidMount(){
        const {isAuth}  = this.props;
        if(!isAuth) {
            this.props.history.push('/auth');
        }
        const {loadPosts,token} = this.props;
        loadPosts(token);

    }
    loadPaginationPosts = () => {

    }
    render(){
        let displayPosts = <Spinner/>;
        const {loading} = this.props;
        if(!loading) {
            const {posts} = this.props;
            if(posts.length === 0) {
                displayPosts = <h4>No Posts Found in Your feed. Follow more users <Link to='/acc'>here</Link></h4>
            } else  {
                displayPosts = posts.map((post) => {
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
            }
        }
        return (
            <div className='row'>
                <div className='col s12 m7'>
                    {displayPosts}
                </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Feed,axios));
