import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🏥</span>
          <span className="logo-text">Smart Healthcare</span>
        </Link>

        <div className="navbar-menu">
          {!isAuthenticated ? (
            <>
              <Link to="/about" className="navbar-link">About</Link>
              <Link to="/contact" className="navbar-link">Contact</Link>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-btn">Register</Link>
            </>
          ) : (
            <>
              <Link to={`/${user?.role}/dashboard`} className="navbar-link">
                Dashboard
              </Link>
              {user?.role === 'patient' && (
                <>
                  <Link to="/patient/appointments" className="navbar-link">
                    Appointments
                  </Link>
                  <Link to="/patient/records" className="navbar-link">
                    Records
                  </Link>
                  <Link to="/patient/find-doctor" className="navbar-link">
                    Find Doctor
                  </Link>
                </>
              )}
              {user?.role === 'doctor' && (
                <>
                  <Link to="/doctor/schedule" className="navbar-link">
                    Schedule
                  </Link>
                  <Link to="/doctor/patients" className="navbar-link">
                    Patients
                  </Link>
                </>
              )}
              {user?.role === 'admin' && (
                <>
                  <Link to="/admin/users" className="navbar-link">
                    Users
                  </Link>
                  <Link to="/admin/verification" className="navbar-link">
                    Verification
                  </Link>
                </>
              )}
              <div className="navbar-user">
                <span className="navbar-username">{user?.name || user?.email}</span>
                <button onClick={handleLogout} className="navbar-logout">
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
