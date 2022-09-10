import React,{useState, createContext} from 'react';
import localJson from '../utils/data.json'

const Context = createContext()
const {comments, currentUser} = localJson

function ContextProvider({children}) {
    const [userComments, setUsercomments] = useState(comments)

    const rootUser = currentUser.username
    
    const values = {userComments,rootUser}
    return(
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}