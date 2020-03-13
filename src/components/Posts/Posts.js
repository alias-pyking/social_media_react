import React from 'react';
import './Posts.css';
import Post from './Post/Post';
const posts = props => {
    const {posts} = props;
    const displayPosts = posts.map((post) => {
        return <Post
                key = {post.id}
                image = {post.image}
                caption = {post.caption}
                id = {post.id}
        />
    });
    return (
        <div className='posts row'>
            {displayPosts}
        </div>
    );
};

export default posts;