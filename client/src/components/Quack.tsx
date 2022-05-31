import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

export default function Quack(props: any) {

  const quackDate: any = new Date(props.date)
  const now: any = new Date()

  const timeDifference: any = now - quackDate

  let simpleDate = ""

  const isToday = (quackDate : any) => {
    const today = new Date()
    return quackDate.getDate() == today.getDate() &&
      quackDate.getMonth() == today.getMonth() &&
      quackDate.getFullYear() == today.getFullYear()
  }

  if(!isToday(quackDate))
    simpleDate = quackDate.getMonth() + "/" + quackDate.getDate()
  else if(timeDifference > 3600000)
    simpleDate = Math.floor(timeDifference / 3600000) + 'h'
  else if (timeDifference > 60000) 
    simpleDate = Math.floor(timeDifference / 60000) + 'm'
  else if (timeDifference > 1000)
    simpleDate = Math.floor(timeDifference / 1000) + 's' 
    
  // console.log(typeof(props.date)) says props.date is a string, not a date object
  //need to find
  return (
    <div className="quack">
      <h4>{props.authorName}</h4> <p>@{props.authorUsername}</p>
      <p>{props.content}</p>
      <p><FontAwesomeIcon icon={regular("clock")} /> {simpleDate}</p>
    </div>
  )
}
