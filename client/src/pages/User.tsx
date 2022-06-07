import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Quack from '../components/Quack';
import Submit from '../components/Submit';
import FollowButton from '../components/FollowButton';
import UserInterface from '../interfaces/UserInterface';

export default function User() {
  const [showFollowButton, setShowFollowButton] = useState(false)
  const [followerCount, setFollowerCount] = useState()
  const [isFollowing, setIsFollowing] = useState(false)
  const [session, setSession] = useState<UserInterface>();
  const [viewedUser, setViewedUser] = useState<UserInterface>();
  const [quacks, setQuacks] = useState([]);

  const { username } = useParams();

  useEffect(() => {
    axios.get("/api/session")
      .then((res) => {
        setSession(res.data)
        console.log("Session user: " + res.data.username)
        console.log(res.data)
      })

    axios.get("/api/users/" + username)
      .then((res) => {
        setFollowerCount(res.data.followers.length)
        setViewedUser(res.data)
        console.log("Viewed user: ")
        console.log(res.data)
      })

    axios.get("/api/users/" + username + "/posts")
      .then((res) => setQuacks(res.data))
  }, [])

  useEffect(() => {
    if (viewedUser && session) {
      if (viewedUser.username != session.username) {
        setShowFollowButton(true)
      }

      //@ts-ignore
      if (session["following"].includes(viewedUser["_id"])) {
        setIsFollowing(true)
      }
    }
  }, [viewedUser, session])

  return (
    <div>
      <Navbar session={session} />
      <div className='user-header'>
        {showFollowButton && <FollowButton 
        viewedUser={viewedUser} 
        session={session} 
        isFollowing={isFollowing} 
        setIsFollowing={setIsFollowing} 
        followerCount={followerCount} 
        setFollowerCount={setFollowerCount} />}
        <h2>{viewedUser ? viewedUser.username : "No user found."}</h2>
      </div>
      {viewedUser && <div><h4 className='followingCount'>{viewedUser.following.length} Following</h4> <h4 className='followerCount'>{followerCount} Followers</h4></div>}
      {session && <Submit />}
      {quacks.map((quack: any) => {
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
