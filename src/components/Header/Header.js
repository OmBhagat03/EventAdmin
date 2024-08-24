import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    navigate('/calendar'); // Redirect to Calendar page after logout
  };

  // Check if the current route is either /admin-panel or /admin-login
  const isAdminPage = location.pathname === '/admin-panel' || location.pathname === '/admin-login';

  return (
    <header className="header">
      <div className="logo">EVENTCHAMP</div>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/speakers">Speakers</Link>
          </li>
          <li>
            <Link to="/venues">Venues</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
