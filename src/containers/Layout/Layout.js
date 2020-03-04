import React,{ Component} from 'react';
import './Layout.css';
import Feed from '../Feed/Feed';
import Auth from '../Auth/Auth';
const layout = (props) => {
    return (
        <div className='container'>
            {props.children}
        </div>
    )
}
export default layout;