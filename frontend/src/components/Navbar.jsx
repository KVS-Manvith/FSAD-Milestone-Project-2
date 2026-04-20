import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <div className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
          <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
          <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
        NexusJobs
      </div>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        
        {user && (
          <>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginRight: '1rem' }}>
              Welcome, <strong style={{ color: 'var(--primary-color)' }}>{user.name}</strong> ({user.role})
            </span>
            {user.role === 'ADMIN' && <Link to="/admin" className="btn btn-primary">Admin Dashboard</Link>}
            {user.role === 'RECRUITER' && <Link to="/recruiter" className="btn btn-primary">Manage Jobs</Link>}
            {user.role === 'EMPLOYEE' && <Link to="/applications" className="btn">My Applications</Link>}
            {user.role !== 'ADMIN' && user.role !== 'RECRUITER' && <Link to="/" className="btn">Browse Jobs</Link>}
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
