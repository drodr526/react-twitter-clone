import React, { useState, useRef, useEffect } from 'react'
import Navbar from "../components/Navbar"
import UserInterface from '../interfaces/UserInterface'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from "react-bootstrap"

//CROPPING
import ImageCropper from "../components/ImageCropper";


export default function Settings() {
    const navigate = useNavigate()

    const [session, setSession] = useState<UserInterface>()
    const [imageData, setImageData] = useState()
    const [croppedImageURL, setCroppedImageURL] = useState()
    const [croppedImageFile, setCroppedImageFile] = useState();

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [serverResponse, setServerResponse] = useState()


    useEffect(() => {
        axios.get("/api/session")
            .then((res) => {
                if (res.data.username) {
                    setSession(res.data)
                    setName(res.data.name)
                    setUsername(res.data.username)
                }
                else
                    navigate("/")
            })

    }, [])

    const onUploadFile = (event: any) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader: any = new FileReader();

            reader.addEventListener('load', () => {
                setImageData(reader.result)
            });

            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleSetUsername = () => {
        axios.post("/api/change-username",
        {username: username},
        {withCredentials: true})
        .then((res)=>{
            setServerResponse(res.data)
        })
    }

    const handleSetAsName = () =>{
        console.log("running")

        axios.post('/api/change-name',
        {name: name},
        {withCredentials: true})
        .then((res)=>{
            setServerResponse(res.data)
        })
    }

    const handleSetAsPassword = () =>{
        axios.post('/api/change-password',
        {password: password},
        {withCredentials: true})
        .then((res)=>{
            setServerResponse(res.data)
        })
    }

    const handleSetAsProfilePicture = () => {

        const data = new FormData();
        //@ts-ignore
        data.append("profilePicture", croppedImageFile, "pfp.jpeg")

        axios.post("/api/change-pfp/",
            data,
            { withCredentials: true })
            .then((res) => {
                setServerResponse(res.data)
            })
    }

    return (
        <div>
            <Navbar session={session} />
            <div className='settings'>
                <h3>Settings</h3>
                {serverResponse && <h4 style={{color:"yellow"}}>{serverResponse}</h4>}
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" className='bg-dark text-white' spellCheck="false" value={username} onChange={(event) => setUsername(event.target.value)} />
                    <Button className='settingsButton' onClick={handleSetUsername}>Set Username</Button>
                    <Form.Label>Screen name</Form.Label>
                    <Form.Control type="text" placeholder="" className='bg-dark text-white' spellCheck="false" value={name} onChange={(event) => setName(event.target.value)} />
                    <Button className='settingsButton' onClick={handleSetAsName}>Set Name</Button>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Something secure" className='bg-dark text-white' value={password} onChange={(event) => setPassword(event.target.value)} />
                    <Button className='settingsButton' onClick={handleSetAsPassword}>Set Password</Button>
                    
                    <br />

                    <br />

                </Form.Group>
                <h3>Change Profile Picture</h3>
                <input type="file" accept="image/*" onChange={onUploadFile} />


                {imageData &&
                    <ImageCropper
                        imageToCrop={imageData}
                        onImageCropped={(croppedImage: any) => setCroppedImageURL(croppedImage)}
                        setCroppedImageFile={setCroppedImageFile}
                    />}
                {
                    croppedImageURL &&
                    <div>
                        <h2>Cropped Image</h2>
                        <img
                            alt="Cropped Image"
                            src={croppedImageURL}
                        />

                        <Button className='submitProfilePicture'
                            variant="primary"
                            onClick={handleSetAsProfilePicture}>
                            Set as Profile Picture</Button>{' '}
                    </div>
                }


            </div>
        </div>

    )
}
