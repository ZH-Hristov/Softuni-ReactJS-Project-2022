import { Link } from "react-router-dom"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import * as authService from '../services/authService'
import { AuthContext } from "../contexts/authContext"

import styles from './LoginRegister.module.css'

const Register = () => {

    const { userLogin } = useContext(AuthContext)
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const email = formData.get("email")
        const password = formData.get("password")
        const confirmPassword = formData.get("confirm-password")

        if (password !== confirmPassword) {
            return
        }

        authService.register(email, password)
            .then(authData => {
                userLogin(authData)
                navigate('/')
            })
    }


    return (
        <>
            <h1>Register</h1>

            <div className={styles.container}>
                <form className={styles.form} id="register" onSubmit={onSubmit}>
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
                    <input className={styles.button} type="submit" value="Register" />
                    <p className="field">
                        <span className={styles.haveaccount}>
                            If you already have an account, click <Link className={styles.redirect} to="/login">here</Link>.
                        </span>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Register