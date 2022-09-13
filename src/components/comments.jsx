import React,{useContext} from 'react';
import styled from 'styled-components';
import { Context } from '../context/context';
import Comment from './comment';
import TextReply from './textReply';

//styled
const CommentsContainer = styled.div `
    display: flex;
    background-color: hsl(223, 19%, 93%);
    flex-direction: column;
    margin-bottom: 3rem;
    width: 50%;
    margin-top: 3rem;
    border-radius: 10px;

    @media screen and (max-width: 600px){
        width: 95%;
        margin-top: 1rem;
    }
    
`


function Comments(){
    const {userComments} = useContext(Context)

    const commentElements = userComments.map((comment,index) =>(
        <Comment key ={index} comment = {comment} index={index}/>
    ))

    return(
        <CommentsContainer>
            {commentElements}
            <TextReply/>
        </CommentsContainer>
    )

}

export default Comments