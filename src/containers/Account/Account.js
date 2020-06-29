import React from 'react';
import axios from '../../axios-insta';
import {connect} from 'react-redux';
import Profile from '../MyProfile/Profile/Profile';
import Posts from '../../components/Posts/Posts';
import Spinner from '../../components/UI/Spinner/Spinner';

function getPageNumber(url){
    const idx = url.lastIndexOf('page=');
    const pageNumber = Number(url.substr(idx + 5,url.length));
    return pageNumber;
    
}  
class Account extends React.Component {
    state = {
        posts:[],
        next: null,
        prev: null,
        currentPage: 1,
        postsLoading:true,
        profile:null,
        profileLoading:true,
        error:null,
    }
    componentDidMount(){
        const {id} = this.props.match.params;
        const accountUrl = `auth/accounts`;
        const profileUrl = `${accountUrl}/${id}/`;
        const postsUrl = `${accountUrl}/${id}/posts/?page=1`;
        const {token} = this.props;
        const headers = {
            headers:{Authorization:`token ${token}`}
        }
        axios.get(profileUrl,headers)
        .then(response => {
            console.log(response.data);
            this.setState({profileLoading:false,profile:response.data});
        })
        .catch(error => {
            this.setState({profileLoading:false,error:error})
            console.log(error);
        });
        axios.get(postsUrl,headers)
        .then(response => {
            console.log(response.data);
            this.setState({postsLoading:false,posts:response.data.results});
        })
        .catch(error => {
            this.setState({postsLoading:false,error:error});
        });
    }
    loadPaginationPosts = (pageNumber) => {
        const {id} = this.props.match.params;
        const accountUrl = `auth/accounts`;
        if(!pageNumber){
            pageNumber = 1;
        }
        const postsUrl = `${accountUrl}/${id}/posts/?page=${pageNumber}`;
        const {token} = this.props;
        const headers = {
            headers:{Authorization:`token ${token}`}
        }
        axios.get(postsUrl,headers)
        .then(response => {
            const{results, previous, next} = response.data.results;
            this.setState({postsLoading:false,posts:results, prev: previous, next: next,currentPage:pageNumber});
        })
        .catch(error => {
            this.setState({postsLoading:false,error:error});
        });
    }
    render(){
        const {profileLoading,postsLoading} = this.state;
        let displayProfile = <Spinner/>;
        let profilePosts = <Spinner/>;
        let previous = null;
        let nextPosts = null;
        if(!profileLoading) {
            const {profile} = this.state;
            displayProfile = <Profile
                                username = {profile.userName}
                                user_id = {profile.user_id}
                                profileImg = {profile.image}
                                followers = {profile.followers}
                                following = {profile.following}
                                follows = {profile.follows}
                                />
        }
        if(!postsLoading) {
            const {posts, prev, next} = this.state;
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
        return(
            <div className='col s12'>
                <div className='account'>
                    {displayProfile}
                    {profilePosts}
                    <ul class="pagination">
                        {previous}
                        <li class="active blue"><a href="#!">{!postsLoading? this.state.currentPage:''}</a></li>
                        {nextPosts}
                    </ul>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
    }
}
export default connect(mapStateToProps)(Account);