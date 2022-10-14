import Navbar from '../copmponents/navbar'
import axios from 'axios'
import getCookie from "../../helpers/auth"

const User = ({ user }) => {
      return (
        <div>
            <Navbar />
            <p>{JSON.stringify(user)}</p>
        </div>
    )
}

User.getInitialProps = async context => {
    const token = getCookie('token', context.req);
    try {
        const response = await axios.get(`http://localhost:3000/user`, {
            headers: {
                authorization: `Bearer ${token}`,
                contentType: 'application/json'
            }
        });
        return { user: response.data };
    } catch (error) {
        if (error.response.status === 401) {
            return { user: 'no user' };
        }
    }
};

export default User