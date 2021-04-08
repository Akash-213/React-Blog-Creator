import React, { Component } from 'react';

import './NewPost.css';

import axios from 'axios';
import { Redirect } from 'react-router-dom';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Sanjana',
        submitted: false,
    }

    componentDidMount() {
        // if un auth then block
        console.log(this.props)
    }

    postDataHandler = () => {
        const postData = {
            title: this.state.title,
            body: this.state.body,
            author: this.state.author,

        }
        axios.post('http://jsonplaceholder.typicode.com/posts', postData)
            .then(response => {
                console.log(response)
                //add backend Logic
                this.props.history.replace('/posts');
                // this.setState({ submitted: true })
            })

    }

    render() {

        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to='/posts' />


        }
        return (
            <div className="NewPost">

                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })}>
                    <option value="Akash">Akash</option>
                    <option value="Sanjana">Sanjana</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;