import React, { useState, useEffect } from 'react';
import JobList from '../components/JobList';
import api from '../api';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersRes = await api.get('/api/auth/users');
      setUsers(usersRes.data);
      const jobsRes = await api.get('/api/jobs');
      setJobs(jobsRes.data);
      const appsRes = await api.get('/api/applications');
      setApplications(appsRes.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteJob = async (id) => {
    await api.delete(`/api/jobs/${id}`);
    fetchData();
  };

  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '2rem', color: 'var(--primary-color)' }}>Admin Control Panel</h2>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button className={`btn ${activeTab === 'jobs' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('jobs')}>Manage Jobs</button>
        <button className={`btn ${activeTab === 'users' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('users')}>Manage Users</button>
        <button className={`btn ${activeTab === 'apps' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('apps')}>All Applications</button>
      </div>

      {activeTab === 'jobs' && (
        <JobList jobs={jobs} onDelete={handleDeleteJob} />
      )}

      {activeTab === 'users' && (
        <div className="job-grid">
          {users.map(u => (
            <div key={u.id} className="job-card">
              <h3>{u.name}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{u.email}</p>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ padding: '0.2rem 0.5rem', background: 'var(--bg-color)', borderRadius: '4px', fontSize: '0.8rem' }}>{u.role}</span>
                {u.companyName && <span style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>{u.companyName}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'apps' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
          {applications.map(app => (
            <div key={app.id} className="job-card">
              <h4 style={{ marginBottom: '0.5rem' }}>Applied for: <span style={{ color: 'var(--primary-color)' }}>{app.job?.title}</span></h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Applicant Name: {app.firstName} {app.lastName}</p>
              <div style={{ fontSize: '0.85rem', background: 'var(--bg-color)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <p style={{ margin: '0 0 0.5rem 0' }}><strong>Email:</strong> {app.email}</p>
                <p style={{ margin: '0 0 0.5rem 0' }}><strong>Target Degree:</strong> {app.degree} ({app.graduationYear})</p>
                <p style={{ margin: '0 0 0.5rem 0' }}><strong>Experience:</strong> {app.experienceYears}</p>
                <a href={app.resumeUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)', marginTop: '0.5rem', display: 'inline-block' }}>View Formal Resume</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
