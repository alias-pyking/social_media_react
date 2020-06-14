import React from 'react';
import './App.css';

import {Switch, Route,Redirect} from 'react-router-dom';
// Components
import  Layout from './components/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Feed from './containers/Feed/Feed';
import Fullpost from './containers/Fullpost/Fullpost';
import MyProfile from './containers/MyProfile/MyProfile';
import Account from './containers/Account/Account';
import Following from './containers/Following/Following';
import Followers from './containers/Followers/Followers';
import EditProfile from './containers/EditProfile/EditProfile';
import Logout from './containers/Auth/Logout/Logout';

import AddPost from './containers/AddPost/AddPost';
import FollowNew from './containers/FollowNew/FollowNew';
import Explore from './containers/Explore/Explore';
import Search from './containers/Search/Search';
import {connect} from 'react-redux';
import * as action from './store/actions/index';
class  App extends React.Component {
  componentDidMount(){
    this.props.tryAutoSignIn();
  }
  render(){
    let routes = (
      <Switch>
      <Route path='/auth' exact component = {Auth}/>
      <Redirect to ='/auth'/>
      </Switch>
    )
    const {isAuth} = this.props;
    if(isAuth) {
      routes = (
        <Switch>
          <Route path="/new" exact component = {AddPost}/>
          <Route path="/explore" exact component = {Explore} />
          <Route path="/auth" exact component = {Auth} />
          <Route path = "/logout" component = {Logout} />
          <Route path='/search' exact component = {FollowNew} />

          <Route path= "/profile/edit" component = {EditProfile} />
          <Route path = "/profile" exact component = {MyProfile} />
          
          

          <Route path="/p/:id" component = {Fullpost} />
          <Route path = "/" exact component={Feed} />

          <Route path="/acc" exact component = {FollowNew}/>
          <Route path='/acc/:id/followers' component = {Followers}/>
          <Route path ='/acc/:id/following' component ={Following} />
          <Route path='/acc/:id' component = {Account}/>
          

        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  }
};
const mapDispatchToprops = dispatch => {
  return {
    tryAutoSignIn:()=> dispatch(action.authCheckState())
  }
}
export default connect(mapStateToProps,mapDispatchToprops)(App);
