import React, { useState, useMemo } from 'react';
import './styles/main.css';

import Navbar from './components/Navbar';
import EventSelector from './components/EventSelector';
import ArticleViewer from './components/ArticleViewer';
import MetricsDashboard from './components/MetricsDashboard';
import EntityMatrix from './components/EntityMatrix';
import NeutralizerModal from './components/NeutralizerModal';
import CustomArticleModal from './components/CustomArticleModal';

import { BENCHMARK_EVENTS } from './services/sampleArticles';
import { analyzeArticleText } from './services/nlpEngine';

export default function App() {
  const [selectedEventId, setSelectedEventId] = useState(BENCHMARK_EVENTS[0].id);
  const [customArticles, setCustomArticles] = useState(null);
  const [selectedTokenData, setSelectedTokenData] = useState(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  // Active Article Pair
  const activeArticlePair = useMemo(() => {
    if (customArticles) {
      return customArticles;
    }
    const found = BENCHMARK_EVENTS.find(e => e.id === selectedEventId) || BENCHMARK_EVENTS[0];
    return {
      outletA: found.outletA,
      outletB: found.outletB
    };
  }, [selectedEventId, customArticles]);

  // Run NLP Analysis in Real-Time
  const analysisA = useMemo(() => {
    if (!activeArticlePair?.outletA) return null;
    return analyzeArticleText(activeArticlePair.outletA.content, activeArticlePair.outletA.headline);
  }, [activeArticlePair]);

  const analysisB = useMemo(() => {
    if (!activeArticlePair?.outletB) return null;
    return analyzeArticleText(activeArticlePair.outletB.content, activeArticlePair.outletB.headline);
  }, [activeArticlePair]);

  const handleSelectEvent = (id) => {
    setCustomArticles(null);
    setSelectedEventId(id);
  };

  const handleResetBenchmark = () => {
    setCustomArticles(null);
    setSelectedEventId(BENCHMARK_EVENTS[0].id);
  };

  const handleSubmitCustomArticles = (pair) => {
    setCustomArticles(pair);
  };

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <Navbar
        onOpenCustomModal={() => setIsCustomModalOpen(true)}
        onResetBenchmark={handleResetBenchmark}
      />

      {/* Case Study Event Selector Bar */}
      <EventSelector
        selectedEventId={customArticles ? null : selectedEventId}
        onSelectEvent={handleSelectEvent}
      />

      {customArticles && (
        <div style={{ marginBottom: '1.5rem', background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '0.8rem 1.2rem', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)' }}>
            ✨ Currently viewing live NLP analysis for custom user-pasted articles
          </span>
          <button className="btn-secondary" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }} onClick={handleResetBenchmark}>
            Switch back to Benchmark Datasets
          </button>
        </div>
      )}

      {/* Main Dual Article Reader Grid */}
      <div className="workspace-grid">
        <ArticleViewer
          outletData={activeArticlePair.outletA}
          nlpAnalysis={analysisA}
          onSelectToken={(token, sentence) => setSelectedTokenData({ token, sentence, outletName: activeArticlePair.outletA.name })}
        />
        <ArticleViewer
          outletData={activeArticlePair.outletB}
          nlpAnalysis={analysisB}
          onSelectToken={(token, sentence) => setSelectedTokenData({ token, sentence, outletName: activeArticlePair.outletB.name })}
        />
      </div>

      {/* Comparative Analytics Dashboard */}
      <MetricsDashboard
        outletA={activeArticlePair.outletA}
        analysisA={analysisA}
        outletB={activeArticlePair.outletB}
        analysisB={analysisB}
      />

      {/* Entity & Topic Framing Matrix */}
      <EntityMatrix
        outletA={activeArticlePair.outletA}
        analysisA={analysisA}
        outletB={activeArticlePair.outletB}
        analysisB={analysisB}
      />

      {/* XAI Explainability Popover */}
      {selectedTokenData && (
        <NeutralizerModal
          selectedTokenData={selectedTokenData}
          onClose={() => setSelectedTokenData(null)}
        />
      )}

      {/* Custom Article Analysis Modal */}
      <CustomArticleModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onSubmitCustomArticles={handleSubmitCustomArticles}
      />
    </div>
  );
}
