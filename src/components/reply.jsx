import React from 'react';
import Upvotes from './upvote';
import CommentHead from './commentHead';
import styled from 'styled-components';

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

export default function Reply({reply}){
    const {content,createdAt,score,replyingTo,user} = reply
    return(
        <ReplyContainer>
            <Upvotes score={score}/>
            <div className='details'>
                <CommentHead user={user} date={createdAt}/>
                <Paragraph>
                    <span className='reply'>@{replyingTo} </span>
                    {content}    
                </Paragraph>
            </div>
        </ReplyContainer>
    )
}