import React from 'react';
import { BarChart3, ShieldCheck, Zap, AlertCircle, Compass, Heart } from 'lucide-react';

export default function MetricsDashboard({ outletA, analysisA, outletB, analysisB }) {
  if (!analysisA || !analysisB) return null;

  // Stance Pointer Calculations (-100 to +100 spectrum translated to 0% to 100% position)
  const getStancePercent = (stanceType) => {
    switch (stanceType) {
      case 'left': return 10;
      case 'center-left': return 30;
      case 'center': return 50;
      case 'center-right': return 70;
      case 'right': return 90;
      default: return 50;
    }
  };

  const stanceAPercent = getStancePercent(outletA.stanceType);
  const stanceBPercent = getStancePercent(outletB.stanceType);

  return (
    <div className="analytics-section">
      <h2 className="section-title">
        <BarChart3 size={24} color="var(--accent-cyan)" />
        Comparative NLP Bias & Framing Analytics
      </h2>

      <div className="dashboard-grid">
        {/* Stance Spectrum Gauge */}
        <div className="glass-card chart-card">
          <div className="chart-card-title">
            <span>Political Stance Spectrum</span>
            <Compass size={18} color="var(--accent-cyan)" />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Editorial positioning mapped across the media political spectrum
          </p>

          <div className="spectrum-container">
            <div style={{ fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--color-left)', fontWeight: 600 }}>
              ● {outletA.name}: <span style={{ textTransform: 'capitalize' }}>{outletA.stance}</span>
            </div>
            <div style={{ fontSize: '0.85rem', marginBottom: '1rem', color: 'var(--color-right)', fontWeight: 600 }}>
              ▲ {outletB.name}: <span style={{ textTransform: 'capitalize' }}>{outletB.stance}</span>
            </div>

            <div className="spectrum-bar-bg">
              <div
                className="spectrum-pointer"
                style={{ left: `${stanceAPercent}%`, background: '#3b82f6', borderColor: 'white' }}
                title={`${outletA.name} (${outletA.stance})`}
              />
              <div
                className="spectrum-pointer"
                style={{ left: `${stanceBPercent}%`, background: '#ef4444', borderColor: 'white' }}
                title={`${outletB.name} (${outletB.stance})`}
              />
            </div>

            <div className="spectrum-labels">
              <span>Far Left</span>
              <span>Center-Left</span>
              <span>Neutral / Center</span>
              <span>Center-Right</span>
              <span>Far Right</span>
            </div>
          </div>
        </div>

        {/* Objectivity & Sensationalism Comparison */}
        <div className="glass-card chart-card">
          <div className="chart-card-title">
            <span>Sensationalism & Loaded Language Index</span>
            <Zap size={18} color="var(--hl-sensational-border)" />
          </div>

          <div className="metric-row">
            <div className="metric-meta">
              <span style={{ color: 'var(--text-primary)' }}>{outletA.name} (Sensationalism)</span>
              <strong style={{ color: '#f87171' }}>{analysisA.sensationalismIndex}%</strong>
            </div>
            <div className="metric-progress-bg">
              <div className="metric-progress-fill" style={{ width: `${analysisA.sensationalismIndex}%`, background: '#f87171' }} />
            </div>
          </div>

          <div className="metric-row">
            <div className="metric-meta">
              <span style={{ color: 'var(--text-primary)' }}>{outletB.name} (Sensationalism)</span>
              <strong style={{ color: '#f87171' }}>{analysisB.sensationalismIndex}%</strong>
            </div>
            <div className="metric-progress-bg">
              <div className="metric-progress-fill" style={{ width: `${analysisB.sensationalismIndex}%`, background: '#ef4444' }} />
            </div>
          </div>

          <div className="metric-row" style={{ marginTop: '1rem' }}>
            <div className="metric-meta">
              <span style={{ color: 'var(--text-primary)' }}>{outletA.name} (Loaded Terms)</span>
              <strong style={{ color: '#fbbf24' }}>{analysisA.loadedLanguageIndex}%</strong>
            </div>
            <div className="metric-progress-bg">
              <div className="metric-progress-fill" style={{ width: `${analysisA.loadedLanguageIndex}%`, background: '#fbbf24' }} />
            </div>
          </div>

          <div className="metric-row">
            <div className="metric-meta">
              <span style={{ color: 'var(--text-primary)' }}>{outletB.name} (Loaded Terms)</span>
              <strong style={{ color: '#fbbf24' }}>{analysisB.loadedLanguageIndex}%</strong>
            </div>
            <div className="metric-progress-bg">
              <div className="metric-progress-fill" style={{ width: `${analysisB.loadedLanguageIndex}%`, background: '#f59e0b' }} />
            </div>
          </div>
        </div>

        {/* Objectivity & Net Sentiment Score Card */}
        <div className="glass-card chart-card">
          <div className="chart-card-title">
            <span>Overall Factual Objectivity Rating</span>
            <ShieldCheck size={18} color="#34d399" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{outletA.name}</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: analysisA.objectivityScore > 70 ? '#34d399' : '#f87171' }}>
                {analysisA.objectivityScore}<span style={{ fontSize: '1rem' }}>/100</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Net Sentiment: {analysisA.netSentiment > 0 ? `+${analysisA.netSentiment}` : analysisA.netSentiment}
              </div>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{outletB.name}</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: analysisB.objectivityScore > 70 ? '#34d399' : '#f87171' }}>
                {analysisB.objectivityScore}<span style={{ fontSize: '1rem' }}>/100</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Net Sentiment: {analysisB.netSentiment > 0 ? `+${analysisB.netSentiment}` : analysisB.netSentiment}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
