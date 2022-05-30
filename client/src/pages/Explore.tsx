import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Quack from '../components/Quack';

export default function Explore() {
  const [quacks, setQuacks] = useState([]);

  useEffect(()=>{
    axios.get("/api/posts")
    .then((res)=>setQuacks(res.data))
  },[])

  return (
    <div>
      <Navbar/>
      {quacks.map((quack : any)=>{
          return <Quack author={quack.authorName} content={quack.content}/>
        })}
    </div>
  )
}
