import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import JobList from './components/JobList';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import MyApplications from './pages/MyApplications';
import ApplyModal from './components/ApplyModal';
import { useAuth } from './AuthContext';

function App() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Apply Modal state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobs = async (search = '') => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/jobs${search ? `?search=${search}` : ''}`);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          {/* Main Landing Route - Merging Landing and Login */}
          <Route path="/" element={
            !user ? <Login /> :
            user.role === 'ADMIN' ? <Navigate to="/admin" /> :
            user.role === 'RECRUITER' ? <Navigate to="/recruiter" /> :
            <JobList jobs={jobs} onSearch={fetchJobs} loading={loading} onApply={handleApplyClick} />
          } />
          
          <Route path="/login" element={<Navigate to="/" />} />
          
          {/* Protected Routes */}
          <Route path="/admin" element={user?.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path="/recruiter" element={user?.role === 'RECRUITER' ? <RecruiterDashboard /> : <Navigate to="/" />} />
          <Route path="/applications" element={user?.role === 'EMPLOYEE' ? <MyApplications /> : <Navigate to="/" />} />
        </Routes>
      </div>
      
      {showApplyModal && user?.role === 'EMPLOYEE' && (
        <ApplyModal job={selectedJob} onClose={() => setShowApplyModal(false)} />
      )}
      {showApplyModal && (!user || user.role !== 'EMPLOYEE') && (
        <div className="form-container" style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%, -50%)', zIndex:1000}}>
           <h3>You must be logged in as an Employee to apply!</h3>
           <button className="btn btn-primary" onClick={() => setShowApplyModal(false)}>Close</button>
        </div>
      )}
    </Router>
  );
}

export default App;
