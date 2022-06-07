import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Quack from '../components/Quack';
import Submit from '../components/Submit';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null)
  const [quacks, setQuacks] = useState([]);

  useEffect(() => {
    axios.get("/api/session", { withCredentials: true })
      .then((res) => {
        if (res.data.username) {
          setSession(res.data)
        }
        else
          navigate("/")
      })
  }, [])

  useEffect(()=>{
    if(session){
      axios.get("/api/feed")
      .then((res) => setQuacks(res.data))
    }
    
  },[session])

  return (
    <div>
      <Navbar session={session} />
      <h2>Quacks from people you follow</h2>
      {session && <Submit />}
      {quacks && quacks.map((quack: any) => {
        return <Quack 
        id={quack._id} 
        key={quack._id}
        authorName={quack.author.name} 
        authorUsername={quack.author.username} 
        content={quack.content} 
        date={quack.date} 
        session={session}
        />
      })}
    </div>
  )
}
