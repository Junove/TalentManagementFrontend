import logo from './logo.svg';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {useNavigate, seState, useEffect} from "react";
import Search from './screens/Search';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/Universal/NavBar';
import JobDetails from './components/Jobs/JobDetails';

function App() {
  return (
    <div className = "container-fluid mb-5">
      
      <Router>
      <NavBar/>
      <div className="App">
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/jobpost/:jid" element = {<JobDetails/>}></Route>
        </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
