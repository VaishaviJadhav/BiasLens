import React, { useState } from 'react';
import { X, Sparkles, FileText } from 'lucide-react';

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
    <div className="modal-wrapper" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div className="modal-header-title">
            <FileText size={22} color="var(--blue)" />
            <h2>Analyze Custom Articles</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <p className="modal-subtitle-text">
          Input article content from two different news outlets to run a side-by-side NLP bias comparison.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="modal-grid-cols">
            {/* Article A Panel */}
            <div className="modal-outlet-box modal-outlet-a">
              <div className="modal-outlet-header">
                <span className="modal-outlet-dot dot-blue" />
                <h3>Article A (First Outlet)</h3>
              </div>

              <div className="form-group">
                <label className="form-label">Outlet Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={nameA}
                  onChange={(e) => setNameA(e.target.value)}
                  placeholder="e.g. Daily Chronicle"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Political Stance</label>
                <select className="form-input" value={stanceA} onChange={(e) => setStanceA(e.target.value)}>
                  <option value="left">Left</option>
                  <option value="center-left">Center-Left</option>
                  <option value="center">Center / Neutral</option>
                  <option value="center-right">Center-Right</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Headline</label>
                <input
                  type="text"
                  className="form-input"
                  value={headlineA}
                  onChange={(e) => setHeadlineA(e.target.value)}
                  placeholder="Article headline..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Article Text Content</label>
                <textarea
                  className="form-textarea"
                  rows={5}
                  value={contentA}
                  onChange={(e) => setContentA(e.target.value)}
                  placeholder="Paste article body here..."
                  required
                />
              </div>
            </div>

            {/* Article B Panel */}
            <div className="modal-outlet-box modal-outlet-b">
              <div className="modal-outlet-header">
                <span className="modal-outlet-dot dot-red" />
                <h3>Article B (Second Outlet)</h3>
              </div>

              <div className="form-group">
                <label className="form-label">Outlet Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={nameB}
                  onChange={(e) => setNameB(e.target.value)}
                  placeholder="e.g. Financial Times"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Political Stance</label>
                <select className="form-input" value={stanceB} onChange={(e) => setStanceB(e.target.value)}>
                  <option value="left">Left</option>
                  <option value="center-left">Center-Left</option>
                  <option value="center">Center / Neutral</option>
                  <option value="center-right">Center-Right</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Headline</label>
                <input
                  type="text"
                  className="form-input"
                  value={headlineB}
                  onChange={(e) => setHeadlineB(e.target.value)}
                  placeholder="Article headline..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Article Text Content</label>
                <textarea
                  className="form-textarea"
                  rows={5}
                  value={contentB}
                  onChange={(e) => setContentB(e.target.value)}
                  placeholder="Paste article body here..."
                  required
                />
              </div>
            </div>
          </div>

          <div className="modal-footer-bar">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Sparkles size={16} /> Run Live Bias Analysis
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
