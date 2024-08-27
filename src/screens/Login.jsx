import { Link, useNavigate } from "react-router-dom"
import React, { useState, useContext } from 'react';
import { LoginContext } from '../components/Login/LoginContext';
import axios from 'axios';


export default function LoginPage() {
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { isLoggedIn, user, username, login, logout } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let fullUrl = "http://localhost:8080/login";
      let credentials = { "username": usernameInput, "password": password }
      const response = await axios.post(fullUrl, credentials);
      if(response.status == 200){
        let user = response.data;
        login(user);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }


  };

  return (<>
    <form onSubmit={handleSubmit}>
      <label htmlFor="usernameInput">Username:</label>
      <input
        type="text"
        id="usernameInput"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Login</button>
      {error && <p className="error">{error}</p>}
    </form>
  </>
  );

}