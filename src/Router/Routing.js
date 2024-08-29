import { Route, Routes } from 'react-router-dom'

import React from 'react'

import ProfileWrapper from '../components/Universal/ProfileWrapper.jsx';
import JobDetails from '../components/Jobs/JobDetails';
import CandidateDashboard from '../screens/CandidateDashboard';
import ViewSingleApplication from '../screens/Applications/ViewSingleApplication';

import AdminDashboard from '../screens/AdminDashboard';
import AdminManagement from '../screens/Admin/AdminManagement';
import CandidateManagement from '../screens/Admin/CandidateManagement';
import HiringManagerment from '../screens/Admin/HiringManagerment';
import JobApplicationManagement from '../screens/Admin/JobApplicationManagement';
import JobListingManagement from '../screens/Admin/JobListingManagement';
import UserManagement from '../screens/Admin/UserManagement';
import JobApplication from '../screens/Applications/JobApplication';
import CandidateRegister from '../components/Register/CandidateRegister';
import HiringManagerRegister from "../components/Register/HiringManagerRegister";
import ManagerDashboard from '../components/Manager/ManagerDashboard';
import JobDetailView from '../components/Manager/JobDetailView.jsx';
import PageNotFound from '../screens/PageNotFound';
import Search from '../screens/Search';
import Login from '../screens/Login';
import CreateJobPosting from '../screens/Jobs/CreateJobPosting';
import EditJobPosting from '../screens/Jobs/EditJobPosting';
import UserRegister from '../components/Register/UserRegister.jsx';
import EditApplication from './components/Candidate/EditApplication.jsx';
import { Navigate } from 'react-router-dom';

const Routing = (props) => {
    const {
        userType
    } = props;

    if (userType === 'admin'){
        return (
            <Routes>
                <Route exact path="/" element={<Navigate to="/admin" />}/>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/administrator" element={<AdminManagement />} />
                <Route path="/admin/candidates" element={<CandidateManagement />} />
                <Route path="/admin/hiringManagers" element={<HiringManagerment />} />
                <Route path="/admin/jobApplications" element={<JobApplicationManagement />} />
                <Route path="/admin/jobListings" element={<JobListingManagement />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path='/error' element={<PageNotFound/>}/>
                <Route path="*" element={<Navigate to="/error" />}/>
            </Routes>
        )
    }

    if (userType === 'candidate'){
        return (
            <Routes>
                <Route exact path="/" element={<Navigate to="/candidateDashboard" />}/>
                <Route path="/profile" element={<ProfileWrapper />} />
                <Route path="/search" element={<Search />} />
                <Route path="/jobpost/:jid" element = {<JobDetails/>}/>
                <Route path="/apply/:jid" element={<JobApplication />} />
                <Route path='/candidateDashboard' element={<CandidateDashboard/>}/>
                <Route path='/candidateDashboard/:id' element={<CandidateDashboard/>}/>
                <Route path='/application/:applicationid' element={<ViewSingleApplication/>}/>
                <Route path="/application/:jobAppId/edit" element={<EditApplication />} />
                <Route path='/error' element={<PageNotFound/>}/>
                <Route path="*" element={<Navigate to="/error" />}/>
            </Routes>
        )
    }

    if (userType === 'hiring_manager'){
        return (
            <Routes>
                <Route exact path="/" element={<Navigate to="/managerDashboard" />}/>
                <Route path="/profile" element={<ProfileWrapper />} />
                <Route path="/createJobPosting" element={<CreateJobPosting/>}/>
                <Route path='/editJobPosting/:jobid' element={<EditJobPosting/>}/>
                <Route path='/managerDashboard/:id' element={<ManagerDashboard />} />
                <Route path='/managerDashboard' element={<ManagerDashboard />} />
                <Route path="/job/:jobId" element={<JobDetailView/>} />
                <Route path='/error' element={<PageNotFound/>}/>
                <Route path="*" element={<Navigate to="/error" />}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route exact path="/" element={<Navigate to="/search" />}/>
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path='/register' element={<UserRegister />} />
            <Route path='/candidate/register' element={<CandidateRegister />} />
            <Route path='/manager/register' element={<HiringManagerRegister />} />  
            <Route path="/jobpost/:jid" element = {<JobDetails/>}/>
            <Route path='/error' element={<PageNotFound/>}/>
            <Route path="*" element={<Navigate to="/error" />}/>
        </Routes>
    )
}

export default Routing