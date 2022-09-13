import React from 'react';
import styled from 'styled-components';


const VotesCount = styled.div `
    background-color: hsl(228, 33%, 97%);
    width: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 6rem;
    justify-content: space-between;
    border-radius: 10px;

    @media screen and (max-width:600px){
        padding: 0 2% 0 2%;
    }

    @media screen and (max-width:600px){
        position: absolute;
        bottom: 1rem;
        width: 6rem;
        height: 2.5rem;
        flex-direction:row ;
    }

    .votes{
        cursor: pointer;
        margin: 20%;

        @media screen and (max-width:600px) {
            margin: 0;
        }
    }

    .score{
        color: hsl(238, 40%, 52%);
        font-weight: 600;
    }
`

export default function Upvotes({score,downvote,upvote}){

    return(
        <VotesCount>
            <img src={`/images/icon-plus.svg`} alt="" className='votes'onClick={()=>upvote()}/>
            <p className='score'>{score}</p>
            <img src={`/images/icon-minus.svg`} alt="" className='votes' onClick={()=>downvote()}/>
        </VotesCount>
    )
}