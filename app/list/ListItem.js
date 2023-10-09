'use client'

import Link from "next/link"

export default function ListItem({ result }){
    
    return (
        <div>
        {
            result.map((d, i) => 
                <div className="list-item" key={ i }>
                    <Link href={'./detail/' + result[i]._id}>
                        <h4>{ result[i].title }</h4>
                    </Link>
                    <Link href={'/edit/' + result[i]._id }>✏️</Link>
                    <span onClick={(e) => {
                        fetch('/api/post/delete', {
                            method : 'DELETE',
                            body : JSON.stringify(result[i])
                        })
                        .then((r) => r.json())
                        .then((r) => {
                            callbackDelete(e, r)
 
                        })
                        //fetch('/api/abc/abcder')
                    }}>🗑️</span>
                    <p>{ result[i].content }</p>
                </div>
            )
        }
        </div>
    )
}

function callbackDelete(e, r) {
    console.log(r)

    if (r == '삭제완료') {
        e.target.parentElement.style.opacity = 0;
        setTimeout(() => {
            e.target.parentElement.style.display = 'none';
        }, 1000)

    } else {
        alert('삭제실패')
    }
}