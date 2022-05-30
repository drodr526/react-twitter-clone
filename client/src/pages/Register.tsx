import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export default function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [warning, setWarning] = useState("")

    const navigate = useNavigate();

    const handleSubmit = () => {
        axios.post("/api/register",
            { name: name, email: email, username: username, password: password },
            { withCredentials: true })
            .then((res) => {
                console.log(res.data)
                if (res.data == "Successfully registered") {
                    navigate("/login")
                }
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="login m-auto col-lg-6 col-med-12">
                    <form>
                        <a className="navbar-brand quacker-logo" href="/home"><img src="images/duck-logo.png" alt="" width="60" /></a>
                        <h1 className="h3 mb-3 fw-normal">Register</h1>

                        <div className="form-floating">
                            <input type="text" className="form-control bg-dark text-white" value={name} onChange={(event) => setName(event.target.value)} />
                            <label>Your Name</label>
                        </div>

                        <div className="form-floating">
                            <input type="email" className="form-control bg-dark text-white" value={email} onChange={(event) => setEmail(event.target.value)} />
                            <label>Email</label>
                        </div>

                        <div className="form-floating">
                            <input type="text" className="form-control bg-dark text-white" value={username} onChange={(event) => setUsername(event.target.value)} />
                            <label>Username</label>
                        </div>
                        
                        <div className="form-floating">
                            <input type="password" className="form-control bg-dark text-white" value={password} onChange={(event) => setPassword(event.target.value)} />
                            <label>Password</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="button" onClick={handleSubmit}>Sign in</button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
                    </form>
                </div>
            </div>
        </div>
    )
}
