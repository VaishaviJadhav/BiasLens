import React, { useState } from 'react';
import { AlertTriangle, Filter, Sparkles, User, Calendar, Info } from 'lucide-react';

export default function ArticleViewer({ outletData, nlpAnalysis, onSelectToken }) {
  const [activeFilter, setActiveFilter] = useState('all');

  if (!outletData || !nlpAnalysis) return null;

  const stanceClass = `stance-${outletData.stanceType || 'center'}`;

  return (
    <div className="glass-card article-panel">
      {/* Header */}
      <div className="article-header">
        <div className="outlet-header-meta">
          <div className="outlet-badge-group">
            <span className="outlet-name">{outletData.name}</span>
            <span className={`stance-pill ${stanceClass}`}>
              {outletData.stance || 'Independent'}
            </span>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Objectivity Index: <strong style={{ color: nlpAnalysis.objectivityScore > 70 ? '#34d399' : '#f87171' }}>{nlpAnalysis.objectivityScore}%</strong>
          </span>
        </div>

        <h3 className="article-headline">{outletData.headline}</h3>

        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><User size={14} /> {outletData.author || 'Editorial Board'}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={14} /> {outletData.date || 'Recent Coverage'}</span>
        </div>

        {nlpAnalysis.headlineSkew?.isSkewed && (
          <div className="headline-skew-badge">
            <AlertTriangle size={14} />
            <span>Headline Skew Warning: {nlpAnalysis.headlineSkew.reason}</span>
          </div>
        )}
      </div>

      {/* Filter toolbar */}
      <div className="filter-toolbar">
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Filter size={12} /> Highlights:
        </span>
        <button
          className={`filter-btn ${activeFilter === 'all' ? 'active-all' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Flags
        </button>
        <button
          className={`filter-btn ${activeFilter === 'sensational' ? 'active-sensational' : ''}`}
          onClick={() => setActiveFilter('sensational')}
        >
          Sensational ({nlpAnalysis.sensationalCount})
        </button>
        <button
          className={`filter-btn ${activeFilter === 'loaded' ? 'active-loaded' : ''}`}
          onClick={() => setActiveFilter('loaded')}
        >
          Loaded ({nlpAnalysis.loadedCount})
        </button>
        <button
          className={`filter-btn ${activeFilter === 'subjective' ? 'active-subjective' : ''}`}
          onClick={() => setActiveFilter('subjective')}
        >
          Subjective ({nlpAnalysis.subjectiveCount})
        </button>
      </div>

      {/* Body with Annotated Tokens */}
      <div className="article-body">
        {nlpAnalysis.annotatedSentences.map(sentence => (
          <div key={sentence.id} className="annotated-sentence">
            {sentence.tokens.map(token => {
              const shouldHighlight = token.category && (activeFilter === 'all' || activeFilter === token.category);

              if (shouldHighlight) {
                const categoryClass = `hl-${token.category}`;
                return (
                  <span
                    key={token.id}
                    className={`hl-token ${categoryClass}`}
                    onClick={() => onSelectToken(token, sentence)}
                    title="Click for AI explainability & neutral rephrase"
                  >
                    {token.raw}{' '}
                  </span>
                );
              }

              return <span key={token.id}>{token.raw} </span>;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
