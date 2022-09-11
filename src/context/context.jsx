import React,{useState, createContext} from 'react';
import localJson from '../utils/data.json'
import {nanoid} from 'nanoid'

const Context = createContext()
const {comments, currentUser} = localJson

function ContextProvider({children}) {
    const {username : rootUser , image : profilePic} = currentUser
    const [userComments, setUsercomments] = useState(comments)
    const [commentReply, setCommentReply] = useState(
        {
            "id": nanoid(),
            "content": "",
            "createdAt": "now",
            "score": 0,
            "user": {
              "image": { 
                "png": "/images/avatars/image-juliusomo.png",
                "webp": "/images/avatars/image-juliusomo.webp"
              },
              "username": rootUser
            },
            "replies": []
        }
    )
    
    const {content} = commentReply
    
    function handleComment(event){
        const {value,name} = event.target;
        setCommentReply(prev => ({
            ...prev,
            [name] : value
        }))
    }

    function createNewComment(){
        setUsercomments(prev => {
            if(commentReply.content.length > 0){
                return [...prev, commentReply]
            }else{
                return prev
            }
        })
        setCommentReply(
            {
                "id": nanoid(),
                "content": "",
                "createdAt": "now",
                "score": 0,
                "user": {
                  "image": { 
                    "png": "/images/avatars/image-juliusomo.png",
                    "webp": "/images/avatars/image-juliusomo.webp"
                  },
                  "username": rootUser
                },
                "replies": []
            }
        )
    }

    function createReply(event,id,newReply){
        event.preventDefault()
        setUsercomments(prev => {
            const prevCopy = prev.map(thisComment => {
                return(
                    thisComment.id === id ?
                    {
                        ...thisComment,
                        replies : [...thisComment.replies, newReply]
                    } : thisComment
                )
            })
            return prevCopy
        })
    }

    // function createDeepReply(event,newReply){

    // }

    const values = {userComments,rootUser,profilePic,handleComment,createNewComment,content,createReply}
    return(
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}