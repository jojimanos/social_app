import Navbar from '../copmponents/navbar'
import withUser from '../withUser'

const User = ({ user, token }) => {
    return <div>
        <Navbar />
        <p>{JSON.stringify(user, token)}</p>
    </div>

}

export default withUser(User)