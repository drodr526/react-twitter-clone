import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Quack from '../components/Quack';
import Submit from '../components/Submit';
import { useNavigate, useParams } from 'react-router-dom';
import PostInterface from '../interfaces/PostInterface';

export default function Thread() {
    const navigate = useNavigate()
    const { postID } = useParams()

    useEffect(() => {
        if (postID) {
            axios.get("/api/session", { withCredentials: true })
                .then((res) => {
                    if (res.data.username) {
                        setSession(res.data)
                    }
                    axios.get("/api/posts/" + postID)
                        .then((res) => {
                            if (res.data.content)
                                setMainQuack(res.data)
                            else
                                setWarning("No quack found.")
                        })

                })

        }
    }, [postID])

    const [session, setSession] = useState(null)
    const [mainQuack, setMainQuack] = useState<PostInterface>();
    const [warning, setWarning] = useState("")

    return (
        <div>
            <Navbar session={session} />
            {mainQuack ?
                <Quack
                    id={mainQuack._id}
                    key={mainQuack._id}
                    authorName={mainQuack.author.name}
                    authorUsername={mainQuack.author.username}
                    content={mainQuack.content}
                    likedBy={mainQuack.likedBy}
                    date={mainQuack.date}
                    session={session}
                /> : <h2>{warning}</h2>}

            {mainQuack && mainQuack.replies.length > 0 &&
                <div>
                    <hr />
                    <h3>Replies:</h3>
                </div>
            }
            {session && <Submit reply={true} postID={postID}/>}

            {mainQuack &&
                mainQuack?.replies.map((reply) => {
                    return <Quack
                        id={reply._id}
                        key={reply._id}
                        authorName={reply.author.name}
                        authorUsername={reply.author.username}
                        content={reply.content}
                        likedBy={reply.likedBy}
                        date={reply.date}
                        session={session}
                    />
                })}

        </div>

    )
}
