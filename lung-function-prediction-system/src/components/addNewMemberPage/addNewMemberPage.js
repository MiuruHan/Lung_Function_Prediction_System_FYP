import React, {Component} from 'react';
import {default as axios} from "axios";
import {Navigate} from "react-router-dom";
import {FaHome} from "react-icons/fa";
import './addNewMemberPage.css'

class AddNewMemberPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDetails: {
                email: "",
                password: "",
                fullName:"",
                address:"",
                contactNo:"",
                confirmPassword:""
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
            if(this.state.loginDetails.password===this.state.loginDetails.confirmPassword){
                axios.post("http://localhost:3003/api/users/addUser", {
                    email: this.state.loginDetails.email,
                    password: this.state.loginDetails.password,
                    fullName:this.state.loginDetails.fullName,
                    address:this.state.loginDetails.address,
                    contactNo:this.state.loginDetails.contactNo
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
            }else{
                this.setState({error: "Passwords are not matching"})
            }
        }
    }

    render() {
        if (this.state.reDirectToHomePage) {
            return <Navigate to="/home"/>
        }else {
            return (
                <div className="pos">
                    <div className="addNewMemberForm">
                        <div className="addNewMembers_answers_go_home"
                            onClick={(e)=>{
                                e.preventDefault()
                                this.setState({
                                    reDirectToHomePage:true
                                })
                            }}
                        >
                            <FaHome className="addNewMembers_page_home_icon"/>
                            <h7>Home</h7>
                        </div>
                        <form className="subAddMembersForm" onSubmit={this.login}>
                            <h1 className="addMembersformTitle">ADD NEW MEMBERS</h1>
                            <h6 className="addMembersformDesc">Depression System</h6>
                            <div className="loginError">{this.state.error}</div>
                            <div className="form-group loginformtextbox ">
                                <input
                                    className="loginFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            loginDetails: {
                                                ...this.state.loginDetails,
                                                fullName: e.target.value
                                            }
                                        })
                                    }
                                    value={this.state.loginDetails.fullName}
                                    type="text"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className="form-group loginformtextbox ">
                                <input
                                    className="loginFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            loginDetails: {
                                                ...this.state.loginDetails,
                                                contactNo: e.target.value
                                            }
                                        })
                                    }
                                    value={this.state.loginDetails.contactNo}
                                    type="text"
                                    placeholder="Contact No"
                                />
                            </div>
                            <div className="form-group loginformtextbox ">
                                <input
                                    className="loginFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            loginDetails: {
                                                ...this.state.loginDetails,
                                                address: e.target.value
                                            }
                                        })
                                    }
                                    value={this.state.loginDetails.address}
                                    type="text"
                                    placeholder="Address"
                                />
                            </div>
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
                            <div className="form-group loginformtextbox">
                                <input
                                    className="loginFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            loginDetails: {
                                                ...this.state.loginDetails,
                                                confirmPassword: e.target.value
                                            }
                                        })
                                    }
                                    value={this.state.loginDetails.confirmPassword}
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </div>
                            <div className="loginformtextbox">
                                <input
                                    type="submit"
                                    className=" loginbutton"
                                    value="Add New Member"
                                />
                            </div>
                        </form>

                    </div>
                </div>
            );
        }
    }
}

export default AddNewMemberPage;