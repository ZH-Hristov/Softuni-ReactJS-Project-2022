import { Link } from "react-router-dom"

const Register = () => {
    return (
        <div className="register-container">
            <h1>Register</h1>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="YourEmail@gmail.com"
            />
            <label htmlFor="pass">Password:</label>
            <input type="password" id="register-password" name="password" />
            <label htmlFor="con-pass">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password" />
            <input type="submit" className="btn submit" value="Register" />
            <p className="field">
                <span>
                    If you already have an account, click <Link to="/login">here</Link>.
                </span>
            </p>
        </div>
    )
}

export default Register