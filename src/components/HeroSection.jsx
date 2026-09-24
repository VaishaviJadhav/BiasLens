import React, { useState } from 'react';
import { Eye, BarChart2, FileSearch, Zap, ArrowDown, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { BENCHMARK_EVENTS } from '../services/sampleArticles';

const cardImages = {
  'ai-act-2026': '/card_ai.png',
  'climate-transition-2026': '/card_climate.png',
  'central-bank-rates-2026': '/card_economy.png',
};

const cardThemeColors = {
  'ai-act-2026': { badgeBg: 'rgba(124, 106, 240, 0.2)', badgeText: '#a78bfa', glow: 'rgba(124, 106, 240, 0.4)', score: '8.8' },
  'climate-transition-2026': { badgeBg: 'rgba(62, 201, 142, 0.2)', badgeText: '#1a1c1b', glow: 'rgba(62, 201, 142, 0.4)', score: '7.9' },
  'central-bank-rates-2026': { badgeBg: 'rgba(232, 168, 43, 0.2)', badgeText: '#f0c060', glow: 'rgba(232, 168, 43, 0.4)', score: '6.5' },
};

const features = [
  {
    icon: <FileSearch size={20} />,
    title: 'Side-by-Side Article Comparison',
    desc: 'Load two articles on the same news event from different outlets and view them in parallel.',
  },
  {
    icon: <Zap size={20} />,
    title: 'Real-Time NLP Analysis',
    desc: 'Every sentence is scanned for sensational language, loaded phrasing, and subjective framing.',
  },
  {
    icon: <BarChart2 size={20} />,
    title: 'Bias Metrics Dashboard',
    desc: 'Visual charts compare emotional intensity, political stance scores, and language patterns.',
  },
  {
    icon: <ShieldCheck size={20} />,
    title: 'Explainable AI (XAI)',
    desc: 'Click any flagged word or phrase to understand exactly why it was marked and see a neutral alternative.',
  },
];

export default function HeroSection({ onScrollToAnalyzer, onSelectEvent }) {
  const [activeHoverIndex, setActiveHoverIndex] = useState(null);

  const handleCardClick = (eventId) => {
    if (onSelectEvent) {
      onSelectEvent(eventId);
    } else if (onScrollToAnalyzer) {
      onScrollToAnalyzer();
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-eyebrow">
        <span className="hero-eyebrow-badge">
          <Eye size={13} /> Open-Source · NLP-Powered Media Analyzer
        </span>
      </div>

      <div className="hero-brand-name">
        <span className="hero-brand-bias">Bias</span><span className="hero-brand-lens">Lens</span>
      </div>

      <h1 className="hero-title">
        See the news clearly.<br />
        <span className="hero-title-accent">Detect bias. Understand framing.</span>
      </h1>

      <p className="hero-subtitle">
        Be sure to explore our benchmark selection of multi-perspective news pairs.
        Select an article card below to compare framing, loaded language, and bias metrics in real time.
      </p>

      {/* Stacked Article Cards Section */}
      <div className="card-stack-wrapper">
        <div className="card-stack-container">
          {BENCHMARK_EVENTS.map((event, idx) => {
            const theme = cardThemeColors[event.id] || { badgeBg: 'rgba(79, 142, 247, 0.2)', badgeText: '#7db3fb', glow: 'rgba(79, 142, 247, 0.4)', score: '7.5' };
            const imgSrc = cardImages[event.id] || '/card_ai.png';
            const isHovered = activeHoverIndex === idx;

            return (
              <div
                key={event.id}
                className={`stack-card stack-card-${idx} ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setActiveHoverIndex(idx)}
                onMouseLeave={() => setActiveHoverIndex(null)}
                onClick={() => handleCardClick(event.id)}
                style={{
                  '--card-glow': theme.glow,
                }}
              >
                <div className="stack-card-image-box">
                  <img src={imgSrc} alt={event.title} className="stack-card-image" />
                  <div className="stack-card-badge" style={{ background: theme.badgeBg, color: theme.badgeText }}>
                    <Sparkles size={11} /> {event.category}
                  </div>
                  <div className="stack-card-score">
                    <Zap size={11} /> Bias Score {theme.score}
                  </div>
                </div>

                <div className="stack-card-content">
                  <h3 className="stack-card-title">{event.title}</h3>
                  <p className="stack-card-summary">{event.summary}</p>
                  
                  <div className="stack-card-outlets">
                    <span className="stack-outlet-tag">{event.outletA.name}</span>
                    <span className="stack-vs-tag">vs</span>
                    <span className="stack-outlet-tag">{event.outletB.name}</span>
                  </div>

                  <button className="stack-card-action">
                    Analyze This Case <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hero-actions">
        <button className="hero-btn-primary" onClick={onScrollToAnalyzer}>
          Start Analyzing <ArrowDown size={16} />
        </button>
        <a
          className="hero-btn-ghost"
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </div>

      <div className="hero-features-grid">
        {features.map((f, i) => (
          <div className="hero-feature-card" key={i}>
            <div className="hero-feature-icon">{f.icon}</div>
            <div>
              <div className="hero-feature-title">{f.title}</div>
              <div className="hero-feature-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-scroll-hint" onClick={onScrollToAnalyzer}>
        <span>Scroll to analyzer</span>
        <ArrowDown size={16} className="bounce-icon" />
      </div>
    </section>
  );
}
