import React from 'react';
import { Layers, ArrowRightLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import { extractEntityFraming } from '../services/nlpEngine';

export default function EntityMatrix({ outletA, analysisA, outletB, analysisB }) {
  if (!analysisA || !analysisB) return null;

  const entityData = extractEntityFraming(analysisA, analysisB, outletA.name, outletB.name);

  return (
    <div className="analytics-section" style={{ marginTop: '2.5rem' }}>
      <h2 className="section-title">
        <Layers size={24} color="var(--accent-violet)" />
        Entity & Keyword Framing Comparison Matrix
      </h2>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
        How key topics, institutions, and actors are characterized by each media outlet
      </p>

      <div className="entity-matrix-grid">
        {entityData.map((item, index) => (
          <div key={index} className="entity-card">
            <div className="entity-name">{item.entityName}</div>

            <div className="entity-comparison">
              <div className="entity-outlet-sentiment">
                <span>{item.outletA.name}</span>
                <span
                  style={{
                    fontWeight: 600,
                    color: item.outletA.score > 15 ? '#34d399' : item.outletA.score < -15 ? '#f87171' : 'var(--text-secondary)'
                  }}
                >
                  {item.outletA.label}
                </span>
              </div>

              <div className="entity-outlet-sentiment">
                <span>{item.outletB.name}</span>
                <span
                  style={{
                    fontWeight: 600,
                    color: item.outletB.score > 15 ? '#34d399' : item.outletB.score < -15 ? '#f87171' : 'var(--text-secondary)'
                  }}
                >
                  {item.outletB.label}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '0.8rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {item.framingDivergence === 'High Divergence' ? (
                <span style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <AlertTriangle size={14} /> High Framing Divergence
                </span>
              ) : (
                <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <CheckCircle2 size={14} /> Similar Alignment
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
