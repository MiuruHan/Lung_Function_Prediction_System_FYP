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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/addNewMember" element={<AddNewMemberPage/>} />
            <Route path="/home" element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>} />
        </Routes>
    </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
