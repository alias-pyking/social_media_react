import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadProfilePosts,loadProfile} from '../../store/actions/index';
import Profile from './Profile/Profile';
import Posts from '../../components/Posts/Posts';
import './MyProfile.css';
import Spinner from '../../components/UI/Spinner/Spinner';
function getPageNumber(url){
    const idx = url.lastIndexOf('page=');
    const pageNumber = Number(url.substr(idx + 5,url.length));
    return pageNumber;
    
}   
class MyProfile extends Component{
    componentDidMount(){ 
        const {userId, token, onLoadProfile, onLoadProfilePosts}  = this.props;
        onLoadProfile(token);
        onLoadProfilePosts(userId, token, 1);
    }
    loadPaginationPosts = (pageNumber) => {
        const{onLoadProfilePosts, token,userId} = this.props;
        if(!pageNumber){
            pageNumber = 1;
        }
        onLoadProfilePosts(userId, token, pageNumber);
    }
    render () {
        const {profileLoading,profilePostsLoading} = this.props;
        let displayProfile = <Spinner/>;
        let profilePosts = <Spinner/>;
        let previous = null;
        let nextPosts = null;
        if(!profileLoading) {
            const {profile} = this.props;
            displayProfile = <Profile
                        username = {profile.username}
                        user_id = {profile.user_id}
                        profileImg = {profile.profileImage}
                        followers = {profile.followers}
                        following = {profile.following}
                        />
        }
        if(!profilePostsLoading) {
            const {posts, prev, next} = this.props;
            profilePosts = <Posts posts = {posts}/>
            console.log('here');
            profilePosts = <Posts posts = {posts}/>
            if(!prev){
                previous = <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>;
            } else {
                const previousPageNumber = getPageNumber(prev);
                console.log(previousPageNumber);
                previous = <li><div onClick = {() => this.loadPaginationPosts(previousPageNumber)}>
                            <i class="material-icons">chevron_left</i></div></li>;
            }
            if(!next){
                nextPosts = <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>;
            } else {
                const nextPageNumber = getPageNumber(next);
                nextPosts = <li class="waves-effect"><div onClick = {() => this.loadPaginationPosts(nextPageNumber)}>
                            <i class="material-icons">chevron_right</i></div></li>;
            }
        }
        return (
            <div className='col s12'>
            <div className='account'>
                    {displayProfile}
                    {profilePosts}
                    <ul class="pagination">
                        {previous}
                        <li class="active blue"><a href="#!">{!profilePostsLoading? this.props.currentPage:''}</a></li>
                        {nextPosts}
                    </ul>
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return {
        userId:state.auth.userId,
        token:state.auth.token,
        profile:state.account.profile,
        profileLoading:state.account.profileLoading,
        profliePostsLoading:state.account.profilePostsLoading,
        posts:state.account.posts,
        prev: state.account.prev,
        next: state.account.next,
        currentPage: state.account.page,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        onLoadProfile:(token) => dispatch(loadProfile(token)),
        onLoadProfilePosts:(userId,token, page) => dispatch(loadProfilePosts(userId,token, page)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MyProfile);