import { Link } from "react-router-dom"

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Catalog</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation