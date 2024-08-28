import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from 'react';
import { LoginContext } from '../components/Login/LoginContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function Login() {
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const REST_URL = "http://localhost:8080/login";
      const credentials = { "username": usernameInput, "password": password };
      const response = await axios.post(REST_URL, credentials);

      if(response.status === 200){
        const user = response.data;
        login(user);
        let dashboardUrl = '/'; // Default or fallback route
        if (user.type === 'hiring_manager') {
          dashboardUrl = `/managerdashboard/${user.id}`;
        } else if (user.type === 'candidate') {
          dashboardUrl = `/candidatedashboard/${user.id}`;
        } else if (user.type === 'admin') {
          dashboardUrl = `/admindashboard/${user.id}`;
        }
    
        navigate(dashboardUrl);
      }
    
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="usernameInput" className="form-label">Username</label>
                  <input
                    type="text"
                    id="usernameInput"
                    className="form-control"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-dark override-blue w-100">Login</button>
                {error && <p className="text-danger mt-3">{error}</p>}
              </form>
            </div>
            <div className="card-footer text-center">
              <Link to="/register">Don't have an account? Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
