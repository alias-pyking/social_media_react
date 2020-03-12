import React from 'react';
import './EditProfile.css';
import {connect } from 'react-redux';
import axios,{put} from 'axios';
class EditProfile extends React.Component{
    state = {
        username:"",
        usernameError:false,
        email:"",
        image:null,
        loading:true,
        saving:false,
    }
    componentDidMount(){
        const {token} = this.props;
        const config = {
            headers:{Authorization:`token ${token}`}
        }
        const profileUrl = 'http://127.0.0.1:8000/api/profile';
        axios.get(profileUrl,config)
        .then(response => {
            const profile = response.data;
            this.setState({
                username:profile.username,
                email:profile.email,
                loading:false
            });
        })
        .catch(error => {
            console.log(error);
        })
    }
    handleOnSubmit = event => {
        event.preventDefault();
        const {username, email,image} = this.state;
        const url = 'http://127.0.0.1:8000/api/check_username/'+username;
        let success = false;
        this.setState({saving:true});
        axios.get(url)
        .then(response =>{
            console.log(response.data);
            success = response.data.success;
            if(success){
                this.setState({usernameError:false});
                this.update(username,email,image)
                .then(response => {
                    console.log(response.data);
                    this.setState({saving:false});
                })
                .catch(error => {
                    console.log(error);
                });
            } else{
                this.setState({usernameError:true,saving:false})
            }

        })
        .catch(error => {
            console.log(error);
        });
        

    }
    update(username,email, image){
        const{token, userId} = this.props;
        const profileEditUrl = `http://127.0.0.1:8000/api/auth/accounts/${userId}/edit/`;
        const formData = new FormData();
        formData.append('username',username);
        formData.append('email',email);
        if(image) {
            formData.append('image',image);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization:`token ${token}`
            }
        }
        return put(profileEditUrl, formData,config);
      }
    handleOnInputChange = (event, type) => {
        event.preventDefault();
        switch(type){
            case 'file':    
                this.setState({image:event.target.files[0]})
                break;
            case 'username':
                this.setState({username:event.target.value});
                break;
            case 'email':
                this.setState({email:event.target.value})
                break;
        }
        
    }
    render(){
        let form = <p>Loading...</p>;
        const {loading} = this.state;
        if(!loading) {
            const {username,image,email} = this.state;
            form = <form onSubmit = {this.handleOnSubmit}>

                        <label>Change Profile Pic</label><br/>
                        <input type='file' onChange = {(event) => this.handleOnInputChange(event,'file')} /> <br/>
                        <label>Username</label> <br/>
                        <input value={username} type='text' onChange = {(event) => this.handleOnInputChange(event,'username')} /> 
                        {this.state.usernameError?
                         <p>This username already exists</p>
                          : '' 
                        }
                        <br/>
                        <label>Email</label><br/>
                        <input type='email' value={email} onChange = {(event) => this.handleOnInputChange(event,'email')} /><br/>
                        <button className='btn waves-effect waves-light' type='submit'>
                        {this.state.saving ?  'Saving...'
                        :'Save'
                        }
                        </button>
                    </form>
        }
        return(
            <div>
                <h2>Edit Profile</h2>
                {form}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        token:state.auth.token,
        userId:state.auth.userId
    }
}
export default connect(mapStateToProps)(EditProfile);