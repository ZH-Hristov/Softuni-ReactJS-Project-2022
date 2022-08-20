import { useContext } from "react"
import { Link } from "react-router-dom"
import { login } from "../services/authService"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/authContext"

import styles from './LoginRegister.module.css'

const Login = () => {
    const { userLogin } = useContext(AuthContext)
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()

        const {
            email,
            password
        } = Object.fromEntries(new FormData(e.target))

        login(email, password)
            .then(authData => {
                if (!authData.code) {
                    userLogin(authData)
                    navigate('/')
                } else {
                    window.alert(authData.message)
                }
            })
    }


    return (
        <>
            <h1>Login</h1>

            <div className={styles.container}>
                <form className={styles.form} id="login" onSubmit={onSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="YourEmail@gmail.com"
                    />
                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" />
                    <input className={styles.button} type="submit" value="Login" />
                    <p className="field">
                        <span className={styles.haveaccount}>
                            If you do not have an account, click <Link className={styles.redirect} to="/register">here.</Link>
                        </span>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Login