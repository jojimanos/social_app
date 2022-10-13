import Navbar from '../copmponents/navbar'
import axios from 'axios'
import { useEffect, useState } from 'react';

const User = ({todos}) => {

    //const [todos, setTodos] = useState([]);
    //useEffect(() => {
    //    axios.get('https://jsonplaceholder.typicode.com/todos').then(response => setTodos(response.data));
    //}, []);

    User.getInitialProps = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
        console.log('SERVER RENDERED', response)
        return {
            todos: response.data
        }
    }

    return (
        <div>
            <Navbar />
            <p>{JSON.stringify(todos)}</p>
        </div>
    )
}

export default User