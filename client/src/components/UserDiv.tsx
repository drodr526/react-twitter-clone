import React from 'react'
import { useNavigate } from "react-router-dom"

export default function UserDiv(props: any) {
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/user/" + props.username);
        //@ts-ignore
        window.location.reload(false)
    }

    return (
        <div className='userDiv' onClick={handleClick}>
            <h4><a className="name">{props.name}</a></h4>
            <p><a className="atUsername">@{props.username}</a></p>
        </div>
    )
}
