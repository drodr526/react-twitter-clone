import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Submit(props: any) {

    const [session, setSession] = useState(null);
    const [quackText, setQuackText] = useState("");
    const [charCount, setCharCount] = useState(140)


    useEffect(() => {
        axios.get("/api/session",
            { withCredentials: true })
            .then((res) => setSession(res.data))
    })

    useEffect(() => {
        setCharCount(140 - quackText.length)
    }, [quackText])

    const handleSubmit = () => {

        let shortenedQuack = quackText.slice(0, 140)

        if (props.reply) {
            axios.post("/api/reply",
                { postID: props.postID, content: shortenedQuack },
                { withCredentials: true })
                .then((res) => {
                    //@ts-ignore
                    window.location.reload(false)
                })
        } else {
            axios.post("/api/posts",
                { content: shortenedQuack },
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
            <p className="charCount" style={charCount >= 0 ? { color: "white" } : { color: "red" }}>{charCount}/140</p>
        </div>
    )
}
