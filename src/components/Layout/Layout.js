import React from 'react';
import './Layout.css';
import {connect} from 'react-redux';
import BottomBar from '../Navigation/Bottombar/Bottombar';
const layout = (props) => {
    return (
        <React.Fragment>
            
            <div className='container'>
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