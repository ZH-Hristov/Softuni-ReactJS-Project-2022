import { NavLink } from "react-router-dom"
import styles from './Navigation.module.css'

const Navigation = () => {
    const setNavStyle = ({isActive}) => {
        return isActive
            ? styles['active-link']
            : undefined
    }

    return (
        <nav>
            <ul>
                <li><NavLink className={setNavStyle} to="/">Catalog</NavLink></li>
                <li><NavLink className={setNavStyle} to="/createproduct">Add Listing</NavLink></li>
                <li><NavLink className={setNavStyle} to="/login">Login</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navigation