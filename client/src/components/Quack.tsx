import React from 'react'

export default function Quack(props : any) {
  return (
    <div className="quack">
        <h4>{props.authorName}</h4>
        <p>{props.content}</p>
        <p>{props.date}</p>
    </div>
  )
}
