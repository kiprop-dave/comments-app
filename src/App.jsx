import React, {useContext} from 'react';
import './App.css'
import styled from 'styled-components'
import Comments from './components/comments'
import { Context } from './context/context';

//styled component
const PageComponent = styled.div `
  min-height: 100vh;
  background-color: hsl(223, 19%, 93%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: -1;

`

function App() {
  return(
    <>
    <PageComponent>
      <Comments/>
    </PageComponent>
    </>
  )
}

export default App
