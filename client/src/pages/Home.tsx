import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Quack from '../components/Quack';
import Submit from '../components/Submit';

export default function Home() {
  const [quacks, setQuacks] = useState([]);

  useEffect(()=>{
    axios.get("/api/posts")
    .then((res)=>setQuacks(res.data))
  },[])

  return (
    <div>
      <Navbar/>
      <Submit/>
      {quacks.map((quack : any)=>{
          return <Quack authorName={quack.authorName} authorUsername={quack.authorUsername} content={quack.content} date={quack.date}/>
        })}
    </div>
  )
}
