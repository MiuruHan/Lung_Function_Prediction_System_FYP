import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

import SessionPage from "./components/sessionPage/sessionPage";
import LoginPage from "./components/loginPage/loginPage";

function App() {
  const [user, setUser] = useState({name: "", email: "", token: "", id: "", role: ""});
  const [error, setError] = useState("");
  const [logorcreate, setLogorCreate] = useState(false);

  const Login = (data) => {
    setUser({
      name: data.employee.name,
      email: data.employee.email,
      token: data.token,
      id: data.employee.id,
      role: data.employee.role,
      profileImage: data.employee.profileImage
    });
  };


  return (
      <LoginPage/>
  );
}

export default App;
