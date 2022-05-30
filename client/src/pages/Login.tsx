import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [warning, setWarning] = useState("")

    const navigate = useNavigate();

    const handleSubmit = () => {
        axios.post("/api/login",
            { username: email, password: password },
            { withCredentials: true })
            .then((res) => {
                console.log(res.data)
                if (res.data == "Successfully authenticated") {
                    navigate("/")
                }
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="login m-auto col-lg-6 col-med-12">
                    <form>
                        <a className="navbar-brand quacker-logo" href="/home"><img src="images/duck-logo.png" alt="" width="60" /></a>
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                        <div className="form-floating">
                            <input type="text" className="form-control bg-dark text-white" value={email} onChange={(event) => setEmail(event.target.value)} />
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
