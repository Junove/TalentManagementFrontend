import logo from './logo.svg';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {useNavigate, seState, useEffect} from "react";
import Search from './screens/Search';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path="/search" element={<Search />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
