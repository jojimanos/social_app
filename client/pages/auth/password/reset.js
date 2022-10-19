import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { showSuccessMessage, showErrorMessage } from '../../../helpers/alerts';
import Router from 'next/router';

const resetPassword = () => {
    const [state, setState] = useState({
        email: "",
        buttonText: "Reset Password",
        success: "",
        error: ""
    });

    const { password, buttonText, success, error } = state;

    const handleChange = e => {
        setState({ ...state, password: e.target.value, success: '', error: '' })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const response = await axios.put("http://3000:/reset-password", {password})
            setState({...state, password: '', buttonText: 'DONE', success: response.data.message})
        }
        catch (error) {
            setState({
                ...state, password: '', buttonText: '', error: error.response.data.message
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
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                {passwordForgotForm()}
            </div>
        </div>
    )
}

export default resetPassword