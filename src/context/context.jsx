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

    function deleteComment(id){ // function to delete a comment
        setUsercomments(prev => prev.filter(item => item.id !==id))
    }

    function deleteReply(id){
        setUsercomments(prev =>{
            const prevCopy = prev.map(commentItem =>{
                const {replies} = commentItem
                const repliesCopy = replies.filter(item => item.id !== id)
                return(
                    {
                        ...commentItem,
                        replies: repliesCopy
                    }
                )
            })
            return prevCopy
        })
    }
    
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

    function createDeepReply(event,id,newReply){
        event.preventDefault()
       const _userComments = [...userComments]
       const questionIndex = _userComments.findIndex(item => item.replies.some(reply => reply.id === id))
       const {replies} = _userComments[questionIndex]
       const _replies = [...replies]
       _replies.push(newReply)
       _userComments[questionIndex].replies = _replies
       setUsercomments(_userComments)
    }

    function upvoteComment(id){ // function to upvote a comment, used by the comment component
        setUsercomments(prev => {
            const prevCopy = prev.map(thisComment => {
                return(
                    thisComment.id === id ?
                    {
                        ...thisComment,
                        score: thisComment.score + 1
                    }: thisComment
                )
            })
            return prevCopy
        })
    }
    function downvoteComment(id){ // function to downvote a comment, used by the comment component
        setUsercomments(prev => {
            const prevCopy = prev.map(thisComment => {
                return(
                    thisComment.id === id ?
                    {
                        ...thisComment,
                        score: thisComment.score - 1
                    }: thisComment
                )
            })
            return prevCopy
        })
    }

    function upvoteReply(id){ // function to upvote a reply, used by the reply component
        setUsercomments(prev => {
            const prevCopy = prev.map(thisComment => {
                const {replies} = thisComment
                const _replies = replies.map(reply => {
                    return(
                        reply.id === id ?
                        {
                            ...reply,
                            score: reply.score + 1
                        }: reply
                    )
                })
                return(
                    {
                        ...thisComment,
                        replies: _replies
                    }
                )
            })
            return prevCopy
        })
    }

    function downvoteReply(id){ // function to downvote a reply, used by the reply component
        setUsercomments(prev => {
            const prevCopy = prev.map(thisComment => {
                const {replies} = thisComment
                const _replies = replies.map(reply => {
                    return(
                        reply.id === id ?
                        {
                            ...reply,
                            score: reply.score - 1
                        }: reply
                    )
                })
                return(
                    {
                        ...thisComment,
                        replies: _replies
                    }
                )
            })
            return prevCopy
        })
    }

    function editComment(index,replacement){
        const _userComments = [...userComments]
        _userComments.splice(index,1,replacement)
        setUsercomments(_userComments)
    }

    function editReply(id,index,replacement){
        const _userComments = [...userComments]
        const commentIndex = _userComments.findIndex(comment => comment.replies.some(reply => reply.id === id)) // find index of question with reply
        const {replies} = _userComments[commentIndex]
        const _replies = [...replies]
        _replies.splice(index,1,replacement)
        _userComments[commentIndex].replies = _replies
        setUsercomments(_userComments)
    }

    const values = 
    {
        userComments,rootUser,profilePic,handleComment,
        createNewComment,content,createReply,deleteComment,deleteReply,upvoteComment,
        downvoteComment,upvoteReply,downvoteReply, editComment,createDeepReply,editReply
    }
    return(
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}