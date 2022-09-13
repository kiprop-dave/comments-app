import React,{useContext, useState} from 'react';
import styled from 'styled-components';
import Upvotes from './upvote';
import CommentHead from './commentHead';
import Reply from './reply'
import { Reply as ReplyCopy } from './textReply';
import Button from './button';
import { Context } from '../context/context';
import {nanoid} from 'nanoid'
import DeleteNodal from './deleteNodal';

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

    @media screen and (max-width: 600px){
        position: relative;
        flex-direction:column;
        min-height: 4rem;
        padding: 3% 3% 3.8rem 3%;
    }

    .commentdetails{
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-left: 3%;
        /* border: solid 1px; */

       @media screen and (max-width:600px) {
            margin-left: 0;
       }
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

        @media screen and (max-width:600px){
            margin-left: 0;
        }
    }
`

function Comment({comment}){
    const {profilePic,rootUser,createReply,deleteComment,upvoteComment,downvoteComment} = useContext(Context)
    const {content,createdAt,score,user,replies,showReply,id} = comment

    const [modal,setModal] = useState(false)

    function openModal(){
        setModal(true)
    }

    function closeModal(){
        setModal(false)
    }

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
                <Upvotes score={score} upvote ={()=>upvoteComment(id)} downvote={()=>downvoteComment(id)}/>
                <div className='commentdetails'>
                    <CommentHead date ={createdAt} user={user} action={showReplyInput} modal={openModal}/>
                    <Paragraph>{content}</Paragraph>
                </div>
                {
                    modal &&
                    <DeleteNodal deleteItem={()=> deleteComment(id)} modal={closeModal}/>
                }
            </CommentContainer>
            <ReplyDiv replying={isShown}>
                        <img src={profilePic.png} alt="" className='profile'/>
                        <textarea className='textarea' value={commentReply.content}
                        name="content" onChange={(e) =>handleReplyInput(e)}/>
                        <Button text={"REPLY"} action={hideReplyInput} margin={"1rem"}
                        bottom={'1rem'} right={"1rem"}/>
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