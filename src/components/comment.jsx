import React,{useContext, useState} from 'react';
import styled from 'styled-components';
import Upvotes from './upvote';
import CommentHead from './commentHead';
import Reply from './reply'
import { Reply as ReplyCopy } from './textReply';
import Button from './button';
import { Context } from '../context/context';
import {nanoid} from 'nanoid'

const ReplyDiv = styled(ReplyCopy) `
    /* margin-left: 5%; */
    display: ${({replying})=> replying ? "auto" : "none"};
`

const CommentWrapper = styled.div `
    background-color: hsl(223, 19%, 93%);
`

const CommentContainer = styled.div `
    background-color: white;
    border-radius: 10px;
    padding: 3%;
    min-height: 8rem;
    margin-top: 1rem;
    display: flex;

    .commentdetails{
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-left: 3%;
    }
`
const Paragraph = styled.p `
    color: hsl(211, 10%, 45%);
    margin-top: 1rem;
`
const ReplyWrapper = styled.div`
    height: auto;
    display: flex;

    .vertical-line{
        border-left: 1px solid #a1a3db;
        height: auto;
        margin-left: 2rem;
        margin-top: 1rem;
    }
`

function Comment({comment}){
    const {profilePic,rootUser,createReply} = useContext(Context)
    const {content,createdAt,score,user,replies,showReply,id} = comment

    const [isShown, setIsShown] = useState(showReply)

    const [commentReply, setCommentReply] = useState(
        {
            "id": nanoid(),
            "content": "",
            "createdAt": "now",
            "score": 0,
            "replyingTo": user.username,
            "user": {
              "image": { 
                "png": "/images/avatars/image-juliusomo.png",
                "webp": "/images/avatars/image-juliusomo.webp"
              },
              "username": rootUser
            },
            "showReply": false
        }
    )
    
    function handleReplyInput(event){
        const {value, name} = event.target
        setCommentReply(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const showReplyInput = ()=>{
        setIsShown(true)
    }

    const hideReplyInput = (event)=>{
        if(commentReply.content.length > 0){
            createReply(event,id,commentReply)
            setIsShown(false)
            setCommentReply(
                {
                    "id": nanoid(),
                    "content": "",
                    "createdAt": "now",
                    "score": 0,
                    "replyingTo": user.username,
                    "user": {
                      "image": { 
                        "png": "/images/avatars/image-juliusomo.png",
                        "webp": "/images/avatars/image-juliusomo.webp"
                      },
                      "username": rootUser
                    },
                    "showReply": false
                }
            )
        }else{
            setIsShown(false)
        }
    }

  

    const replyElements = replies.map((reply, index) =>(
        <Reply key={index} reply ={reply} commentId ={id}/>
    ))

    return(
        <CommentWrapper>
            <CommentContainer>
                <Upvotes score={score}/>
                <div className='commentdetails'>
                    <CommentHead date ={createdAt} user={user} action={showReplyInput}/>
                    <Paragraph>{content}</Paragraph>
                </div>
            </CommentContainer>
            <ReplyDiv replying={isShown}>
                        <img src={profilePic.png} alt="" className='profile'/>
                        <textarea className='textarea' value={commentReply.content}
                        name="content" onChange={(e) =>handleReplyInput(e)}/>
                        <Button text={"REPLY"} action={hideReplyInput}/>
                    </ReplyDiv>
            <ReplyWrapper>
                <div className='vertical-line'></div>
                <div style={{width: "100%"}}>
                    {replyElements}
                </div>
            </ReplyWrapper>
        </CommentWrapper>
    )
}

export default Comment