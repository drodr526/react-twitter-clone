import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

export default function LikeButton(props : any) {

    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const [waitingApiResponse, setWaitingApiResponse] = useState(false);

    useEffect(()=>{
        if(props.session){
            if(props.session.likes.includes(props.id)){
                setIsLiked(true)
            }
        }
        if(props.likedBy){
            setLikeCount(props.likedBy.length)
        }
    }, [])

    const handleClick = () => {
        if (!waitingApiResponse) {
            if (isLiked) {
                console.log("Unliking")
                setWaitingApiResponse(true)
                axios.post("/api/unlike",
                    { unlikePost: props.id },
                    { withCredentials: true })
                    .then((res) => {
                        setIsLiked(false)
                        setLikeCount(likeCount - 1)
                        setWaitingApiResponse(false)
                    })
            }
            if (!isLiked) {
                console.log("Liking")
                setWaitingApiResponse(true)
                axios.post("/api/like",
                    { likePost: props.id },
                    { withCredentials: true })
                    .then((res) => {
                        setIsLiked(true)
                        setLikeCount(likeCount + 1)
                        setWaitingApiResponse(false)
                    })
            }
        }
    }

  return (
    <div className='quackButtons'>
        {isLiked ?  
        <FontAwesomeIcon style={{color:"red"}} icon={solid("heart")} onClick={handleClick}/> 
        : <FontAwesomeIcon style={{color:"grey"}}icon={regular("heart")} onClick={handleClick}/>}
        <p style={isLiked ? {color:"red"} : {color:"grey"}}> {likeCount > 0 && likeCount}</p>
    </div>
  )
}
