import React from 'react';
import { Sparkles, X, AlertTriangle, CheckCircle, Info, HelpCircle } from 'lucide-react';
import { generateNeutralVersion } from '../services/nlpEngine';

export default function NeutralizerModal({ selectedTokenData, onClose }) {
  if (!selectedTokenData) return null;

  const { token, sentence } = selectedTokenData;
  const neutralSentence = generateNeutralVersion(sentence);

  return (
    <>
      <div className="overlay-backdrop" onClick={onClose} />
      <div className="xai-popover">
        <div className="xai-popover-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={20} color="var(--accent-violet)" />
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Explainable AI (XAI) Insight</h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <span
            className="xai-badge"
            style={{
              background: token.category === 'sensational' ? 'var(--hl-sensational-bg)' : token.category === 'loaded' ? 'var(--hl-loaded-bg)' : 'var(--hl-subjective-bg)',
              color: token.category === 'sensational' ? 'var(--hl-sensational-border)' : token.category === 'loaded' ? 'var(--hl-loaded-border)' : 'var(--hl-subjective-border)',
              border: '1px solid currentColor'
            }}
          >
            Flagged Term: "{token.clean}" ({token.category})
          </span>
        </div>

        <div className="xai-body-original">
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase', fontWeight: 600 }}>
            Original Passage
          </div>
          "{sentence.text}"
        </div>

        <div className="xai-reasoning">
          <div style={{ fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Info size={16} /> Why was this flagged?
          </div>
          {token.xaiReason || 'Identified as having high emotional valence or non-objective editorial framing.'}
        </div>

        <div className="xai-neutral-box">
          <div className="xai-neutral-title">
            <CheckCircle size={16} /> Suggested Objective Neutral Rephrase
          </div>
          <p style={{ fontSize: '0.92rem', color: '#f1f5f9', fontStyle: 'italic' }}>
            "{neutralSentence}"
          </p>
        </div>

        <div style={{ marginTop: '1.2rem', textAlign: 'right' }}>
          <button className="btn-secondary" onClick={onClose} style={{ marginLeft: 'auto' }}>
            Close Insight
          </button>
        </div>
      </div>
    </>
  );
}
