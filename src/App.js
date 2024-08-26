
import Login from './screens/Login';
import LoginComponent from './components/Login/LoginComponent';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <LoginComponent />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
