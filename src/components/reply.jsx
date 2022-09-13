import React,{useContext,useState, useEffect} from 'react';
import Upvotes from './upvote';
import CommentHead from './commentHead';
import styled from 'styled-components';
import { Reply as ReplyCopy } from './textReply';
import { Context } from '../context/context';
import Button from './button';
import {nanoid} from 'nanoid'
import DeleteNodal from './deleteNodal';
import EditComment from './editComment';

const ReplyDiv = styled(ReplyCopy) `
    margin-left: 5%;
    display: ${({replying})=> replying ? "auto" : "none"};
`
const ReplyWrapper = styled.div `
    margin-left: 2rem;
`

const ReplyContainer = styled.div `
    background-color: white;
    border-radius: 10px;
    padding: 3%;
    margin-top: 1rem;
    display: ${({editing}) => editing ? 'none' : 'flex'};

    @media screen and (max-width:600px){
        position: relative;
        padding-bottom: 3.8rem;
    }

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

export default function Reply({reply,index}){
    const {profilePic,rootUser,createReply,deleteReply,upvoteReply,downvoteReply,
    createDeepReply} = useContext(Context)
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
    const [replyCopy, setReplyCopy] = useState({})
    
    useEffect(()=>{
        setReplyCopy(reply)
    },[reply])

    function editReply(event){
        const {name, value} = event.target
        setReplyCopy(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const [isEditing, setIsEditing] = useState(false)
    
    function startEditing(){
        setIsEditing(true)
    }

    function finishEdit(){
        setIsEditing(false)
    }

    const [voteCount, setVoteCount] = useState(0)

    function addVote(){
        if(voteCount < 1){
            upvoteReply(id)
            setVoteCount(prev => prev + 1)
        }
    }

    function subVote(){
        if(voteCount > -1){
            downvoteReply(id)
            setVoteCount(prev => prev - 1)
        }
    }

    function showTextArea(){
        setIsShown(true)
    }
    // console.log(id)
    function hideTextArea(event){ // Not working yet
        if(replyComment.content.length > 0){
            createDeepReply(event,id,replyComment)
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

    function closeModal(){
        setModal(false)
    }
    
    return(
        <>
        <ReplyWrapper>
            <ReplyContainer editing ={isEditing}>
                <Upvotes score={score} upvote={()=>addVote()} downvote={()=>subVote()}/>
                <div className='details'>
                    <CommentHead user={user} date={createdAt} action={showTextArea} modal={openModal}
                    edit={startEditing}/>
                    <Paragraph>
                        <span className='reply'>@{replyingTo} </span>
                        {content}    
                    </Paragraph>
                </div>
                {
                    modal &&
                    <DeleteNodal deleteItem={()=> deleteReply(id)} modal={closeModal}/>
                }
            </ReplyContainer>
            {
                isEditing &&
                <EditComment comment={replyCopy} finishEdit={finishEdit} index={index}
                editAction={editReply} id={id}/>
            }
            <ReplyDiv replying ={isShown}>
                <img src={profilePic.png} alt="" className='profile'/>
                <textarea className='textarea'
                name='content' value={replyComment.content} onChange={(e)=>handleReplyText(e)}
                />
                <Button text={"REPLY"} action={hideTextArea} margin={"1rem"} 
                bottom={"1rem"} right={"1rem"}/>
            </ReplyDiv>
        </ReplyWrapper>
        </>
    )
}