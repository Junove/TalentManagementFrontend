import { useContext } from "react";
import { LoginContext } from './LoginContext';
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function LoginComponent() {
  const { isLoggedIn, user, logout } = useContext(LoginContext);
  const navigate = useNavigate();

  const onLogoutClick = () => {
    logout();
    navigate("/home");
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-end align-items-center mt-3">
        <div className="d-flex align-items-center">
          <span className="me-3">
            User: {isLoggedIn ? user.username : "Guest"}
          </span>

          {!isLoggedIn ? (
            <>
              <button 
                className="btn btn-primary me-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <button 
              className="btn btn-danger"
              onClick={onLogoutClick}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
