import React from 'react';
import styled from 'styled-components';

const Dbutton = styled.button `
    background-color: hsl(238, 40%, 52%);
    border: none;
    width: 5rem;
    height: 2rem;
    display: flex;
    align-items: center;
    margin-left: 1rem;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-family: 'Rubik', sans-serif;
    border-radius: 7px;
    cursor: pointer;

    :hover{
        opacity: 0.5;
    }
`

export default function Button({text,action}){
    return(
        <Dbutton onClick={(e)=>action(e)}>{text}</Dbutton>
    )
}