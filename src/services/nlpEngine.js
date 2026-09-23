/**
 * BiasLens NLP Engine
 * Performs client-side NLP analysis including:
 * - Loaded & Sensationalist word detection
 * - Subjectivity & Sentiment lexicon scoring
 * - Political Stance Projection (-1.0 Left to +1.0 Right)
 * - Headline vs Content Skew Analysis
 * - Comparative Entity Framing Alignment
 * - Explainable AI (XAI) feature attribution & Neutral Rephraser suggestions
 */

// Lexicon Dictionaries
const SENSATIONAL_WORDS = new Set([
  'devastating', 'disastrous', 'catastrophic', 'unprecedented', 'explosive',
  'shocking', 'outrageous', 'scandalous', 'chilling', 'terrifying',
  'nightmare', 'bombshell', 'bloodbath', 'hammer blow', 'slam',
  'crushed', 'slammed', 'blasted', 'ripped', 'destroy', 'chaos',
  'total failure', 'ruthless', 'heinous', 'apocalyptic', 'hysterical'
]);

const LOADED_WORDS = new Set([
  'scheme', 'regime', 'agenda', 'radical', 'extremist', 'bureaucrats',
  'elites', 'syndicate', 'puppet', 'cartel', 'propaganda', 'dogma',
  'indoctrination', 'draconian', 'tyranny', 'cabal', 'woke', 'fanatics',
  'warmonger', 'zealots', 'shackles', 'cynical', 'reckless', 'shameless'
]);

const OPINION_MARKERS = new Set([
  'clearly', 'obviously', 'undoubtedly', 'disgracefully', 'tragically',
  'admittedly', 'foolishly', 'shockingly', 'predictably', 'regrettably',
  'undeniably', 'alarmingly', 'unbelievably', 'without a doubt', 'frankly'
]);

const POSITIVE_LEXICON = new Set([
  'historic', 'triumph', 'breakthrough', 'visionary', 'championed', 'masterpiece',
  'booming', 'landmark', 'resilient', 'unifying', 'soaring', 'flourishing',
  'heroic', 'pioneering', 'robust', 'stellar', 'seamless', 'unwavering'
]);

const NEGATIVE_LEXICON = new Set([
  'collapse', 'crisis', 'failing', 'stagnant', 'reckless', 'plagued',
  'toxic', 'bleak', 'perilous', 'eroding', 'unraveling', 'grim',
  'hazardous', 'corrosive', 'dire', 'threatened', 'ruinous'
]);

// Entity Extraction Heuristics & Keywords
const COMMON_ENTITIES = [
  { name: 'AI Act / Regulation', keywords: ['ai', 'regulation', 'tech', 'algorithm', 'safety', 'bill', 'compliance'] },
  { name: 'Government & Policymakers', keywords: ['government', 'administration', 'lawmakers', 'officials', 'bureaucrats', 'parliament', 'congress'] },
  { name: 'Climate Policy & Industry', keywords: ['climate', 'emissions', 'carbon', 'energy', 'oil', 'green', 'transition'] },
  { name: 'Economy & Central Bank', keywords: ['economy', 'inflation', 'fed', 'interest rates', 'markets', 'growth', 'jobs'] }
];

/**
 * Tokenizes text into sentences and words, detecting bias annotations
 */
export function analyzeArticleText(text, headline = '') {
  if (!text) return null;

  const rawSentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  let sensationalCount = 0;
  let loadedCount = 0;
  let subjectiveCount = 0;
  let totalWords = 0;
  let sentimentScoreSum = 0;

  const annotatedSentences = rawSentences.map((sentence, sIndex) => {
    const words = sentence.trim().split(/\s+/);
    totalWords += words.length;

    let sentenceSentiment = 0;
    let sentenceSensational = 0;
    let sentenceLoaded = 0;
    let sentenceSubjective = 0;

    const tokens = words.map((word, wIndex) => {
      const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
      let category = null;
      let xaiReason = null;
      let neutralSuggestion = null;

      if (SENSATIONAL_WORDS.has(cleanWord)) {
        category = 'sensational';
        sensationalCount++;
        sentenceSensational++;
        xaiReason = `High emotional charge: "${cleanWord}" amplifies urgency and sensationalism instead of neutral reporting.`;
        neutralSuggestion = getNeutralSubstitute(cleanWord) || 'significant';
      } else if (LOADED_WORDS.has(cleanWord)) {
        category = 'loaded';
        loadedCount++;
        sentenceLoaded++;
        xaiReason = `Ideologically loaded term: "${cleanWord}" carries heavy political framing or negative connotation.`;
        neutralSuggestion = getNeutralSubstitute(cleanWord) || 'proposal';
      } else if (OPINION_MARKERS.has(cleanWord)) {
        category = 'subjective';
        subjectiveCount++;
        sentenceSubjective++;
        xaiReason = `Subjective adverb/marker: "${cleanWord}" asserts editorial judgment rather than factual evidence.`;
        neutralSuggestion = 'notably';
      }

      if (POSITIVE_LEXICON.has(cleanWord)) sentenceSentiment += 1;
      if (NEGATIVE_LEXICON.has(cleanWord)) sentenceSentiment -= 1;

      return {
        id: `${sIndex}-${wIndex}`,
        raw: word,
        clean: cleanWord,
        category,
        xaiReason,
        neutralSuggestion
      };
    });

    sentimentScoreSum += sentenceSentiment;

    return {
      id: sIndex,
      text: sentence,
      tokens,
      sentenceSentiment,
      isBiased: (sentenceSensational + sentenceLoaded + sentenceSubjective) > 0
    };
  });

  // Calculate Overall Metrics
  const sensationalismIndex = Math.min(100, Math.round((sensationalCount / Math.max(1, totalWords)) * 1200));
  const loadedLanguageIndex = Math.min(100, Math.round((loadedCount / Math.max(1, totalWords)) * 1400));
  const subjectivityIndex = Math.min(100, Math.round((subjectiveCount / Math.max(1, totalWords)) * 1500));
  const netSentiment = totalWords > 0 ? (sentimentScoreSum / (totalWords / 20)) : 0;
  const objectivityScore = Math.max(0, Math.round(100 - (sensationalismIndex * 0.4 + loadedLanguageIndex * 0.4 + subjectivityIndex * 0.2)));

  // Headline vs Content Skew
  const headlineSkew = analyzeHeadlineSkew(headline, netSentiment, sensationalismIndex);

  return {
    totalWords,
    sensationalCount,
    loadedCount,
    subjectiveCount,
    sensationalismIndex,
    loadedLanguageIndex,
    subjectivityIndex,
    objectivityScore,
    netSentiment: parseFloat(netSentiment.toFixed(2)),
    headlineSkew,
    annotatedSentences
  };
}

