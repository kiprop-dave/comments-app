import React,{useContext} from 'react';
import styled from 'styled-components';
import { Context } from '../context/context';
import Button from './button';

export const Reply = styled.div `
    background-color: white;
    border-radius: 10px;
    min-height: 7rem;
    display: flex;
    margin-top: 1rem;
    padding: 3%;
    

    @media screen and (max-width: 600px) {
        position: relative;
    }
    
    
    .textarea{
        width: 100%;
        margin-left: 1rem;
        font-family: 'Rubik', sans-serif;
        padding: 2%;
        
        @media screen and (max-width:600px){
            position: absolute;
            left: 2px;
            width: 80%;
            height: 35%;
        }
    }

    .profile{
        width: 2rem;
        height: 2rem;

        @media screen and (max-width:600px){
            position: absolute;
            bottom: 1rem;
        }
    }
`

export default function TextReply(){
    const {profilePic,handleComment,createNewComment,content,trimText} = useContext(Context)

    return(
       <Reply>
            <img src={profilePic.png} alt="dp" className='profile'/>
            <textarea placeholder='Add a comment' className='textarea' name='content'
            value={content}
            onChange={(e) => handleComment(e)} onBlur={()=>trimText()}
            />
            <Button text={"SEND"} action={createNewComment} margin={"1rem"}
            bottom={"1rem"} right={"1rem"}/>
       </Reply>
    )
}