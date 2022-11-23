import React, { useEffect, useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom';
import { getRequest, LINK_GET_USER_BY_USERNAME, login } from '../requests';
import jwt_decode from "jwt-decode";
import { requestHandler } from '../handlers';
import Alert from '../common/Alert';

const Login = ({ setTokens, setUserType, setLoggedUser }) => {

    const navigate = useNavigate();
    setUserType("")
    setTokens("")
    setLoggedUser("")

    const [showAlert, setShowAlert] = useState(false)
    const [requestStatus, setRequestStatus] = useState("")

    useEffect(() => {
        const current_url = window.location.href
        if (current_url.endsWith("session_expired")) {
            setShowAlert(true)
        }
    }, [showAlert])

    async function check_input() {
        const username = document.getElementById("username-input-field").value
        const password = document.getElementById("password-input-field").value
        let response
        try {
            response = await login(username, password)
        } catch (exception) {
            setRequestStatus("danger")
            return
        }
        const access_token = response.access_token
        const refresh_token = response.refresh_token
        const username_1 = response.username
        localStorage.setItem("access_token", access_token)
        localStorage.setItem("refresh_token", refresh_token)
        localStorage.setItem("username", username)

        const userUsername = response.username
        try {
            const user = await requestHandler(getRequest, {
                link: LINK_GET_USER_BY_USERNAME + userUsername,
                payload: {}
            })
            setLoggedUser(user)
            setRequestStatus("success")

            setTokens([access_token, refresh_token])
            const decoded = jwt_decode(access_token)
            const roles = decoded.roles
            const role = roles[0]
            localStorage.setItem("role", role)
            navigate(`/${role}`)
        } catch (exception) {
            setRequestStatus("danger")
        }

    }

    function loginOnEnterPressed(e) {
        if (e.code === "Enter") {
            check_input()
        }
    }

    return (
        <>
            <div id="login-page">
                {
                    showAlert && (<div className="alert alert-danger alert-dismissible">
                        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                        <strong>Attention!</strong> Your session has expired, log in again to continue
                    </div>)
                }
                <div className="container" >
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
            {
                requestStatus !== "" &&
                (
                    < Alert type={requestStatus}
                        message={requestStatus === "success" ? "Credentials correct, logging in..." : "Incorrect username and/or password!"}
                        setRequestStatus={setRequestStatus} />
                )
            }
        </>

    )
}

export default Login