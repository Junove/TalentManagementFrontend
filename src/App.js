import logo from './logo.svg';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {useNavigate, seState, useEffect} from "react";
import Search from './screens/Search';
import CreateJobPosting from './screens/Manager/CreateJobPosting';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/createJobPosting" element={<CreateJobPosting/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
