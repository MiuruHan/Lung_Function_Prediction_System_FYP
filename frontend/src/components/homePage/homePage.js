import React, {Component} from 'react';
import './homePage.css'
import {BiLogOutCircle} from "react-icons/bi";
import {Navigate} from "react-router-dom";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reDirectToDiaryHistory: false,
            reDirectToLogin: false,
            reDirectToSocialMediaAnalyser: false,
            reDirectToTests: false,
            reDirectToAddMembers: false,
        }
    }

    render() {
        if(this.state.reDirectToDiaryHistory){
            return <Navigate to="/testDiary"/>
        }else if(this.state.reDirectToTests){
            return <Navigate to="/sessionSelection"/>
        }else if(this.state.reDirectToAddMembers){
            return <Navigate to="/addNewMember"/>
        }else if(this.state.reDirectToSocialMediaAnalyser){
            return <Navigate to="/socialMedia"/>
        }else if(this.state.reDirectToLogin){
            return <Navigate to="/login"/>
        }else {
            return (
                <div className="homePageMain">
                    <h3>Welcome Chanuka Abeysinghe</h3>
                </div>
            );
        }
    }
}

export default HomePage;