import React, { useState } from 'react';
import { X, Sparkles, Send, FileText } from 'lucide-react';

export default function CustomArticleModal({ isOpen, onClose, onSubmitCustomArticles }) {
  const [nameA, setNameA] = useState('Outlet Alpha');
  const [stanceA, setStanceA] = useState('center-left');
  const [headlineA, setHeadlineA] = useState('Shocking Corporate Mandates Spark Catastrophic backlash in Tech Sector');
  const [contentA, setContentA] = useState('Lawmakers pushed through a draconian scheme today aimed at regulating artificial intelligence. Critics slammed the radical agenda as a total failure that will spark chaos and ruin innovation for pioneering developers.');

  const [nameB, setNameB] = useState('Outlet Beta');
  const [stanceB, setStanceB] = useState('center-right');
  const [headlineB, setHeadlineB] = useState('Pioneering AI Legislation Establishes Measured Safety Standards');
  const [contentB, setContentB] = useState('Parliament enacted a historic tech governance bill on Wednesday to ensure robust safety benchmarks. Industry experts noted that while compliance costs will rise slightly, the policy provides essential stability and protects long-term market growth.');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitCustomArticles({
      outletA: { name: nameA, stance: stanceA.replace('-', ' '), stanceType: stanceA, headline: headlineA, content: contentA },
      outletB: { name: nameB, stance: stanceB.replace('-', ' '), stanceType: stanceB, headline: headlineB, content: contentB }
    });
    onClose();
  };

  return (
    <div className="modal-wrapper">
      <div className="modal-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <FileText size={24} color="var(--accent-cyan)" />
            <h2 style={{ fontSize: '1.4rem' }}>Analyze Custom News Articles</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* Article A */}
            <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#60a5fa', marginBottom: '1rem' }}>Article A (First Outlet)</h3>

              <div className="form-group">
                <label className="form-label">Outlet Name</label>
                <input className="form-input" value={nameA} onChange={e => setNameA(e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="form-label">Political Stance</label>
                <select className="form-input" value={stanceA} onChange={e => setStanceA(e.target.value)}>
                  <option value="left">Left</option>
                  <option value="center-left">Center-Left</option>
                  <option value="center">Center</option>
                  <option value="center-right">Center-Right</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Headline</label>
                <input className="form-input" value={headlineA} onChange={e => setHeadlineA(e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="form-label">Article Content</label>
                <textarea className="form-textarea" rows={6} value={contentA} onChange={e => setContentA(e.target.value)} required />
              </div>
            </div>

            {/* Article B */}
            <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#f87171', marginBottom: '1rem' }}>Article B (Second Outlet)</h3>

              <div className="form-group">
                <label className="form-label">Outlet Name</label>
                <input className="form-input" value={nameB} onChange={e => setNameB(e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="form-label">Political Stance</label>
                <select className="form-input" value={stanceB} onChange={e => setStanceB(e.target.value)}>
                  <option value="left">Left</option>
                  <option value="center-left">Center-Left</option>
                  <option value="center">Center</option>
                  <option value="center-right">Center-Right</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Headline</label>
                <input className="form-input" value={headlineB} onChange={e => setHeadlineB(e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="form-label">Article Content</label>
                <textarea className="form-textarea" rows={6} value={contentB} onChange={e => setContentB(e.target.value)} required />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              <Sparkles size={18} /> Run Live NLP Bias Analysis
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
