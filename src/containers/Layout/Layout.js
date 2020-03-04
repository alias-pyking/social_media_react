import React,{ Component} from 'react';
import './Layout.css';
import Feed from '../Feed/Feed';
const layout = (props) => {
    return (
        <div className='container'>
        <Feed/>
        </div>
    )
}
export default layout;