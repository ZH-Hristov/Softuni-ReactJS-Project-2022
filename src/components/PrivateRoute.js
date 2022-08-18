import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"

import { AuthContext } from "../contexts/authContext"

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext)

    if (!user.accessToken) {
        return <Navigate to='/login' replace />
    }

    return children ? children : <Outlet />
}

export default PrivateRoute