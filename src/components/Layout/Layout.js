import React from 'react';
import './Layout.css';
import {connect} from 'react-redux';
import BottomBar from '../Navigation/Bottombar/Bottombar';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
const layout = (props) => {
    return (
        <React.Fragment>
            
            <div className='container'>
                <Link to='/acc'>Follow New Users</Link>
                {props.children}
                <BottomBar />
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