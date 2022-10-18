import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {render} from "react-dom";
import {BrowserRouter,Routes, Route,} from "react-router-dom";
import AddNewMemberPage from "./components/addNewMemberPage/addNewMemberPage";
import HomePage from "./components/homePage/homePage";
import LoginPage from "./components/loginPage/loginPage";
import SessionPage from "./components/sessionPage/sessionPage";
import SessionSelectionPage from "./components/sessionSelectionPage/sessionSelectionPage";
import SocialMediaDiaryPage from "./components/socialMediaDiaryPage/socialMediaDiaryPage";
import SocialMediaPage from "./components/socialMediaPage/socialMediaPage";
import TestDiaryPage from "./components/testDiaryPage/testDiaryPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/addNewMember" element={<AddNewMemberPage/>} />
            <Route path="/home" element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/session" element={<SessionPage/>} />
            <Route path="/sessionSelection" element={<SessionSelectionPage/>} />
            <Route path="/socialMediaDiary" element={<SocialMediaDiaryPage/>} />
            <Route path="/socialMedia" element={<SocialMediaPage/>} />
            <Route path="/testDiary" element={<TestDiaryPage/>} />
        </Routes>
    </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
