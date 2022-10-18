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
                    <div className="homePageMenu">
                        <h1
                            onClick={(e)=>{
                            e.preventDefault()
                            this.setState({reDirectToDiaryHistory: true})
                        }}
                            className="menuItem1" id="menuItemText1">
                            Diary History
                        </h1>
                        <h1
                            onClick={(e)=> {
                                e.preventDefault()
                                this.setState({reDirectToSocialMediaAnalyser: true})
                            }}
                            className="menuItem2"
                            id="menuItemText2"
                        >
                            Social Media Activity Analyse
                        </h1>
                        <h1
                            onClick={(e)=> {
                                e.preventDefault()
                                this.setState({reDirectToTests: true})
                            }}
                            className="menuItem3" id="menuItemText3"
                        >
                            Tests
                        </h1>
                        <h1
                            onClick={(e)=> {
                                e.preventDefault()
                                this.setState({reDirectToAddMembers: true})
                            }}
                            className="menuItem4" id="menuItemText4"
                        >
                            Add Member Details / IDs
                        </h1>
                    </div>
                    <div className="logoutIconContainer">
                        <div className="logoutButton"  onClick={(e)=> {
                            e.preventDefault()
                            this.setState({reDirectToLogin: true})
                        }}>
                            <BiLogOutCircle className="logoutIcon"/>
                            {/*<h7 className="logoutText">Logout</h7>*/}
                        </div>
                    </div>

                </div>
            );
        }
    }
}

export default HomePage;