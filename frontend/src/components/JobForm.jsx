import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JobForm({ onAddJob, overrides }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: overrides?.company || '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onAddJob(formData);
    // In some contexts like recruiter dashboard we don't want to navigate
    if (success && !overrides) {
      navigate('/');
    }
  };

  return (
    <div className="form-container fade-in">
      <h2 style={{ marginBottom: '2rem', color: 'var(--primary-color)' }}>Post a New Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Job Title</label>
          <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required placeholder="e.g. Senior React Developer" />
        </div>
        
        {!overrides?.company && (
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input type="text" name="company" className="form-control" value={formData.company} onChange={handleChange} required placeholder="e.g. Infosys" />
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} required placeholder="e.g. Remote, Bangalore" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Job Type</label>
            <select name="type" className="form-control" value={formData.type} onChange={handleChange}>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Salary (Optional)</label>
          <input type="text" name="salary" className="form-control" value={formData.salary} onChange={handleChange} placeholder="e.g. ₹12,00,000 LPA" />
        </div>

        <div className="form-group">
          <label className="form-label">Job Description</label>
          <textarea name="description" className="form-control" rows="5" value={formData.description} onChange={handleChange} required placeholder="Describe the responsibilities and requirements..."></textarea>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Post Job</button>
      </form>
    </div>
  );
}

export default JobForm;
