import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Profile from '../MyProfile/Profile/Profile';
import Posts from '../../components/Posts/Posts';
class Account extends React.Component {
    state = {
        posts:[],
        postsLoading:true,
        profile:null,
        profileLoading:true,
        error:null,
    }
    componentDidMount(){
        const url = 'http://127.0.0.1:8000/api';
        const {id} = this.props.match.params;
        const accountUrl = `${url}/auth/accounts`;
        const profileUrl = `${accountUrl}/${id}/`;
        const postsUrl = `${accountUrl}/${id}/posts`;
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
    render(){
        const {profileLoading,postsLoading} = this.state;
        let displayProfile = <p>Loading</p>;
        let profilePosts = <p>posts Loading</p>;
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
            const {posts} = this.state;
            profilePosts = <Posts posts = {posts}/>
        }
        const {id} = this.props.match.params;
        return(
            <div className='account'>
                {displayProfile}
                {profilePosts}
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