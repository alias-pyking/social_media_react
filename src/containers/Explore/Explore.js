import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Posts from '../../components/Posts/Posts';
class Explore extends React.Component {
    componentDidMount(){
        const{token,loadPosts} = this.props;
        loadPosts(token);
    }
    render(){
        const { loading } = this.props;
        let displayPosts = <p>Loading...</p>
        if(!loading) {
            const {posts} = this.props;
            displayPosts = <Posts posts = {posts}/>
        }
        return (
            <div className='col s12'>
                {displayPosts}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token:state.auth.token,
        posts:state.explore.posts,
        loading:state.explore.loading,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        loadPosts:(token) => dispatch(actionCreators.loadExplorePosts(token)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Explore);