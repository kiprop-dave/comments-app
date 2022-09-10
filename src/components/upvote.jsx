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

    .votes{
        cursor: pointer;
        margin: 20%;
    }

    .score{
        color: hsl(238, 40%, 52%);
        font-weight: 600;
    }
`

export default function Upvotes({score}){

    return(
        <VotesCount>
            <img src={`/images/icon-plus.svg`} alt="" className='votes'/>
            <p className='score'>{score}</p>
            <img src={`/images/icon-minus.svg`} alt="" className='votes'/>
        </VotesCount>
    )
}