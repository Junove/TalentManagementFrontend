import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate, useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Universal/NavBar';
<<<<<<< HEAD

import JobDetails from './components/Jobs/JobDetails';
import CandidateDashboard from './screens/CandidateDashboard';
import ViewSingleApplication from './screens/Applications/ViewSingleApplication';
import JobApplication from './screens/Applications/JobApplication';
import EditProfile from './components/Manager/EditProfile.jsx';
import CandidateRegister from './components/Register/CandidateRegister';
import HiringManagerRegister from "./components/Register/HiringManagerRegister";
import ManagerDashboard from './components/Manager/ManagerDashboard';
import JobDetailView from './components/Manager/JobDetailView.jsx';
import IndividualApplicationGridItem from './components/Candidate/IndividualApplicationGridItem.jsx';
// Adjust the path as needed
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
