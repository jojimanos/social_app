import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { showSuccessMessage, showErrorMessage } from '../../../helpers/alerts';
import Router from 'next/router';

const forgotPassword = () => {
    const [state, setState] = useState({
        email: "",
        buttonText: "Forgot Password",
        success: "",
        error: ""
    });

    const { email, buttonText, success, error } = state;

    const handleChange = e => {
        setState({ ...state, email: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        //console.log('post email to', email)
        try {
            const response = await axios.put(`http://localhost:8000/api/forgot-password`, { email })
            console.log('FORGOT PASSWORD', response)
            setState({
                ...state, email: '', buttonText: 'DONE', success: response.data.message
            })
        } catch (error) {
            console.log('FORGOT PW ERROR', error)
            setState({
                ...state, buttonText: 'Forgot Password', error: error.response.data
            })
        }
    }

    const passwordForgotForm = () => {
        return <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="email"
                    onChange={handleChange}
                    value={email}
                    placeholder="Type your email"
                    required />
            </div>
            <div>
                <button>
                    {buttonText}
                </button>
            </div>
        </form >
    }

    return (
        <div>
            <h1>Forgot Password</h1>
            <br />
            <div>
                {passwordForgotForm()}
            </div>
        </div>
    )
}

export default forgotPassword
