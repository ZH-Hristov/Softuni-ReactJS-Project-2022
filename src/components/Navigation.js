import { NavLink } from "react-router-dom"
import { useContext } from "react"
import styles from './Navigation.module.css'

import { AuthContext } from "../contexts/authContext"
import { CartContext } from "../contexts/cartContext"

const Navigation = () => {
    const { user } = useContext(AuthContext)
    const { cartItems } = useContext(CartContext)

    const setNavStyle = ({ isActive }) => {
        return isActive
            ? `${styles['active-link']} ${styles.link}`
            : styles.link
    }

    return (
        <div className="nav-container">
            <ul className={styles["nav-bar-list"]}>
                {user.email && <li>Hello! {user.email}</li>}
                <li><NavLink className={setNavStyle} to="/">Catalog</NavLink></li>
                {user.accessToken
                    ? <>
                    <li><NavLink className={setNavStyle} to="/createproduct">Add Listing</NavLink></li>
                    <li><NavLink className={setNavStyle} to="/cart">My Cart {Object.keys(cartItems).length > 0 && `(${Object.keys(cartItems).length})`}</NavLink></li>
                    <li><NavLink className={setNavStyle} to="/logout">Logout</NavLink></li>
                    </>
                    : <li><NavLink className={setNavStyle} to="/login">Login</NavLink></li>
                }
            </ul>
        </div>

    )
}

export default Navigation