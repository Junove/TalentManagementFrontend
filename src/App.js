
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {useNavigate, seState, useEffect} from "react";
import Search from './screens/Search';
import Login from './screens/Login';
import CreateJobPosting from './screens/Jobs/CreateJobPosting';
import EditJobPosting from './screens/Jobs/EditJobPosting';
import UserRegister from './components/Register/UserRegister.jsx';
import RoleSpecificRegister from './components/Register/RoleSpecificRegister';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Universal/NavBar';

import JobDetails from './components/Jobs/JobDetails';

import CandidateDashboard from './screens/CandidateDashboard';
import LoginComponent from './components/Login/LoginComponent';
import JobApplication from './screens/Jobs/JobApplication/JobApplication';

import CandidateRegister from './components/Register/CandidateRegister';
import HiringManagerRegister from "./components/Register/HiringManagerRegister";

function App() {
  return (
    <div className="container-fluid mb-5">
      <Router>
        <NavBar/>
        <div className="App">
          <LoginComponent/>
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/jobpost/:jid" element = {<JobDetails/>}></Route>
          <Route path="/apply" element={<JobApplication />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createJobPosting" element={<CreateJobPosting/>}/>
          <Route path='/editJobPosting' element={<EditJobPosting/>}/>
          <Route path='/register' element={<UserRegister />} />
          <Route path='/register/role' element={<RoleSpecificRegister />} />
          <Route path='/candidate/register' element={<CandidateRegister />} />
          <Route path='/manager/register' element={<HiringManagerRegister />} />
          <Route path='/candidateDashboard' element={<CandidateDashboard/>}></Route>
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App
