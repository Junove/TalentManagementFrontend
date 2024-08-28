import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate, useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Universal/NavBar';
import Routing from './Router/Routing';
import { LoginContext } from './components/Login/LoginContext';

function App() {
  const { user } = useContext(LoginContext)


  return (
    <div className="container-fluid mb-5">
      <Router>
        <NavBar />
        <div className="App">
            <Routing userType={user.type}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
