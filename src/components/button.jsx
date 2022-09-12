import React from 'react';
import styled from 'styled-components';

const Dbutton = styled.button `
    /* background-color: hsl(238, 40%, 52%); */
    background-color: ${({background}) => background ? background : "hsl(238, 40%, 52%)"};
    border: none;
    /* width: 5rem; */
    width: fit-content;
    padding: 3%;
    height: 2rem;
    display: flex;
    align-items: center;
    margin-left: ${({margin}) => margin ? margin : "0"};
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

export default function Button({text,action,margin, background}){
    return(
        <Dbutton margin ={margin} onClick={(e)=>action(e)}
        background={background}>
            {text}
        </Dbutton>
    )
}