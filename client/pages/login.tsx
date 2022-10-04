import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import axios from 'axios'

function Login(): JSX.Element {

    const [email, setEmail] = useState([] as any);
    const [password, setPassword] = useState([] as any);
    const [success, setSuccess] = useState([] as any);
    const [error, setError] = useState([] as any);
    const [buttonText, setButtonText] = useState("LOGIN")

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setButtonText("Loging In")

        axios
            .post(`http://localhost:8000/api/login`, {
                email: email, password: password
            })
            .then(response => {
                    setEmail([]),
                    setPassword([]), setButtonText('LOGIN'),
                    setSuccess(response.data.message)
            })
            .catch(error => {
                setError(error.response.data),
                    setButtonText('LOGIN')
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <p>{success && success || error && error}</p>
                Please complete the following registration form:
                <input required type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input required type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>{buttonText}</button>
            </div>
        </form>
    )
}

export default Login