import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate, seState, useEffect } from "react";
import Search from './screens/Search';
import Login from './screens/Login';
import CreateJobPosting from './screens/Jobs/CreateJobPosting';
import EditJobPosting from './screens/Jobs/EditJobPosting';
import UserRegister from './components/Register/UserRegister.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Universal/NavBar';

import JobDetails from './components/Jobs/JobDetails';
import CandidateDashboard from './screens/CandidateDashboard';
import ViewSingleApplication from './screens/Applications/ViewSingleApplication';
import JobApplication from './screens/Jobs/JobApplication/JobApplication';
import EditProfile from './components/Manager/EditProfile.jsx';
import CandidateRegister from './components/Register/CandidateRegister';
import HiringManagerRegister from "./components/Register/HiringManagerRegister";
import ManagerDashboard from './components/Manager/ManagerDashboard';
import JobDetailView from './components/Manager/JobDetailView.jsx';

function App() {
  return (
    <div className="container-fluid mb-5">
      <Router>
        <NavBar />
        <div className="App">
                   
          <Routes>
            <Route path="/search" element={<Search />} />
            <Route path="/jobpost/:jid" element = {<JobDetails/>}></Route>
            <Route path="/apply" element={<JobApplication />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createJobPosting" element={<CreateJobPosting/>}/>
            <Route path='/editJobPosting/:jobid' element={<EditJobPosting/>}/>
            <Route path='/candidateDashboard' element={<CandidateDashboard/>}/>
            <Route path='/application/:applicationid' element={<ViewSingleApplication/>}/>
            <Route path='/register' element={<UserRegister />} />
            <Route path='/candidate/register' element={<CandidateRegister />} />
            <Route path='/manager/register' element={<HiringManagerRegister />} />  
            <Route path='/managerDashboard/:id' element={<ManagerDashboard />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path='/managerDashboard' element={<ManagerDashboard />} />
            <Route path="/job/:jobId" element={<JobDetailView/>} />
       

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
