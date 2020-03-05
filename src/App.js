import React from 'react';
import './App.css';
import  Layout from './containers/Layout/Layout';
import {Switch, Route,Redirect, Router} from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Feed from './containers/Feed/Feed';
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
          <Route path = "/" exact component={Feed} />
          <Route path = "/profile" exact component = {Feed} />
          <Route path='/auth' exact component = {Auth}/>
          <Redirect to = '/'/>
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
