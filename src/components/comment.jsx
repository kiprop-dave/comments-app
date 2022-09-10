import React from 'react';
import styled from 'styled-components';
import Upvotes from './upvote';
import CommentHead from './commentHead';
import Reply from './reply'

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
    }
`

function Comment({comment}){
    const {content,createdAt,score,user,replies} = comment

    const replyElements = replies.map((reply, index) =>(
        <Reply key={index} reply ={reply} />
    ))

    return(
        <CommentWrapper>
            <CommentContainer>
                <Upvotes score={score}/>
                <div className='commentdetails'>
                    <CommentHead date ={createdAt} user={user}/>
                    <Paragraph>{content}</Paragraph>
                </div>
            </CommentContainer>
            <ReplyWrapper>
                <div className='vertical-line'></div>
                <div>
                    {replyElements}
                </div>
            </ReplyWrapper>
        </CommentWrapper>
    )
}

export default Comment