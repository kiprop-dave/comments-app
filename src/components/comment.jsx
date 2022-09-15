import React,{useContext, useState, useEffect} from 'react';
import styled from 'styled-components';
import Upvotes from './upvote';
import CommentHead from './commentHead';
import Reply from './reply'
import { Reply as ReplyCopy } from './textReply';
import Button from './button';
import { Context } from '../context/context';
import {nanoid} from 'nanoid'
import DeleteNodal from './deleteNodal';
import EditComment from './editComment';

const ReplyDiv = styled(ReplyCopy) `
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
    display: ${({editing}) => editing ? 'none' : 'flex'};

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

function Comment({comment,index}){

    const {profilePic,rootUser,createReply,deleteComment,upvoteComment,downvoteComment} = useContext(Context)
    const {content,createdAt,score,user,replies,showReply,id} = comment

    const [commentCopy, setCommentCopy] = useState({}) //state for editing the comment

    function commentEdit(event){ // function to update the comment
        const {name,value} = event.target
        setCommentCopy(prev => ({
            ...prev,
            [name]: value
        }))
        
    }

    const trimReplyCopy = () =>{ // trim edited comment reply
        setCommentCopy(prev => ({
            ...prev,
            content: prev.content.trim()
        }))
    }

    useEffect(()=>{
        setCommentCopy(comment)
    },[comment])
    
    const [voteCount, setVoteCount] = useState(0) // This trecks the upvotes and downvotes so that you can only upvote/downvote once 

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

   const trimReply = ()=>{ // Trims whitespaces
    setCommentReply(prev => ({
        ...prev,
        content: prev.content.trim()
    }))
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

    function addVote(){ // function to upvote comment
        if(voteCount < 1){
            upvoteComment(id)
            setVoteCount(prev => prev + 1)
        }
    }

    function subVote(){  // function to downvote comment
        if(voteCount > -1){
            downvoteComment(id)
            setVoteCount(prev => prev - 1)
        }
    }

    //state for editing the comment
    const [isEditing, setIsEditing] = useState(false)

    //function to show the edit element
    function editComment(){
        setIsEditing(true)
    }

    //function to remove edit element
    function finishEdit(){
        setIsEditing(false)
    }
    
    const replyElements = replies.map((reply, index) =>(
        <Reply key={index} reply ={reply} index={index}/>
    ))
    // console.log(score)
    return(
        <CommentWrapper>
            <CommentContainer editing={isEditing}>
                <Upvotes score={score} upvote ={()=>addVote()} downvote={()=>subVote()}/>
                <div className='commentdetails'>
                    <CommentHead date ={createdAt} user={user} action={showReplyInput} modal={openModal} edit={editComment}/>
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
                    name="content" onChange={(e) =>handleReplyInput(e)} onBlur={()=>trimReply()}/>
                    <Button text={"REPLY"} action={hideReplyInput} margin={"1rem"}
                    bottom={'1rem'} right={"1rem"}/>
            </ReplyDiv>
            {
                isEditing &&
                <EditComment finishEdit={finishEdit} comment={commentCopy} index={index}
                editAction={commentEdit} trim={trimReplyCopy}/>
            }
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