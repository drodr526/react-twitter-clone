import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar(props: any) {
  const navigate = useNavigate()

  const logout = () =>{
    axios.post("/api/logout", {}, {withCredentials: true})
    .then((res)=>{
      //@ts-ignore
        window.location.reload(false)
    })
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand quacker-logo" href="/"><img src="/images/duck-logo.png" alt="" width="60" /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            {props.session && <a className="nav-link" aria-current="page" href="/feed">Feed</a>}

            {props.session && <a className="nav-link" href="/">Explore</a>}
            {props.session ?

              <div className='dropdown'>
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  @{props.session.username}
                </a>
                <ul className="bgdark dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href={"/user/"+props.session.username}>My Profile</a></li>
                  <li><a className="dropdown-item" href="/settings">Settings</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li ><a className="dropdown-item" onClick={logout}>Logout</a></li>
                </ul>
              </div>
              : <a className="nav-link" href="/login">Login</a>}
          </div>
        </div>
      </div>
    </nav>
  )
}
