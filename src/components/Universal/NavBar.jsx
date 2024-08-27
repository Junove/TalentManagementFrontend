import { Link } from 'react-router-dom';
import './NavBar.css'; 
import adplogo from './adplogo.png';


const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <Link to={'/'}>
                    <img src={adplogo} alt="Logo" width="80px" height="40px" />
                </Link>
                <Link to="/" className="navbar-brand" >
                    <strong className="ps-3">Talent Management</strong>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-3">
                        <li className="nav-item">
                            <Link to="/search" className="nav-link me-auto">
                                Search
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to="/home" className="nav-link">
                                About
                            </Link>
                        </li> */}
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
