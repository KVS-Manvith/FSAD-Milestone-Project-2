import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

function ApplyModal({ job, onClose }) {
  const { user } = useAuth();
  
  // Initialize with user's specific details if possible
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    portfolioUrl: '',
    degree: '',
    university: '',
    graduationYear: '',
    cgpa: '',
    skills: '',
    experienceYears: '',
    coverLetter: '',
    resumeUrl: ''
  });
  
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/applications', {
        job: { id: job.id },
        employee: { id: user.id },
        ...formData
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error(error);
      alert('Error applying. Please try again.');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', 
      alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem'
    }}>
      <div className="form-container fade-in" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <h2 style={{ color: 'var(--primary-color)', margin: 0 }}>Application Form</h2>
            <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0 0' }}>Applying for <strong>{job.title}</strong> at <strong>{job.company}</strong></p>
          </div>
          <button onClick={onClose} style={{ background: 'var(--surface-hover)', border: 'none', color: 'var(--text-main)', fontSize: '1.2rem', cursor: 'pointer', width: '36px', height: '36px', borderRadius: '50%' }}>&times;</button>
        </div>
        
        {success ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--accent-color)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <h2 style={{ marginBottom: '0.5rem' }}>Application Submitted successfully!</h2>
            <p style={{ color: 'var(--text-main)' }}>The recruiting team will reach out to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem', borderLeft: '3px solid var(--primary-color)', paddingLeft: '0.5rem' }}>1. Personal Details</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label className="form-label">First Name</label>
                <input type="text" name="firstName" className="form-control" required value={formData.firstName} onChange={handleChange} />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input type="text" name="lastName" className="form-control" required value={formData.lastName} onChange={handleChange} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label className="form-label">Email Address</label>
                <input type="email" name="email" className="form-control" required value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <label className="form-label">Phone Number</label>
                <input type="tel" name="phone" className="form-control" required value={formData.phone} onChange={handleChange} placeholder="+91 98000 00000" />
              </div>
            </div>
            <div style={{ marginBottom: '2rem' }}>
               <label className="form-label">LinkedIn / Portfolio URL</label>
               <input type="url" name="portfolioUrl" className="form-control" value={formData.portfolioUrl} onChange={handleChange} placeholder="https://linkedin.com/in/amitpatel" />
            </div>

            <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem', borderLeft: '3px solid var(--primary-color)', paddingLeft: '0.5rem' }}>2. Academic Background</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label className="form-label">Highest Degree / Major</label>
                <input type="text" name="degree" className="form-control" required value={formData.degree} onChange={handleChange} placeholder="e.g. B.Tech Computer Science" />
              </div>
              <div>
                <label className="form-label">University / Institution</label>
                <input type="text" name="university" className="form-control" required value={formData.university} onChange={handleChange} placeholder="e.g. SRM University or IIT Delhi" />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <label className="form-label">Graduation Year</label>
                <input type="text" name="graduationYear" className="form-control" required value={formData.graduationYear} onChange={handleChange} placeholder="e.g. 2023" />
              </div>
              <div>
                <label className="form-label">CGPA / Percentage</label>
                <input type="text" name="cgpa" className="form-control" value={formData.cgpa} onChange={handleChange} placeholder="e.g. 8.5 / 10" />
              </div>
            </div>

            <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem', borderLeft: '3px solid var(--primary-color)', paddingLeft: '0.5rem' }}>3. Experience & Skills</h4>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label className="form-label">Primary Skills (Comma separated)</label>
                <input type="text" name="skills" className="form-control" required value={formData.skills} onChange={handleChange} placeholder="React, Node.js, AWS..." />
              </div>
              <div>
                <label className="form-label">Years of Experience</label>
                <select name="experienceYears" className="form-control" required value={formData.experienceYears} onChange={handleChange}>
                  <option value="" disabled>Select experience...</option>
                  <option value="Fresher / 0 years">Fresher / 0 years</option>
                  <option value="1-3 years">1 - 3 years</option>
                  <option value="3-5 years">3 - 5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <label className="form-label">Cover Letter / Why are you a good fit?</label>
              <textarea 
                name="coverLetter" className="form-control" rows="4" 
                value={formData.coverLetter} onChange={handleChange}
                placeholder="Briefly describe your interest in the role and company..."
              />
            </div>

            <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem', borderLeft: '3px solid var(--primary-color)', paddingLeft: '0.5rem' }}>4. Resume Upload</h4>
            <div style={{ marginBottom: '2.5rem' }}>
              <label className="form-label">Resume Link (PDF/Google Drive/Dropbox)</label>
              <input 
                type="text" name="resumeUrl" className="form-control" required
                value={formData.resumeUrl} onChange={handleChange}
                placeholder="Link to your resume..."
              />
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>* For prototype purposes, we are accepting direct links instead of file uploads.</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 2, padding: '0.8rem', fontSize: '1rem' }}>Submit Formal Application</button>
              <button type="button" className="btn" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ApplyModal;
