import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Quack from '../components/Quack';
import Submit from '../components/Submit';

export default function Home() {
  const [session, setSession] = useState(null)
  const [quacks, setQuacks] = useState([]);

  useEffect(()=>{
    axios.get("/api/session")
    .then((res)=>setSession(res.data))

    axios.get("/api/posts")
    .then((res)=>setQuacks(res.data))
  },[])

  return (
    <div>
      <Navbar session={session}/>
      {session && <Submit/>}
      {quacks.map((quack : any)=>{
          return <Quack authorName={quack.author.name} authorUsername={quack.author.username} content={quack.content} date={quack.date}/>
        })}
    </div>
  )
}
