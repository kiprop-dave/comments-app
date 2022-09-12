import React,{useContext,useState} from 'react';
import Upvotes from './upvote';
import CommentHead from './commentHead';
import styled from 'styled-components';
import { Reply as ReplyCopy } from './textReply';
import { Context } from '../context/context';
import Button from './button';
import {nanoid} from 'nanoid'
import DeleteNodal from './deleteNodal';

const ReplyDiv = styled(ReplyCopy) `
    margin-left: 5%;
    display: ${({replying})=> replying ? "auto" : "none"};
`

const ReplyContainer = styled.div `
    background-color: white;
    border-radius: 10px;
    padding: 3%;
    margin-top: 1rem;
    display: flex;
    margin-left: 2rem;

    .details{
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-left: 3%;
    }
`
const Paragraph = styled.p `
    color: hsl(211, 10%, 45%);
    margin-top: 1rem;

    .reply{
        font-weight: 500;
        color: hsl(238, 40%, 52%);
    }
`

export default function Reply({reply,commentId}){
    const {profilePic,rootUser,createReply,deleteReply,upvoteReply,downvoteReply} = useContext(Context)
    const {content,createdAt,score,replyingTo,user,showReply,id} = reply
    const [isShown, setIsShown] = useState(showReply)
    const [replyComment, setReplyComment] = useState(
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

    function showTextArea(){
        setIsShown(true)
    }
    // console.log(id)
    function hideTextArea(event){ // Not working yet
        if(replyComment.content.length > 0){
            createReply(event,id,replyComment)
            setIsShown(false)
        }
    }
    
    function handleReplyText(event){
        const {value,name} = event.target
        setReplyComment(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const [modal, setModal] = useState(false)
    function openModal(){
        setModal(true)
    }
    
    return(
        <>
        <ReplyContainer>
            <Upvotes score={score} upvote={()=>upvoteReply(id)} downvote={()=>downvoteReply(id)}/>
            <div className='details'>
                <CommentHead user={user} date={createdAt} action={showTextArea} modal={openModal}/>
                <Paragraph>
                    <span className='reply'>@{replyingTo} </span>
                    {content}    
                </Paragraph>
            </div>
            {
                modal &&
                <DeleteNodal deleteItem={()=> deleteReply(id)}/>
            }
        </ReplyContainer>
        <ReplyDiv replying ={isShown}>
            <img src={profilePic.png} alt="" className='profile'/>
            <textarea className='textarea'
            name='content' value={replyComment.content} onChange={(e)=>handleReplyText(e)}
            />
            <Button text={"REPLY"} action={hideTextArea} margin={"1rem"}/>
        </ReplyDiv>
        </>
    )
}