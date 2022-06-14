import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Submit(props: any) {

    const [session, setSession] = useState(null);
    const [quackText, setQuackText] = useState("");


    useEffect(() => {
        axios.get("/api/session",
            { withCredentials: true })
            .then((res) => setSession(res.data))
    })

    const handleSubmit = () => {
        if (props.reply) {
            axios.post("/api/reply",
                { postID: props.postID, content: quackText },
                { withCredentials: true })
                .then((res) => {
                    //@ts-ignore
                    window.location.reload(false)
                })
        } else {
            axios.post("/api/posts",
                { content: quackText },
                { withCredentials: true })
                .then((res) => {
                    //@ts-ignore
                    window.location.reload(false)
                })
        }
    }

    return (
        <div className='submitDiv'>
            <div className="form-floating">
                <input type="text" className="form-control bg-dark text-white" value={quackText} onChange={(event) => setQuackText(event.target.value)} />
                <label>{props.reply ? "Reply..." : "New quack"}</label>
            </div>
            <button className='btn btn-warning submitButton' onClick={handleSubmit} >Submit</button>
        </div>
    )
}
