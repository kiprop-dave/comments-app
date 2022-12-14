import React, {useContext} from 'react';
import styled from 'styled-components';
import Button from './button';
import CommentHead from './commentHead';
import Upvotes from './upvote';
import { Context } from '../context/context';

const EditContainer = styled.div `
    background-color: white;
    border-radius: 10px;
    min-height: 12rem;
    display: flex;
    margin-top: 1rem;
    padding: 3%;
    border: solid 1px;

    @media screen and (max-width: 600px) {
        position: static;
    }
    
    .textarea{
        width: 95%;
        min-height: 5rem;
        font-family: 'Rubik', sans-serif;
        padding: 2%;
        color: hsl(211, 10%, 45%);
        font-size: 16px;
    }

    .container{
        margin-left: 1rem;
        width: 100%;
        position: relative;
        
    }
    .button-update{
        position: absolute;
        right: 0;
        bottom: 0;

        @media screen and (max-width: 600px) {
            position: relative;
            margin-top: 3rem;
        }
        
    }
`

function EditComment({comment,finishEdit,index,editAction,id,trim}){
    const {editComment, editReply} = useContext(Context)
    const {user,createdAt,content,score} = comment

    function replaceComment(){
        if(!comment.replyingTo){
            editComment(index,comment)
            finishEdit()
        }else if(comment.replyingTo){
            editReply(id,index,comment)
            finishEdit()
        }
    }

    return(
        <>
        <EditContainer>
            <Upvotes score={score}/>
            <div className='container'>
                <CommentHead user={user} date={createdAt} display={'none'}/>
                <textarea className='textarea' defaultValue={content}
                onChange={(e)=>editAction(e)} name="content" onBlur={()=>trim()}/>
                <div className='button-update'>
                    <Button action={replaceComment} text={"UPDATE"} 
                    bottom={"0"} right={"0"}/>
                </div>
            </div>
        </EditContainer>
        </>
    )
}

export default EditComment