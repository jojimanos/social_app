import { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import {showSuccessMessage, showErrorMessage} from '../helpers/alerts'
import {withRouter} from 'next/router' 

const ActivateAccount = ({router}) => {
    return <div>{JSON.stringify(router)}</div>
}

export default withRouter(ActivateAccount)