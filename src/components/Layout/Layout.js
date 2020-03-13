import React from 'react';
import './Layout.css';
import {connect} from 'react-redux';
import NavBar from '../Navigation/NavBar/NavBar';
import { Link } from 'react-router-dom';
const layout = (props) => {
    return (
        <React.Fragment>
            <NavBar/>
            <div className='container'>
                {props.children}
                
            </div>
        </React.Fragment>  
    );
}
const mapStateToProps = (state) =>{
    return {
        isAuth:state.auth.token !== null,
    }
}
export default connect(mapStateToProps)(layout);