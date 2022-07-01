import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Quack from '../components/Quack';
import Submit from '../components/Submit';
import { useNavigate } from 'react-router-dom';

export default function Explore() {
  const [session, setSession] = useState(null)
  const [quacks, setQuacks] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("/api/session", { withCredentials: true })
      .then((res) => {
        if (res.data.username) {
          setSession(res.data)
        }
      })

    axios.get("/api/posts")
      .then((res) => setQuacks(res.data))

  axios.get("/api/posts")
    .then((res) => setQuacks(res.data))
}, [])

return (
  <div>
    <Navbar session={session} />
    <h2>All time quacks</h2>
    {session && <Submit />}
    {quacks.map((quack: any) => {
      return <Quack 
      profilePicturePath={quack.author.profilePicturePath}
      id={quack._id} 
      key={quack._id}
      authorName={quack.author.name} 
      authorUsername={quack.author.username} 
      content={quack.content} 
      likedBy={quack.likedBy}
      date={quack.date} 
      session={session}
      />
    })}
  </div>
)
}
