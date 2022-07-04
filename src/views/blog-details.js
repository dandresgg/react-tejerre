import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";

function PostDetails(props) {
    const {post} = props
    console.log(post)
    const closePopup = () => {
        props.setShowPost(false);
    }
    return (
        <div className='part-details postdet'>
            <FontAwesomeIcon className='icon-popup' icon={faClose} onClick={() => closePopup()} />
            <h1>{post.title}</h1>
            <img src={post.img} alt="" className='postdet-img m-0' />
            <div dangerouslySetInnerHTML={{__html: post.description}} className='s-size gray ital w-50 center' />
            <h6></h6>
            <div dangerouslySetInnerHTML={{__html: post.body}} />
        </div>
    )
}

export default PostDetails;
