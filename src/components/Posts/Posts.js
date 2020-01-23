import React from 'react';
import './Posts.css';
import Post from './Post/Post';
const posts = props => {
    const {posts} = props;
    const displayPosts = posts.map((post) => {
        return <Post
                image = {post.image}
                caption = {post.caption}
                id = {post.id}
        />
    });
    return (
        <div className='posts'>
            {displayPosts}
        </div>
    );
};

export default posts;