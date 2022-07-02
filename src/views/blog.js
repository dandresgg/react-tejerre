import React, {useEffect, useState} from 'react';
import '../css/post.css';
import {Api} from './api-service';

function Blog() {
    const [posts, setPost] = useState('')
    useEffect(() => {
        Api.blogPosts().then(resp => setPost(resp))
    }, [])
    return (
        <div>
            <div className='mt-menu center'>
                <h1 className='m-0'>Blog</h1>
                <h4 className='w-50 center gray'>Temas de interés, tejido</h4>
                {!posts ? null :
                    <div>
                        <hr />
                        {posts.map(post => (
                            <div key={post.title} className='post'>
                                <div className='d-flex space-a'>
                                    <img src={post.img} alt="" />
                                    <div className="tl w-50">
                                        <h2 className='m-0'>{post.title}</h2>
                                        <h6 className='gray m-0'>{post.created}</h6>
                                        <div dangerouslySetInnerHTML={{__html: post.body}}
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
