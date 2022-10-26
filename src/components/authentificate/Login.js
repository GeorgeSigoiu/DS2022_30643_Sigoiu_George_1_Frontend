import React from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom';
import { login } from '../requests';
import jwt_decode from "jwt-decode";

const Login = ({ setTokens, setUserType }) => {

    const navigate = useNavigate();
    setUserType("")
    setTokens("")

    async function check_input() {
        console.log("check input")
        const username = document.getElementById("username-input-field").value
        const password = document.getElementById("password-input-field").value
        const response = await login(username, password)
        const access_token = response.access_token
        const refresh_token = response.refresh_token

        setTokens([access_token, refresh_token])
        const decoded = jwt_decode(access_token)
        const roles = decoded.roles
        const role = roles[0]
        navigate(`/${role}`)
    }

    function loginOnEnterPressed(e) {
        if (e.code === "Enter") {
            check_input()
        }
    }

    return (
        <div id="login-page">
            <div className="container">
                <div className="screen">
                    <div className="screen__content">
                        <div className="login">
                            <div className="login__field">
                                <i className="login__icon fas fa-user"></i>
                                <input type="text" id="username-input-field" className="login__input" placeholder="User name" />
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input type="password" id="password-input-field" className="login__input" placeholder="Password" onKeyDown={e => loginOnEnterPressed(e)} />
                            </div>
                            <button className="button login__submit" onClick={check_input}>
                                <span className="button__text">Log In Now</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login