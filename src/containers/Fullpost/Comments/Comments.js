import React from 'react';
import './Comments.css';
import Comment from '../Comment/Comment';
const comments = props =>{
    const {comments} = props;
    comments.map( comment => {
        return (
            <Comment
            profileImg={comment.urlToProfileImage}
            username = {comment.userName}
            comment = {comment.text}
            />
        );
    });
    return(
        <div className="commentList">
            <>
            {comments}
            </>
        </div>
    )
}
export default comments;