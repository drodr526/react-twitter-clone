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
                        //removes user from the follower list client side
                        for (let i = 0; i < props.viewedUser.followers.length; i++) {
                            if (props.viewedUser.followers[i] == props.session._id) {
                                props.viewedUser.followers.splice(i, 1);
                            }
                        }
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
                        props.viewedUser.followers.push(props.session._id)
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

