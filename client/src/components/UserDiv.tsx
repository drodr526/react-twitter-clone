import React from 'react'

export default function UserDiv(props: any) {


    return (
        <a style={{textDecoration:"none"}} href={"/user/" + props.username}>
            <div className='userDiv'>
                <h4><a className="name">{props.name}</a></h4>
                <p className='atUsername'>@{props.username}</p>
            </div>
        </a>
    )
}
