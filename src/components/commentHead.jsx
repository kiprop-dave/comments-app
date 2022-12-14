import React, {useContext} from 'react';
import styled from 'styled-components';
import { Context } from '../context/context';

const Header = styled.div `
    display: flex;
    align-items: center;
    position: relative;
    

    @media screen and (max-width:600px){
        position: static;
    }

    .profile{
        width: 2rem;
    }
    .username{
        font-weight: 600;
        margin-left: 1rem;
    }
    .date{
        color: hsl(211, 10%, 45%);
        margin-left: 1rem;
    }
    .reply{
        display: flex;
        align-items: center;
        position: absolute;
        right: 3px;
        width: 13%;
        justify-content: space-between;
        cursor: pointer;

        @media screen and (max-width:600px){
            bottom: 1rem;
            right: 5%;
            width: 4rem;
        }
    }
    .reply:hover{
        opacity: 0.5;
    }
`
const Paragraph = styled.p `
    font-weight: 600;
    color: hsl(238, 40%, 52%);
`
const DeleteParagraph = styled(Paragraph) `
    color: hsl(358, 79%, 66%);
`
const YouElement = styled.div`
    background-color: hsl(238, 40%, 52%);;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-left: 1rem;
    font-size: 14px;
    width: 2rem;
`
const Reply = styled.div `
    width: 10rem;
    position: absolute;
    right: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    

    @media screen and (max-width:600px){
        bottom: 1.5rem;
        right: 1rem;
        display: ${({display}) => display ? display : 'auto'};
    }

    .delete{
        width: 50%;
    }
    .delete:hover{
        opacity:0.5;
    }

    .edit{
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }
    .icon{
        width: 35%
    }
    .icon:hover{
        opacity: 0.5;
    }
    
`

export default function CommentHead({date,user,action,modal,edit,display}){
    const {rootUser} = useContext(Context)

    const {image, username} = user
    return(
        <Header>
            <img src={`${image.png}`} alt="pic" className='profile' />
            <p className='username'>{username}</p>
            {
                username === rootUser &&
                <YouElement>
                    <span>You</span>
                </YouElement>
            }
            <p className='date'>{date}</p>
            {
                username !== rootUser ?
                <div className='reply' onClick={()=> action()}>
                    <img src={`/images/icon-reply.svg`} alt="reply" />
                    <Paragraph>Reply</Paragraph>
                </div> :
                <Reply display={display}>
                    <div className='edit delete' onClick={() =>modal && modal()}>
                        <img src="/images/icon-delete.svg" alt="delete" />
                        <DeleteParagraph>Delete</DeleteParagraph>
                    </div>
                    <div className='edit icon ' onClick={()=> edit && edit()}>
                        <img src="/images/icon-edit.svg" alt="edit" />
                        <Paragraph>Edit</Paragraph>
                    </div>
                </Reply>
            }
        </Header>
    )
}