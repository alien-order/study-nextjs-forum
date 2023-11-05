'use client'

import { useEffect, useState } from "react"

export default function Comment(props){
    let [comment, setComment] = useState('')
    let [commentList, setCommentList] = useState([])

    useEffect(() => {
        fetch('/api/comment/list?id=' + props.parent).then(r => r.json())
        .then((result) => {
            setCommentList(result)
            console.log(comment)
        })
    }, [])

    return (
        <div>
            <hr></hr>
            <div>
            {
                commentList.length > 0 ?
                commentList.map((a, i) => 
                    <p key={ i }>{ a.content }</p>
                )
                : '댓글없음'
            }            
            </div>
            <input onChange={(e) => {
                setComment(e.target.value)
            }}/>
            <button onClick={() => {
                fetch('/api/comment/new', {method : 'POST', body : JSON.stringify({
                    parent : props.parent,
                    content : comment
                })})
            }}>댓글전송</button> 
        </div>
    )
}