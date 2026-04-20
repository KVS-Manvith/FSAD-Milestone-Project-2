import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

function JobList({ jobs, onSearch, onDelete, loading, onApply, onViewApplications, applicationsMap }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if(onSearch) onSearch(searchTerm);
  };

  return (
    <div className="fade-in">
      {onSearch && (
        <form className="search-bar" onSubmit={handleSearch}>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search by job title or company..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-primary search-btn">Search</button>
        </form>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading amazing opportunities...</div>
      ) : jobs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', background: 'var(--surface-color)', borderRadius: 'var(--radius-lg)' }}>
          No jobs found.
        </div>
      ) : (
        <div className="job-grid">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3 className="job-title">{job.title}</h3>
              <div className="job-company">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path></svg>
                &nbsp;{job.company}
              </div>
              <div className="job-meta">
                <div className="job-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  &nbsp;{job.location}
                </div>
                <div className="job-meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                  &nbsp;{job.type || 'Full-time'}
                </div>
              </div>
              <div className="job-desc">
                {job.description.length > 120 ? job.description.substring(0, 120) + '...' : job.description}
              </div>
              <div className="job-footer" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                <span className="job-salary">{job.salary || 'Salary Undisclosed'}</span>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
                  {onApply && (!user || user.role === 'EMPLOYEE') && (
                    <button onClick={() => onApply(job)} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>
                      Apply
                    </button>
                  )}

                  {onViewApplications && user?.role === 'RECRUITER' && (
                    <button onClick={() => onViewApplications(job)} className="btn" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'var(--surface-hover)' }}>
                      View Applicants {applicationsMap && applicationsMap[job.id] !== undefined ? `(${applicationsMap[job.id]})` : ''}
                    </button>
                  )}

                  {onDelete && (user?.role === 'ADMIN' || (user?.role === 'RECRUITER' && job.recruiter?.id === user.id)) && (
                    <button onClick={() => onDelete(job.id)} className="btn btn-danger" style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobList;
