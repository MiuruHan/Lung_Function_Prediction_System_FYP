import React, {Component} from 'react';
import './sessionSelectionPage.css'
import {Navigate} from "react-router-dom";
import {FaHome} from "react-icons/fa";

const axios = require('axios').default;

class SessionSelectionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reDirectToHome: false,
            reDirectToSession: false,
            sessions: [],
            selectedSessions:[]
        }
    }

    async componentDidMount() {
        axios.post("http://localhost:3003/api/sessionAnswers/getSessionsOfUser",{userId:"626fd77ce05e0d36169aaf4d"})
            .then(response => {
                const sessions = response.data.SessionsOfUser

                let newSessions = []
                for (let i = 0; i < sessions.length; i++) {
                    newSessions.push(sessions[i])

                }
                this.setState({
                    sessions: sessions,
                    selectedSessions:sessions
                }, () => {
                    console.log("Sessions", this.state.sessions)
                })
            })
    }

    render() {
        const selectedSessions = this.state.selectedSessions;
        if (this.state.reDirectToHome) {
            return <Navigate to="/home"/>
        } else if (this.state.reDirectToSession) {
            return <Navigate to="/session"/>
        } else if (this.state.reDirectToAddMembers) {
            return <Navigate to="/addNewMember"/>
        } else if (this.state.reDirectToSocialMediaAnalyser) {
            return <Navigate to="/socialMedia"/>
        } else if (this.state.reDirectToLogin) {
            return <Navigate to="/login"/>
        } else {
            return (
                <div className="sessionSelectionMain">
                    <div className="sessionSelectionMenu">
                            {(selectedSessions.length>0 ?
                                    selectedSessions.map((selectedSession,index)=>{
                                        let name =""
                                        if(index%5==0){name="name1"}
                                        else if(index%5==1){name="name2"}
                                        else if(index%5==2){name="name3"}
                                        else if(index%5==3){name="name4"}
                                        else if(index%5==4){name="name5"}
                                        return(
                                            <div className="sessionSelectionMenuItem" id={name}
                                                onClick={(e)=>{
                                                    e.preventDefault()
                                                    if(selectedSession.Status==="Available"){
                                                        localStorage.setItem(
                                                            'SelectedSession', JSON.stringify(selectedSession))
                                                        this.setState({reDirectToSession : true})
                                                    }
                                                }}
                                            >
                                                <h5 className="sessionSelectionSessionName" >
                                                    {selectedSession.Session.sessionName}
                                                </h5>
                                                <h5
                                                    className="sessionSelectionSessionStatus"
                                                    id={selectedSession.Status}
                                                >
                                                    {selectedSession.Status}
                                                </h5>
                                            </div>
                                        )
                                    })
                                    : null
                            )}
                    </div>
                    <div className="sideNavBar">
                        <div className="sessionSelection_answers_go_home" onClick={(e) => {
                            e.preventDefault()
                            this.setState({reDirectToHome: true})
                        }}
                        >
                            <h7>Home</h7>
                            <FaHome className="sessionSelection_page_home_icon"/>
                        </div>
                        <div className="statusButtons">
                            <h5 className="completedText" onClick={(e)=>{
                                let newSessions = []
                                let allSessions = this.state.sessions
                                for (let i = 0; i < allSessions.length; i++) {
                                    if(allSessions[i].Status==="Completed"){
                                        newSessions.push(allSessions[i])
                                    }
                                }
                                this.setState({
                                    selectedSessions:newSessions
                                },()=>console.log(this.state.selectedSessions))
                            }}>Completed</h5>
                            <h5 className="availableText" onClick={(e)=>{
                                let allSessions = this.state.sessions
                                let newSessions = []
                                for (let i = 0; i < allSessions.length; i++) {
                                    if(allSessions[i].Status==="Available"){
                                        newSessions.push(allSessions[i])
                                    }
                                }
                                this.setState({
                                    selectedSessions:newSessions
                                },()=>console.log(this.state.selectedSessions))
                            }}>Available</h5>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default SessionSelectionPage;