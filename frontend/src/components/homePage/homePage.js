import React, {Component} from 'react';
import './homePage.css'
import {Navigate} from "react-router-dom";
import {default as axios} from "axios";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekNumber: null,
            age: null,
            lungFunctionCapacity: null,
            gender: null,
            smokingStatus: null,
            reDirectToDiaryHistory: false,
            reDirectToLogin: false,
            reDirectToSocialMediaAnalyser: false,
            reDirectToTests: false,
            reDirectToAddMembers: false,
            predicted: true,
            predictedValue: null,
            images:null
        }
    }

    render() {
        if (this.state.reDirectToLogin) {
            return <Navigate to="/login"/>
        } else {
            return (
                <div className="homePageMain">
                    <h1 className="title">Welcome</h1>
                    {this.state.predicted ?
                        <div className="predictionBox">
                            <h3 className="prediction">
                                Forced Vital Capacity : {this.state.predictedValue}
                            </h3>
                        </div>
                        :
                        <div></div>
                    }
                    <div className="form">
                        <div className="inputComponent">
                            <h7 className="label">Please select 10 CT images which are needed
                                to predict FVC (Only select dicom images.)
                            </h7>
                            <input
                                id='fileUpload'
                                type='file'
                                multiple
                                onChange={(e)=>{
                                    console.log(e)
                                    this.setState({
                                        images:e.target.files
                                    })
                                }}
                                // accept='image/png'
                            />
                        </div>
                        <div className="inputRow">
                            <div className="inputComponent">
                                <h7 className="label">Week Number</h7>
                                <input
                                    className="loginFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            weekNumber: e.target.value
                                        })
                                    }
                                    value={this.state.weekNumber}
                                    type="number"
                                    placeholder="Week Number"
                                />
                            </div>
                            <div className="inputComponent">
                                <h7 className="label">Age</h7>
                                <input
                                    className="loginFormTextInput"
                                    onChange={(e) =>
                                        this.setState({
                                            age: e.target.value
                                        })
                                    }
                                    value={this.state.age}
                                    type="number"
                                    placeholder="Age"
                                />
                            </div>
                        </div>
                        <div className="inputComponent">
                            <h7 className="label">Lung Function Capacity</h7>
                            <input
                                className="loginFormTextInput"
                                onChange={(e) =>
                                    this.setState({
                                        lungFunctionCapacity: e.target.value
                                    })
                                }
                                value={this.state.lungFunctionCapacity}
                                type="number"
                                placeholder="Lung Function Capacity"
                            />
                        </div>
                        <div className="inputRow">
                            <div className="inputComponent">
                                <h7 className="label">Gender</h7>
                                <div className="checkButtons">
                                    <label className="checkButton">
                                        <input
                                            type="radio"
                                            value="Male"
                                            checked={this.state.gender === "Male"}
                                            onChange={(event) => {
                                                this.setState({
                                                    gender: event.target.value
                                                })
                                            }}
                                        />
                                        Male
                                    </label>
                                    <label className="checkButton">
                                        <input
                                            type="radio"
                                            value="Female"
                                            checked={this.state.gender === "Female"}
                                            onChange={(event) => {
                                                this.setState({
                                                    gender: event.target.value
                                                })
                                            }}
                                        />
                                        FeMale
                                    </label>
                                </div>
                            </div>
                            <div className="inputComponent">
                                <h7 className="label">Smoking Status</h7>
                                <div className="checkButtons">
                                    <label className="checkButton">
                                        <input
                                            type="radio"
                                            value="Currently Smoking"
                                            checked={this.state.smokingStatus === "Currently Smoking"}
                                            onChange={(event) => {
                                                this.setState({
                                                    smokingStatus: event.target.value
                                                })
                                            }}
                                        />
                                        Currently Smoking
                                    </label>
                                    <label className="checkButton">
                                        <input
                                            type="radio"
                                            value="Stopped Smoking"
                                            checked={this.state.smokingStatus === "Stopped Smoking"}
                                            onChange={(event) => {
                                                this.setState({
                                                    smokingStatus: event.target.value
                                                })
                                            }}
                                        />
                                        Stopped Smoking
                                    </label>
                                    <label className="checkButton">
                                        <input
                                            type="radio"
                                            value="Never Smoked"
                                            checked={this.state.smokingStatus === "Never Smoked"}
                                            onChange={(event) => {
                                                this.setState({
                                                    smokingStatus: event.target.value
                                                })
                                            }}
                                        />
                                        Never Smoked
                                    </label>
                                </div>
                            </div>
                        </div>
                        <input
                            type="button"
                            onClick={(event) => {
                                event.preventDefault()
                                if (this.state.weekNumber === "" &&
                                    this.state.age === "" &&
                                    this.state.lungFunctionCapacity === "" &&
                                    this.state.smokingStatus === "" &&
                                    this.state.gender === ""
                                ) {

                                } else {
                                    const formData = new FormData();
                                    formData.append('weekNumber', this.state.weekNumber)
                                    formData.append('age', this.state.age)
                                    formData.append('lungFunctionCapacity', this.state.lungFunctionCapacity)
                                    formData.append('smokingStatus', this.state.smokingStatus)
                                    formData.append('gender', this.state.gender)
                                    for(let i=0;i<10;i++){
                                        console.log(this.state.images[i].path)
                                        formData.append('image', this.state.images[i])
                                    }

                                    console.log("FORMDATA",formData)
                                    axios.post("http://localhost:3003/api/predictions/predict", formData)
                                        .then(response => {
                                            console.log(response.data)
                                            this.setState({predictedValue: response.data.Prediction})
                                        }).catch(err => {
                                        console.log("Error", err)
                                        this.setState({error: err})
                                    });
                                }
                                console.log(this.state)
                            }}
                            className=" loginbutton"
                            value="Predict FVC Value"
                        />
                        <input
                            type="button"
                            onClick={() => this.setState({reDirectToLogin: true})}
                            className="logoutbutton"
                            value="Logout"
                        />
                    </div>
                </div>
            );
        }
    }
}

export default HomePage;