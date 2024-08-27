import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './screens/Search';
import CreateJobPosting from './screens/Jobs/CreateJobPosting';
import EditJobPosting from './screens/Jobs/EditJobPosting';
import UserRegister from './components/Register/UserRegister.jsx';
import RoleSpecificRegister from './components/Register/RoleSpecificRegister';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Universal/NavBar';
import CandidateRegister from './components/Register/CandidateRegister';

function App() {
  return (
    <div className="container-fluid mb-5">
      <Router>
        <NavBar/>
        <div className="App">
          <Routes>
            <Route path="/search" element={<Search />} />
            <Route path="/createJobPosting" element={<CreateJobPosting/>}/>
            <Route path='/editJobPosting' element={<EditJobPosting/>}/>
            <Route path='/register' element={<UserRegister />} />
            <Route path='/register/role' element={<RoleSpecificRegister />} />
            <Route path='/candidate/register' element={<CandidateRegister />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
