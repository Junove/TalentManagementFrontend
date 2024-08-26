import logo from './logo.svg';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {uuseNavigate, seState, useEffect} from "react";
import Search from './screens/Search';

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
