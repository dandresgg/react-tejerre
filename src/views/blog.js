import React, {useEffect, useState} from 'react';
import '../css/post.css';
import {Api} from './api-service';
import PostDetails from './blog-details';

function Blog() {
    const [posts, setPosts] = useState('')
    const [post, setPost] = useState('')
    const [showPost, setShowPost] = useState(false)
    useEffect(() => {
        Api.blogPosts().then(resp => setPosts(resp))
    }, [])

    const showPostDetail = (post) => {
        setShowPost(true)
        setPost(post)
    }

    return (
        <div>
            <div className='mt-menu center'>
                <h1 className='m-0'>Blog</h1>
                <h4 className='w-50 center gray'>Temas de interés, tejido</h4>
                {showPost ?
                    <PostDetails post={post} setShowPost={setShowPost}></PostDetails> :
                    null
                }
                {!posts ? null :
                    <div>
                        <hr />
                        {posts.map(post => (
                            <div key={post.title} className='post' onClick={() => showPostDetail(post)}>
                                <div className='d-flex space-a f-wrap'>
                                    <img src={post.img} alt="" />
                                    <div className="tl w-50">
                                        <h2 className='m-0'>{post.title}</h2>
                                        <h6 className='gray m-0'>{post.created}</h6>
                                        <div dangerouslySetInnerHTML={{__html: post.description}}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default Blog;
