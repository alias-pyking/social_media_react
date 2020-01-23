import React from 'react';
import './User.css';
import SmallProfile from '../../components/SmallProfile/SmallProfile';
import {connect} from 'react-redux';
import axios from 'axios';
class User extends React.Component {
    state = {
        follows : this.props.follows,
    }
    handleFollowClick = () => {
        const {follows} = this.state;
        const {user_id, token} = this.props;
        const url = 'http://127.0.0.1:8000/api';
        const accountUrl = `${url}/auth/accounts/${user_id}`;
        let followUrl;
        if(follows) {
            // user already follows the current profile user 
            // Make url for unfollowing the profile 
            followUrl = `${accountUrl}/unfollow/`;
        } else {
            followUrl = `${accountUrl}/follow/`;
        }
        const headers ={
            headers:{Authorization:`token ${token}`}
        }
        axios.post(followUrl,null,headers)
        .then(response => {
            this.setState({follows:!follows});
        })
        .catch(error => {
            console.log(error);
        });
    }
    render() {
        const {follows} = this.state;
        console.log(follows);
        return (
            <div className='user'>
                <SmallProfile 
                profileImg= {this.props.profileImg}
                user_id = {this.props.user_id} 
                authorName = {this.props.username}
                />
            <button
            className='followsButton'
            onClick = {this.handleFollowClick}
            >
            {follows ? 'Unfollow': 'Follow'}
            </button>
            </div>
        );
    }
};
const mapStateToProps = state => {
    return {
        token:state.auth.token,
    }
}
export default connect(mapStateToProps)(User);