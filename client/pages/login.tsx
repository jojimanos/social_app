import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import axios from 'axios'
import { authenticate, isAuth } from '../helpers/auth'
import Navbar from "./copmponents/navbar";

function Login(): JSX.Element {

    const [email, setEmail] = useState([] as any);
    const [password, setPassword] = useState([] as any);
    const [success, setSuccess] = useState([] as any);
    const [error, setError] = useState([] as any);
    const [buttonText, setButtonText] = useState("LOGIN")

    useEffect(() => {
        isAuth() && Router.push('/')
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setButtonText("Loging In")

        try {
            const response = await axios
                .post(`http://localhost:8000/api/login`, {
                    email: email, password: password
                })

            authenticate(response, () => isAuth() && isAuth().role == 'admin' ? Router.push('/admin') : Router.push('/user'))
        }
        catch (error) {
            setButtonText('LOGIN')
        };
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Navbar />
                <p>{success && success || error && error}</p>
                Please complete the following registration form:
                <input required type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input required type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>{buttonText}</button>
            </div>
            <Link href="/auth/password/forgot">
                <a>Forgot Password</a>
            </Link>
        </form>
    )
}

export default Login