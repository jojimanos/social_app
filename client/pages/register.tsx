import React from "react";
import { useState } from "react";
import axios from 'axios'

function Register() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [password, setPassword] = useState("")

    const handleSubmit = (e: any) => {
        e.preventDefault();
        //console.table({ firstName, lastName, email, birthDate })
        axios
            .post(`http://localhost:8000/api/register`, {
                firstName: firstName, lastName: lastName, email: email, birthDate: birthDate, password: password
            })
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                Please complete the following registration form:
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Birth Date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>REGISTER</button>
            </div>
        </form>
    )
}

export default Register