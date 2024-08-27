import logo from './logo.svg';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {useNavigate, seState, useEffect} from "react";
import Search from './screens/Search';
import CreateJobPosting from './screens/Jobs/CreateJobPosting';
import EditJobPosting from './screens/Jobs/EditJobPosting';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/Universal/NavBar';

import AdminDashboard from './screens/AdminDashboard';
import AdminManagement from './screens/Admin/AdminManagement';
import CandidateManagement from './screens/Admin/CandidateManagement';
import HiringManagerment from './screens/Admin/HiringManagerment';
import JobApplicationManagement from './screens/Admin/JobApplicationManagement';
import JobListingManagement from './screens/Admin/JobListingManagement';
import UserManagement from './screens/Admin/UserManagement';

function App() {
  return (
    <div className = "container-fluid mb-5">
      
      <Router>
      <NavBar/>
      <div className="App">
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/createJobPosting" element={<CreateJobPosting/>}/>
          <Route path='/editJobPosting' element={<EditJobPosting/>}/>
          
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/administrator" element={<AdminManagement />} />
          <Route path="/admin/candidates" element={<CandidateManagement />} />
          <Route path="/admin/hiringManagers" element={<HiringManagerment />} />
          <Route path="/admin/jobApplications" element={<JobApplicationManagement />} />
          <Route path="/admin/jobListings" element={<JobListingManagement />} />
          <Route path="/admin/users" element={<UserManagement />} />

        </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
