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

import * as action from './store/actions/index';
import {connect} from 'react-redux';
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

          <Route path = "/profile" exact component = {MyProfile} />
          <Route path="/auth" exact component = {Auth} />

          <Route path="/p/:id" component = {Fullpost} />
          <Route path = "/" exact component={Feed} />

          
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
