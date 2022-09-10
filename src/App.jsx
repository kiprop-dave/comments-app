import './App.css'
import styled from 'styled-components'
import Comments from './components/comments'

//styled component
const PageComponent = styled.div `
  height: auto;
  background-color: hsl(223, 19%, 93%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
