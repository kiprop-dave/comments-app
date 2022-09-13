import React from 'react';
import styled from 'styled-components';

const Dbutton = styled.button `
    /* background-color: hsl(238, 40%, 52%); */
    background-color: ${({background}) => background ? background : "hsl(238, 40%, 52%)"};
    border: none;
    /* width: 5rem; */
    /* width: fit-content; */
    min-width: 10%;
    padding: 3% 5% 3% 5%;
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
    

    @media screen and (max-width: 600px) {
        position: absolute;
        right: ${({right}) => right ? right : 'auto'};
        bottom: ${({bottom}) => bottom ? bottom : 'auto'};
        left: ${({left}) => left ? left : 'auto'};
    }

    :hover{
        opacity: 0.5;
    }
`

export default function Button({text,action,margin, background,bottom,left,right}){
    return(
        <Dbutton margin ={margin} onClick={(e)=>action(e)}
        background={background} bottom={bottom} left={left} right={right}>
            {text}
        </Dbutton>
    )
}