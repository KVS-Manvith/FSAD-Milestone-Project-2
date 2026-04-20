import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

function MyApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/applications/employee/${user.id}`);
        setApplications(res.data);
      } catch (e) { console.error(e) }
    };
    fetchApps();
  }, [user]);

  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: '2rem', color: 'var(--primary-color)' }}>My Applications Tracking</h2>
      {applications.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>You haven't applied to any jobs yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
          {applications.map(app => {
            
            // Dynamic Status Styling
            let statusBg = 'var(--surface-hover)';
            let statusText = 'var(--text-main)';
            let statusLabel = 'Under Review';
            let StatusIcon = () => (<><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></>);

            if (app.status === 'SHORTLISTED') {
               statusBg = 'rgba(16, 185, 129, 0.15)'; // Green tint
               statusText = '#10b981';
               statusLabel = 'Interview Shortlisted';
               StatusIcon = () => (<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></>);
            } else if (app.status === 'REJECTED') {
               statusBg = 'rgba(239, 68, 68, 0.15)'; // Red tint
               statusText = '#ef4444';
               statusLabel = 'Application Declined';
               StatusIcon = () => (<><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></>);
            }

            return (
              <div key={app.id} className="job-card" style={{ background: 'var(--surface-color)', position: 'relative' }}>
                <h3 className="job-title">{app.job?.title}</h3>
                <div className="job-company" style={{ marginBottom: '0.5rem' }}>{app.job?.company}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Location: {app.job?.location}</div>
                
                <div style={{ padding: '1rem', background: 'var(--bg-color)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                   <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)' }}>Resume Submitted: <a href={app.resumeUrl} target='_blank' rel='noreferrer' style={{ color: 'var(--primary-color)' }}>View Link</a></p>
                   <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)' }}>Degree Profile: {app.degree} ({app.cgpa})</p>
                   <p style={{ margin: 0, color: 'var(--text-muted)' }}>Skills: {app.skills}</p>
                </div>
  
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', 
                              background: statusBg, color: statusText, padding: '0.6rem 1rem', 
                              borderRadius: 'var(--radius-sm)', alignSelf: 'flex-start', border: `1px solid ${statusText}33` }}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <StatusIcon />
                   </svg>
                   <span style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {statusLabel}
                   </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyApplications;
