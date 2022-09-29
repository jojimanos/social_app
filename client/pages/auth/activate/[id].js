import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { showSuccessMessage, showErrorMessage } from '../../../helpers/alerts';
import { withRouter } from 'next/router';

const ActivateAccount = ({ router }) => {

    const [state, setState] = useState({
        firstName: '',
        password: '',
        token: '',
        buttonText: 'Activate Account',
        success: '',
        error: ''
    });
    const { firstName, token, buttonText, success, error } = state;

    useEffect(() => {
        let token = router.query.id;
        if (token) {
            const { firstName } = jwt.decode(token);
            setState({ ...state, firstName, token });
        }
    }, [router]);

    const clickSubmit = async e => {
        e.preventDefault();
        // console.log('activate acccount');
        setState({ ...state, buttonText: 'Activating' });

        try {
            const response = await axios.post(`http://localhost:8000/api/register/activate`, { token });
            // console.log('account activate response', response)
            setState({ ...state, firstName: '', token: '', buttonText: 'Activated', success: response.data.message });
        } catch (error) {
            setState({ ...state, buttonText: 'Activate Account', error: error.response.data });
        }
    };

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h1>G'day {firstName}, Ready to activate your account?</h1>
                <br />
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                <button className="btn btn-outline-warning btn-block" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default withRouter(ActivateAccount);
