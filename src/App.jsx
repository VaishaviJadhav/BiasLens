import React, { useState, useMemo, useRef } from 'react';
import './styles/main.css';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
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

  const analyzerRef = useRef(null);

  const scrollToAnalyzer = () => {
    analyzerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Active Article Pair
  const activeArticlePair = useMemo(() => {
    if (customArticles) return customArticles;
    const found = BENCHMARK_EVENTS.find(e => e.id === selectedEventId) || BENCHMARK_EVENTS[0];
    return { outletA: found.outletA, outletB: found.outletB };
  }, [selectedEventId, customArticles]);

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
      {/* Sticky Navbar */}
      <Navbar
        onOpenCustomModal={() => setIsCustomModalOpen(true)}
        onResetBenchmark={handleResetBenchmark}
      />

      {/* Hero / About Section */}
      <HeroSection
        onScrollToAnalyzer={scrollToAnalyzer}
        onSelectEvent={(id) => {
          handleSelectEvent(id);
          scrollToAnalyzer();
        }}
      />

      {/* ── Analyzer Section ── */}
      <div ref={analyzerRef} className="analyzer-section">
        <div className="analyzer-section-header">
          <h2 className="analyzer-section-title">Bias Analyzer</h2>
          <p className="analyzer-section-sub">
            Choose a benchmark case study below or paste your own articles to run a live analysis.
          </p>
        </div>

        {/* Custom upload shortcut banner */}
        <div className="upload-prompt-bar">
          <span className="upload-prompt-text">
            Have your own articles? Paste them directly for instant analysis.
          </span>
          <button className="btn-primary" onClick={() => setIsCustomModalOpen(true)}>
            + Analyze Custom Articles
          </button>
        </div>

        {/* Case Study Event Selector */}
        <EventSelector
          selectedEventId={customArticles ? null : selectedEventId}
          onSelectEvent={handleSelectEvent}
        />

        {customArticles && (
          <div className="custom-banner">
            <span>✦ Showing live NLP analysis for your custom articles</span>
            <button className="btn-secondary" onClick={handleResetBenchmark}>
              Back to Benchmark Datasets
            </button>
          </div>
        )}

        {/* Dual Article Reader */}
        <div className="workspace-grid">
          <ArticleViewer
            outletData={activeArticlePair.outletA}
            nlpAnalysis={analysisA}
            onSelectToken={(token, sentence) =>
              setSelectedTokenData({ token, sentence, outletName: activeArticlePair.outletA.name })
            }
          />
          <ArticleViewer
            outletData={activeArticlePair.outletB}
            nlpAnalysis={analysisB}
            onSelectToken={(token, sentence) =>
              setSelectedTokenData({ token, sentence, outletName: activeArticlePair.outletB.name })
            }
          />
        </div>

        {/* Metrics & Entity Matrix */}
        <MetricsDashboard
          outletA={activeArticlePair.outletA}
          analysisA={analysisA}
          outletB={activeArticlePair.outletB}
          analysisB={analysisB}
        />

        <EntityMatrix
          outletA={activeArticlePair.outletA}
          analysisA={analysisA}
          outletB={activeArticlePair.outletB}
          analysisB={analysisB}
        />
      </div>

      {/* XAI Popover */}
      {selectedTokenData && (
        <NeutralizerModal
          selectedTokenData={selectedTokenData}
          onClose={() => setSelectedTokenData(null)}
        />
      )}

      {/* Custom Article Modal */}
      <CustomArticleModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onSubmitCustomArticles={handleSubmitCustomArticles}
      />

      <footer className="app-footer">
        <span>BiasLens — built for media literacy</span>
        <span>·</span>
        <span>NLP runs entirely in your browser</span>
      </footer>
    </div>
  );
}
