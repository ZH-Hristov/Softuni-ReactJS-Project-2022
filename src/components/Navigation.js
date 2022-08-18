import { NavLink } from "react-router-dom"
import { useContext } from "react"
import styles from './Navigation.module.css'

import { AuthContext } from "../contexts/authContext"

const Navigation = () => {
    const { user } = useContext(AuthContext)

    const setNavStyle = ({ isActive }) => {
        return isActive
            ? styles['active-link']
            : undefined
    }

    return (
        <div className="nav-container">
            <ul className={styles["nav-bar-list"]}>
                <li><NavLink className={setNavStyle} to="/">Catalog</NavLink></li>
                {user.accessToken
                    ? <li><NavLink className={setNavStyle} to="/createproduct">Add Listing</NavLink></li>
                    : <li><NavLink className={setNavStyle} to="/login">Login</NavLink></li>
                }
            </ul>
        </div>

    )
}

export default Navigation