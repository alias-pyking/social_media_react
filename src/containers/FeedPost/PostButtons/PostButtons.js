import React from 'react'
import './PostButtons.css'
export default class PostButtons extends React.Component{
    state = {
        liked:false,
        liking:false,
    }
    handleLikeclick = (event) =>{
        
    }

    render(){
        return (
            <div className='buttons'>
                <button className='postlikeButton'>Like</button>
                <button className='postlikeButton'>Comment</button>
            </div>
        )
    }
}