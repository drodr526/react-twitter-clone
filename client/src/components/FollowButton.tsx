import axios from 'axios'
import React, { useState } from 'react'

export default function FollowButton(props: any) {

    const [waitingApiResponse, setWaitingApiResponse] = useState(false);

    const handleClick = () => {
        if (!waitingApiResponse) {
            if (props.isFollowing) {
                setWaitingApiResponse(true)
                axios.post("/api/unfollow",
                    { unfollowUser: props.viewedUser },
                    { withCredentials: true })
                    .then((res) => {
                        console.log(res.data)
                        props.setFollowerCount(props.followerCount - 1)
                        props.setIsFollowing(false)
                        setWaitingApiResponse(false)
                    })
            }
            if (!props.isFollowing) {
                setWaitingApiResponse(true)
                axios.post("/api/follow",
                    { followUser: props.viewedUser },
                    { withCredentials: true })
                    .then((res) => {
                        console.log(res.data)
                        props.setFollowerCount(props.followerCount + 1)
                        props.setIsFollowing(true)
                        setWaitingApiResponse(false)
                    })
            }
        }


    }



    return (
        <a
            onClick={handleClick}
            className={props.isFollowing ? "followingButton" : "followButton"}>
            {props.isFollowing ? "Following" : "Follow"}
        </a>
    )
}

