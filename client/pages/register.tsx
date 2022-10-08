import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import {isAuth} from '../helpers/auth'
import Router from "next/router";
import Navbar from "./copmponents/navbar";

function Register(): JSX.Element {

    const [firstName, setFirstName] = useState([] as any);
    const [lastName, setLastName] = useState([] as any);
    const [email, setEmail] = useState([] as any);
    const [birthDate, setBirthDate] = useState([] as any);
    const [password, setPassword] = useState([] as any);
    const [success, setSuccess] = useState([] as any);
    const [error, setError] = useState([] as any);
    const [buttonText, setButtonText] = useState("REGISTER")
    
    useEffect(() => {
        isAuth() && Router.push('/')
    })

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setButtonText('Registering')

        axios
            .post(`http://localhost:8000/api/register`, {
                firstName: firstName, lastName: lastName, email: email, birthDate: birthDate, password: password
            })
            .then(response => {
                setFirstName([]), setLastName([]),
                    setEmail([]), setBirthDate([]),
                    setPassword([]), setButtonText('REGISTER'),
                    setSuccess(response.data.message)
            })
            .catch(error => {
                setError(error.response.data),
                    setButtonText('REGISTER')
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Navbar/>
                <p>{success && success || error && error}</p>
                Please complete the following registration form:
                <input required type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input required type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input required type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input required type="text" placeholder="Birth Date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                <input required type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>{buttonText}</button>
            </div>
        </form>
    )
}

export default Register