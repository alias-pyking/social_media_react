import React from 'react';
import './App.css';
import  Layout from './components/Layout/Layout';
import {Switch, Route,Redirect, Router} from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Feed from './containers/Feed/Feed';
import Fullpost from './containers/Fullpost/Fullpost';
import MyProfile from './containers/MyProfile/MyProfile';
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
          <Route path='/acc/:id' component = {MyProfile}/>
          <Route path="/p/:id" component = {Fullpost} />
          <Route path = "/" exact component={Feed} />

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
