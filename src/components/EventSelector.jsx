import React from 'react';
import { Newspaper, ChevronRight } from 'lucide-react';
import { BENCHMARK_EVENTS } from '../services/sampleArticles';

export default function EventSelector({ selectedEventId, onSelectEvent }) {
  return (
    <div className="glass-card event-bar">
      <div className="event-bar-header">
        <div>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Newspaper size={20} color="var(--accent-cyan)" />
            Benchmark Multi-Perspective Case Studies
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Select a real-world news event to evaluate side-by-side bias framing across contrasting media stances
          </p>
        </div>
      </div>

      <div className="event-cards-grid">
        {BENCHMARK_EVENTS.map(event => {
          const isActive = event.id === selectedEventId;
          return (
            <div
              key={event.id}
              className={`event-card ${isActive ? 'active' : ''}`}
              onClick={() => onSelectEvent(event.id)}
            >
              <div className="event-category">{event.category}</div>
              <div className="event-title">{event.title}</div>
              <div className="event-outlets">
                <span className="outlet-tag">{event.outletA.name} ({event.outletA.stanceType})</span>
                <span className="outlet-tag">vs</span>
                <span className="outlet-tag">{event.outletB.name} ({event.outletB.stanceType})</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
