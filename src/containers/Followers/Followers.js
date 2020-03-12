import React from 'react';
import './Followers.css';
import axios from 'axios';
import {connect} from 'react-redux';
import User from '../User/User';
class Followers  extends React.Component {
    state ={
        users:[],
        loading:true,
        error:null,
    }
    componentDidMount(){
        const {id} = this.props.match.params;
        const profileUrl = 'http://127.0.0.1:8000/api/auth/accounts/'+id;
        const followersUrl = `${profileUrl}/followers`;
        const {token} = this.props;
        const headers = {
            headers:{Authorization:`token ${token}`}
        };
        axios.get(followersUrl,headers)
        .then(response =>{
            console.log(response.data);
            this.setState({loading : false, users : response.data });
        })
        .catch(error => {
            this.setState({error : error,loading : false });
            console.log(error);
        });
    }
    render(){
        let users = <p>loading..</p>;
        const {loading} = this.state
        console.log(this.state.users);
        if(!loading){
            users = this.state.users.map(user => {
                return <User
                        key = {user.user_id}
                        follows = {user.follows}
                        user_id = {user.user_id}
                        profileImg = {user.userProfileImage}
                        username = {user.userName}
                        />;
            })
        }
        return (
            <div className='row'>
                <div className='col s12 m8'>
                {users}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        token : state.auth.token,
    }
}
export default connect(mapStateToProps)(Followers);