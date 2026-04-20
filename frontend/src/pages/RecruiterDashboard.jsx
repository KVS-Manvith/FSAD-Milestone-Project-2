import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import JobList from '../components/JobList';
import JobForm from '../components/JobForm';
import api from '../api';

function RecruiterDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('my-jobs'); // 'my-jobs', 'post', 'view-apps'
  const [selectedJob, setSelectedJob] = useState(null);
  
  const [myJobs, setMyJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [appCountsMap, setAppCountsMap] = useState({});

  useEffect(() => {
    fetchMyJobs();
  }, [user]);

  const fetchMyJobs = async () => {
    try {
      const res = await api.get(`/api/jobs?recruiterId=${user.id}`);
      setMyJobs(res.data);
    } catch(e) {}
  };

  const fetchAllApplicationsForMyJobs = async () => {
    try {
      if (!myJobs.length) return;
      let allApps = [];
      let countsMap = {};
      
      for (const job of myJobs) {
        const res = await api.get(`/api/applications/job/${job.id}`);
        allApps = [...allApps, ...res.data];
        countsMap[job.id] = res.data.length;
      }
      setApplications(allApps);
      setAppCountsMap(countsMap);
    } catch(e) {}
  };

  useEffect(() => { if (myJobs.length > 0) fetchAllApplicationsForMyJobs(); }, [myJobs]);

  const handleDeleteJob = async (id) => {
    await api.delete(`/api/jobs/${id}`);
    fetchMyJobs();
    if(selectedJob && selectedJob.id === id) {
      handleBackToJobs();
    }
  };

  const handleJobCreated = async (jobData) => {
    await api.post('/api/jobs', { ...jobData, company: user.companyName || jobData.company, recruiter: { id: user.id } });
    setActiveTab('my-jobs');
    fetchMyJobs();
  };

  const handleViewApplications = (job) => {
    setSelectedJob(job);
    setActiveTab('view-apps');
  };

  const handleBackToJobs = () => {
    setSelectedJob(null);
    setActiveTab('my-jobs');
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      await api.put(`/api/applications/${appId}/status`, { status: newStatus });
      setApplications(applications.map(app => app.id === appId ? { ...app, status: newStatus } : app));
    } catch (e) {
      console.error("Failed to update status", e);
      alert("Error saving status change!");
    }
  };

  const jobApplications = applications.filter(app => app.job && app.job.id === selectedJob?.id);

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--primary-color)', margin: 0 }}>{user.companyName} Workspace</h2>
        {activeTab !== 'post' ? (
          <button className="btn btn-primary" onClick={() => setActiveTab('post')}>+ Post New Job</button>
        ) : (
          <button className="btn" onClick={handleBackToJobs}>Cancel</button>
        )}
      </div>

      {activeTab === 'post' && <JobForm onAddJob={handleJobCreated} overrides={{company: user.companyName}} />}

      {activeTab === 'my-jobs' && (
        <>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.8rem' }}>Manage Job Listings</h3>
          <JobList 
            jobs={myJobs} 
            onDelete={handleDeleteJob} 
            onViewApplications={handleViewApplications} 
            applicationsMap={appCountsMap} 
          />
        </>
      )}

      {activeTab === 'view-apps' && selectedJob && (
        <div className="fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
            <button className="btn" onClick={handleBackToJobs}>
               <span style={{ marginRight: '0.5rem' }}>&larr;</span> Back to Jobs
            </button>
            <div>
              <h3 style={{ margin: 0 }}>Applicants for <span style={{ color: 'var(--primary-color)' }}>{selectedJob.title}</span></h3>
              <p style={{ margin: '0.2rem 0 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total applications: {jobApplications.length}</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {jobApplications.map(app => (
              <div key={app.id} className="job-card" style={{ borderLeft: '4px solid var(--primary-color)', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ margin: 0 }}>{app.firstName} {app.lastName}</h3>
                    <p style={{ color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>{app.email} | {app.phone}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {app.portfolioUrl && <a href={app.portfolioUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>Portfolio Link</a>}
                    
                    <div style={{ marginTop: '0.8rem', background: 'var(--surface-color)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                       <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status Pipeline: </label>
                       <select value={app.status || 'PENDING'} onChange={(e) => handleUpdateStatus(app.id, e.target.value)} 
                               style={{ background: 'var(--bg-color)', color: 'var(--text-main)', border: '1px solid var(--border-color)', padding: '0.3rem 0.6rem', borderRadius: '4px', marginLeft: '0.5rem', 
                               outline: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                          <option value="PENDING">🕒 Pending Review</option>
                          <option value="SHORTLISTED">✅ Shortlisted</option>
                          <option value="REJECTED">❌ Declined</option>
                       </select>
                    </div>

                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', fontSize: '0.95rem' }}>
                  <div>
                    <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Academic</h4>
                    <p style={{ margin: '0 0 0.3rem 0' }}><strong>{app.degree}</strong> ({app.graduationYear})</p>
                    <p style={{ margin: '0 0 0.3rem 0' }}>{app.university}</p>
                    <p style={{ margin: '0 0 0.3rem 0', color: 'var(--accent-color)' }}>CGPA: {app.cgpa}</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Professional</h4>
                    <p style={{ margin: '0 0 0.3rem 0' }}><strong>Exp:</strong> {app.experienceYears}</p>
                    <p style={{ margin: '0 0 0.3rem 0' }}><strong>Skills:</strong> {app.skills}</p>
                  </div>
                </div>

                {app.coverLetter && (
                  <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-color)', borderRadius: 'var(--radius-sm)' }}>
                    <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Cover Letter:</strong>
                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>{app.coverLetter}</p>
                  </div>
                )}

                <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                   <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ textDecoration: 'none' }}>Download/View Resume</a>
                </div>
              </div>
            ))}
            {jobApplications.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--surface-color)', borderRadius: 'var(--radius-md)' }}>
                No applications received for this job yet.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecruiterDashboard;