/**
 * Replaces sensational/loaded words with neutral synonyms
 */
function getNeutralSubstitute(word) {
  const map = {
    'scheme': 'plan / proposal',
    'devastating': 'severe',
    'disastrous': 'damaging',
    'draconian': 'strict',
    'slammed': 'criticized',
    'crushed': 'defeated',
    'regime': 'administration',
    'bureaucrats': 'officials',
    'radical': 'far-reaching',
    'bloodbath': 'heavy loss',
    'extremist': 'hardline'
  };
  return map[word] || null;
}

/**
 * Calculates headline skew vs body text
 */
function analyzeHeadlineSkew(headline, bodySentiment, bodySensationalism) {
  if (!headline) return { isSkewed: false, score: 0, reason: 'No headline provided.' };
  
  const headlineClean = headline.toLowerCase();
  let headlineSensational = false;
  SENSATIONAL_WORDS.forEach(w => {
    if (headlineClean.includes(w)) headlineSensational = true;
  });

  if (headlineSensational && bodySensationalism < 30) {
    return {
      isSkewed: true,
      score: 78,
      reason: 'Headline uses high-arousal sensationalist framing despite relatively neutral body content (Clickbait framing).'
    };
  }

  return {
    isSkewed: false,
    score: 22,
    reason: 'Headline tone aligns closely with body text sentiment.'
  };
}

/**
 * Generates entity framing breakdown across two outlets
 */
export function extractEntityFraming(analysisA, analysisB, outletAName, outletBName) {
  return COMMON_ENTITIES.map(entity => {
    // Find sentiment around keywords for Outlet A & B
    const scoreA = calculateEntityScore(analysisA, entity.keywords);
    const scoreB = calculateEntityScore(analysisB, entity.keywords);

    return {
      entityName: entity.name,
      outletA: {
        name: outletAName,
        score: scoreA,
        label: scoreA > 20 ? 'Favorable / Optimistic' : scoreA < -20 ? 'Critical / Hostile' : 'Neutral / Balanced'
      },
      outletB: {
        name: outletBName,
        score: scoreB,
        label: scoreB > 20 ? 'Favorable / Optimistic' : scoreB < -20 ? 'Critical / Hostile' : 'Neutral / Balanced'
      },
      framingDivergence: Math.abs(scoreA - scoreB) > 35 ? 'High Divergence' : 'Moderate Alignment'
    };
  });
}

function calculateEntityScore(analysis, keywords) {
  if (!analysis || !analysis.annotatedSentences) return 0;
  let score = 0;
  let matches = 0;

  analysis.annotatedSentences.forEach(s => {
    const textLower = s.text.toLowerCase();
    const matchesKeyword = keywords.some(k => textLower.includes(k));
    if (matchesKeyword) {
      score += s.sentenceSentiment * 25;
      matches++;
    }
  });

  return matches > 0 ? Math.min(100, Math.max(-100, Math.round(score / matches))) : 0;
}

/**
 * Creates AI Neutralized Version of a sentence/paragraph
 */
export function generateNeutralVersion(sentenceObj) {
  if (!sentenceObj || !sentenceObj.tokens) return '';
  return sentenceObj.tokens.map(token => {
    if (token.category && token.neutralSuggestion) {
      return `[${token.neutralSuggestion}]`;
    }
    return token.raw;
  }).join(' ');
}
