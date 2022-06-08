import React, { useEffect, useState} from 'react'
import { Modal, Button } from "react-bootstrap"
import UserInterface from '../interfaces/UserInterface'
import axios from 'axios';
import UserDiv from './UserDiv';

export default function UserList(props: any) {

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    if(props.show){
      axios.post("/api/user-list",
      { list: props.list },
      { withCredentials: true })
      .then((res) => {
        setUsersData(res.data)
        console.log(res.data)
      })
    }
  }, [props.show])

  const handleClose = () => {
    props.setShow(false)
  }

  return (
    <Modal show={props.show} onHide={handleClose} >
      <Modal.Header className="bg-dark" closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        {usersData && usersData.map((user: any) => {
          return <UserDiv
            key={user._id}
            name={user.name}
            username={user.username}
          />
        })}
      </Modal.Body>
      <Modal.Footer className="bg-dark">
      </Modal.Footer>
    </Modal>
  )
}
