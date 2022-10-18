import React, {Component} from 'react';
import {Navigate} from "react-router-dom";
import './loginPage.css'
const axios = require('axios').default;

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDetails: {
                email: "",
                password: ""
            },
            reDirectToHomePage: false,
            error: '',
            isAdmin: false
        }
    }

    login = (event) => {
        event.preventDefault();
        if (this.state.loginDetails.email === "" || this.state.loginDetails.password === "") {
            this.setState({error: "Please Fill all Required Fields"})
        } else {
            if (this.state.isAdmin) {
                axios.post("http://localhost:3003/api/users/login", {
                    email: this.state.loginDetails.email,
                    password: this.state.loginDetails.password
                }).then(response => {
                    const status = response.data.Status
                    const message = response.data.Message
                    if (status === "Successful") {
                        const data = response.data.User;
                        console.log(data)
                        localStorage.setItem('user', JSON.stringify(data))
                        this.setState({reDirectToHomePage: true})
                    } else {
                        this.setState({error: message})
                    }
                }).catch(err => {
                    console.log(err)
                    this.setState({error: err})
                });
            } else {
                axios.post("http://localhost:3003/api/users/login", {
                    email: this.state.loginDetails.email,
                    password: this.state.loginDetails.password
                }).then(response => {
                    const status = response.data.Status
                    const message = response.data.Message
                    if (status === "Successful") {
                        const data = response.data.User;
                        console.log(data)
                        localStorage.setItem('user', JSON.stringify(data))
                        this.setState({reDirectToHomePage: true})
                    } else {
                        this.setState({error: message})
                    }
                }).catch(err => {
                    console.log(err)
                    this.setState({error: err})
                });
            }
        }
    }


    render() {
        if (this.state.reDirectToHomePage) {
            return <Navigate to="/home"/>
        }else {
            return (
                <div className="pos">
                    <div className="loginform">
                        <form className="subLoginForm" onSubmit={this.login}>
                            <h1 className="loginformTitle">WELCOME</h1>
                            <h6 className="loginformDesc">Depression System</h6>
                            <div className="loginError">{this.state.error}</div>
                            <div className="form-group loginformtextbox ">
                                <input
                                    className="loginFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            loginDetails: {
                                                ...this.state.loginDetails,
                                                email: e.target.value
                                            }
                                        })
                                    }
                                    value={this.state.loginDetails.email}
                                    type="text"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="form-group loginformtextbox">
                                <input
                                    className="loginFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            loginDetails: {
                                                ...this.state.loginDetails,
                                                password: e.target.value
                                            }
                                        })
                                    }
                                    value={this.state.loginDetails.password}
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="adminCheckBoxContainer">
                                <input className="adminCheckBox" type="checkbox" id="inlineCheckbox2"
                                       checked={this.state.isAdmin}
                                       onChange={(e) => {
                                           this.setState({isAdmin: !this.state.isAdmin})
                                       }}
                                />
                                <label className="adminCheckBoxLabel">I am an admin.</label>
                            </div>
                            <div className="loginformtextbox">
                                <input
                                    type="submit"
                                    className=" loginbutton"
                                    value="Login"
                                />
                            </div>
                            {/*<input*/}
                            {/*    type="button"*/}
                            {/*    onClick={() => this.setState({reDirectToRegistration: true})}*/}
                            {/*    className="gotoRegisterButton"*/}
                            {/*    value="Do not have an account? Register here"*/}
                            {/*/>*/}
                            {/*<input*/}
                            {/*    type="button"*/}
                            {/*    onClick={() => this.setState({reDirectVerifyEmail: true})}*/}
                            {/*    className="gotoRegisterButton"*/}
                            {/*    value="Already registered but email is not verified still? Click here."*/}
                            {/*/>*/}
                        </form>

                    </div>
                </div>
            );
        }
    }
}

export default LoginPage;