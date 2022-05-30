import axios from 'axios'
import React, { useEffect } from 'react'

export default function Navbar() {

    useEffect(()=>{
        axios.get("/api/session",
        {withCredentials:true})
        .then((res)=>{
            console.log(res)
        })
    })

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
  <div className="container-fluid">
    <a className="navbar-brand quacker-logo" href="/home"><img src="images/duck-logo.png" alt="" width="60"/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto">
        {/* recent posts from people you follow */}
        <a className="nav-link active" aria-current="page" href="/home">Home</a>
        {/* all posts ever made on the site */}
        <a className="nav-link" href="/explore">Explore</a>
        <a className="nav-link" href="/profile">Profile</a>
        <a className="nav-link" href="/settings">Settings</a>
      </div>
    </div>
  </div>
</nav>
  )
}
