import React,{useContext} from 'react';
import Button from './button';
import styled from 'styled-components';
import { Context } from '../context/context';

const NodalPage = styled.div `
    width: 100vw;
    height: 100vh;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(36, 35, 35, 0.4) //Create opacity without affecting the children elements
    
` 
const NodalContainer = styled.div `
    padding: 1%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 23%;
    background-color: white;
    border-radius: 10px;
    opacity: 1;

    .buttons{
        display: flex;
        align-items: flex-start;
        align-self: flex-start;
        width: 100%;
       
    }
`

export default function DeleteNodal({deleteItem}){

    const {closeNodal} = useContext(Context)

    function deleteSelected(){
        deleteItem()
        closeNodal()
    }
    return(
        <>
        <NodalPage>
            <NodalContainer>
                <div className='confirm'>
                    <h2 style={{color: "hsl(211, 10%, 45%)"}}>Delete comment</h2>
                    <p style={{marginTop: "1rem", marginBottom: "1rem" ,color: "hsl(211, 10%, 45%)"}}>
                        Are you sure you want to delete this comment? This
                        will remove the comment and can't be undone.
                    </p>
                </div>
                <div className='buttons'>
                    <Button text={"No, CANCEL"} action={closeNodal} background={"hsl(211, 10%, 45%)"}/>
                    <Button text={"YES, DELETE"} action={deleteSelected} margin={"2rem"} background={"hsl(358, 79%, 66%)"}/>
                </div>
            </NodalContainer>
        </NodalPage>
        </>
    )
}