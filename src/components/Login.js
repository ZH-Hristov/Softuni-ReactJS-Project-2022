import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className="login-container">
            <h1>Login</h1>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="YourEmail@gmail.com"
            />
            <label htmlFor="login-pass">Password:</label>
            <input type="password" id="login-password" name="password" />
            <input type="submit" className="btn submit" defaultValue="Login" />
            <p className="field">
                <span>
                    If you do not have an account, click <Link to="/register">here</Link>.
                </span>
            </p>
        </div>
    )
}

export default Login