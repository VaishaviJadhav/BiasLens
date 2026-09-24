import React from 'react';
import { Eye, RefreshCw } from 'lucide-react';

export default function Navbar({ onOpenCustomModal, onResetBenchmark }) {
  return (
    <nav className="navbar">
      <div className="brand">
        <div className="brand-icon">
          <Eye size={18} />
        </div>
        <span className="brand-title gradient-text">BiasLens</span>
        <span className="brand-badge pulse-badge">NLP v2.4</span>
      </div>

      <div className="nav-actions">
        <button className="btn-secondary" onClick={onResetBenchmark} title="Reset to benchmark">
          <RefreshCw size={14} /> Reset
        </button>
        <button className="btn-primary" onClick={onOpenCustomModal}>
          + Custom Articles
        </button>
      </div>
    </nav>
  );
}
