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
  

  function hideForLoginAndRegister() {
    let pathname = (location.pathname === "/")?"/home":location.pathname;
    const page = pathname.split('/')[1];
    if(page.toLowerCase() === "login" || page.toLowerCase() === "register"){
      return "hidden"
    }else{
      return "";
    }
  }

  return (
    <div className={"login " + hideForLoginAndRegister()} >
      User: {(isLoggedIn) ? user.username : "guest"}
      &nbsp;
      {(!isLoggedIn)
        ? <button onClick={() => navigate("/login")} >Login</button>
        : <button onClick={() => onLogoutClick()} >Logout</button>}
      &nbsp;
      {(!isLoggedIn)
        ? <button onClick={() => navigate("/register")} >Register</button>
        : "" }   
      
    </div>
  )
}

export default LoginComponent