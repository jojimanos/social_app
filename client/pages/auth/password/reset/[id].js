import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { showSuccessMessage, showErrorMessage } from '../../../../helpers/alerts';
import { withRouter } from 'next/router';

const resetPassword = ({ router }) => {
    const [state, setState] = useState({
        name: "",
        token: "",
        newPassword: "",
        buttonText: "Reset Password",
        success: "",
        error: ""
    });

    const { name, token, newPassword, buttonText, success, error } = state;

    useEffect(() => {
        const decoded = jwt.decode(router.query.id)
        if (decoded) setState({
            ...state,
            name: decoded.name,
            token: router.query.id
        })
    }, [router])

    const handleChange = e => {
        setState({
            ...state,
            newPassword: e.target.value,
            success: '',
            error: ''
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setState({
            ...state,
            buttonText: 'Sending'
        })
        try {
            const response = await axios.put("http://localhost:8000/api/reset-password", { resetPasswordLink: token, newPassword })
            setState({
                ...state,
                newPassword: '',
                buttonText: 'DONE',
                success: response.data.message
            })
        }
        catch (error) {
            console.log('RESET PW PASSWORD', error)
            setState({
                ...state,
                newPassword: '',
                buttonText: 'Forgot Password',
                error: error.response.data
            })
        }
    }

    const passwordResetForm = () => {
        return <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="password"
                    onChange={handleChange}
                    value={newPassword}
                    placeholder="Type new password"
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
            <h1>Hi {name}, ready to reset password?</h1>
            <br />
            <div>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                {passwordResetForm()}
            </div>
        </div>
    )
}

export default withRouter(resetPassword)