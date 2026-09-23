import React from 'react';
import { Eye, PlusCircle, Sparkles, RefreshCw, BarChart2 } from 'lucide-react';

export default function Navbar({ onOpenCustomModal, onResetBenchmark }) {
  return (
    <nav className="navbar">
      <div className="brand">
        <div className="brand-icon">
          <Eye size={24} />
        </div>
        <div>
          <div className="brand-title gradient-text">BiasLens</div>
        </div>
        <span className="brand-badge pulse-badge">AI NLP Core v2.4</span>
      </div>

      <div className="nav-actions">
        <button className="btn-secondary" onClick={onResetBenchmark} title="Reset to default benchmark story">
          <RefreshCw size={16} /> Reset
        </button>
        <button className="btn-primary" onClick={onOpenCustomModal}>
          <PlusCircle size={18} /> Analyze Custom Articles
        </button>
      </div>
    </nav>
  );
}
