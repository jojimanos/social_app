import Navbar from '../copmponents/navbar'
import withAdmin from '../withAdmin'

const Admin = ({ user, token }) => {

    return <div>
        <Navbar />
        <p>{JSON.stringify(user, token)}</p>
    </div>

}
export default withAdmin(Admin)