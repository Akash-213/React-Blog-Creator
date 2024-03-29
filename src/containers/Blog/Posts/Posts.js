import { Component } from "react";

import { Route } from 'react-router-dom';
import axios from 'axios';

import './Posts.css';

import Post from '../../../components/Post/Post'
import FullPost from '../FullPost/FullPost'

class Posts extends Component {

    state = {
        posts: [],
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4)
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Sanjana'
                    }
                })
                this.setState({
                    posts: updatedPosts
                });
                // console.log(response)
            })
            .catch(error => {
                console.log('Some Error Occured')
                // this.setState({ error: true })
            });

    }


    postSelectedHandler = (id) => {
        // this.props.history.push({ pathname: '/' + id });
        this.props.history.push('/posts/' + id);
    }

    render() {

        let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>

        if (!this.state.error) {
            posts = this.state.posts.map(
                post => {
                    return (
                        //programmitcally added with push
                        // <Link to={'/posts/' + post.id} key={post.id}>
                        <Post

                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)}
                        />
                        //  </Link>
                    )

                }
            );
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>

                {/* <Route path='/posts/:id' exact component={FullPost} /> */}
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />

            </div>

        )

    }
}

export default Posts;