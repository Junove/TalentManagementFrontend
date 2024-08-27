import logo from './logo.svg';

import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {useNavigate, seState, useEffect} from "react";
import Search from './screens/Search';
import Login from './screens/Login';
import CreateJobPosting from './screens/Jobs/CreateJobPosting';
import EditJobPosting from './screens/Jobs/EditJobPosting';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/Universal/NavBar';
import CandidateDashboard from './screens/CandidateDashboard';
import LoginComponent from './components/Login/LoginComponent';
import ViewSingleApplication from './screens/Applications/ViewSingleApplication';

function App() {
  return (
    <div className = "container-fluid mb-5">
      
      <Router>
      <NavBar/>
      <div className="App">
        <LoginComponent/>
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createJobPosting" element={<CreateJobPosting/>}/>
          <Route path='/editJobPosting' element={<EditJobPosting/>}/>
          <Route path='/candidateDashboard' element={<CandidateDashboard/>}/>
          <Route path='/application/:applicationid' element={<ViewSingleApplication/>}/>
        </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
