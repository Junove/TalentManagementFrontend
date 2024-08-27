import { useContext } from "react";
import { LoginContext } from './LoginContext';
import { Link, useNavigate, useLocation } from "react-router-dom"

function LoginComponent() {
  const { isLoggedIn, user, username, login, logout } = useContext(LoginContext);
  const location = useLocation();
  
  const navigate = useNavigate();

  function onLogoutClick() { 
    logout(); 
    navigate("/home");
  }

  return (
    <div>
      User: {(isLoggedIn) ? user.username : "guest"}    
      
      {(!isLoggedIn)
        ? <button onClick={() => navigate("/login")} >Login</button>
        : <button onClick={() => onLogoutClick()} >Logout</button>}
      
      {(!isLoggedIn)
        ? <button onClick={() => navigate("/register")} >Register</button>
        : "" }   
      
    </div>
  )
}

export default LoginComponent