import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Submit() {

    const [session, setSession] = useState(null);
    const [quackText, setQuackText] = useState("");
    

    useEffect(()=>{
        axios.get("/api/session",
        {withCredentials:true})
        .then((res)=>setSession(res.data))
    })

    const handleSubmit = () =>{
        axios.post("/api/posts", 
        {content: quackText},
        {withCredentials:true})
    }

    return (
        <div className='submit'>
            <div className="form-floating">
                <input type="text" className="form-control bg-dark text-white" value={quackText} onChange={(event) => setQuackText(event.target.value)} />
                <label>New Quack</label>
            </div>
            <button className='btn btn-warning' onClick={handleSubmit} >Submit</button>
        </div>
    )
}
