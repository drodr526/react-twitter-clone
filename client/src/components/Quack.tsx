import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import LikeButton from './LikeButton'
import { useNavigate } from 'react-router-dom'

export default function Quack(props: any) {
  const navigate = useNavigate()

  const quackDate: any = new Date(props.date)
  const now: any = new Date()

  const timeDifference: any = now - quackDate

  let simpleDate = ""

  const isToday = (quackDate: any) => {
    const today = new Date()
    return quackDate.getDate() == today.getDate() &&
      quackDate.getMonth() == today.getMonth() &&
      quackDate.getFullYear() == today.getFullYear()
  }

  if (!isToday(quackDate))
    simpleDate = quackDate.getMonth() + 1 + "/" + quackDate.getDate()
  else if (timeDifference > 3600000)
    simpleDate = Math.floor(timeDifference / 3600000) + 'h'
  else if (timeDifference > 60000)
    simpleDate = Math.floor(timeDifference / 60000) + 'm'
  else if (timeDifference > 1000)
    simpleDate = Math.floor(timeDifference / 1000) + 's'

  return (
    <div className="quack" onClick={() => { navigate("/posts/" + props.id) }}>
      <div className='quackLeftSide'>
        <img className="quackProfilePicture" src={"/"+props.profilePicturePath} alt="" />
      </div>

      <div className='quackRightSide'>
        <div className='quackHeader'>
          <p>
            <a className="name" href={"/user/" + props.authorUsername}>
              {props.authorName}</a>
          </p>

          <p><a className="atUsername" href={"/user/" + props.authorUsername}>@{props.authorUsername}</a></p>
          <p className='quackDate'><FontAwesomeIcon icon={regular("clock")} /> {simpleDate}</p></div>

        <p>{props.content}</p>

        <div className='quackFooter'>
          <div className='quackButtons'><FontAwesomeIcon style={{ color: "grey" }} icon={solid("reply")} /></div>
          <div className='quackButtons'><FontAwesomeIcon style={{ color: "grey" }} icon={solid("retweet")} /></div>
          <LikeButton session={props.session} id={props.id} likedBy={props.likedBy} />
        </div>
      </div>

    </div>

  )
}
