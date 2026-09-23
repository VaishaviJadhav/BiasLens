/**
 * Benchmark Multi-Outlet Benchmark Dataset
 * Features real-world multi-perspective article pairs covering the same event from different editorial stances.
 */

export const BENCHMARK_EVENTS = [
  {
    id: 'ai-act-2026',
    category: 'Technology Policy',
    title: 'Global Landmark AI Safety & Regulatory Accord Passed',
    summary: 'Comparing how progressive tech-critic outlets vs pro-market free-enterprise publications frame the new international AI regulations.',
    outletA: {
      name: 'Tech Horizon Daily',
      stance: 'Center-Left / Progressive Tech',
      stanceType: 'center-left',
      headline: 'Historic Win: Landmark AI Regulation Bill Passed to Tame Reckless Tech Bureaucrats and Protect Workers',
      author: 'Elena Rostova',
      date: 'July 24, 2026',
      content: `Lawmakers achieved a historic triumph today by enacting a landmark AI compliance scheme aimed at putting an end to reckless algorithms and corporate overreach. Proponents hailed the revolutionary legislation as a heroic defense of human labor against unchecked digital elites.

Under the new draconian mandates, tech cartels will face severe penalties if their autonomous models operate without strict oversight. Critics from Silicon Valley claimed the rules would spark chaos and destroy innovation, but consumer advocacy groups denounced these claims as cynical scaremongering by warmongers of unregulated capitalism.

The historic victory ensures that safety, worker dignity, and algorithmic transparency will finally shackle the terrifying expansion of unvetted artificial intelligence.`
    },
    outletB: {
      name: 'Capital & Commerce',
      stance: 'Center-Right / Pro-Market',
      stanceType: 'center-right',
      headline: 'Draconian AI Mandates Threaten Economic Booming and Spark Chilling Effect on Global Tech Innovation',
      author: 'Marcus Vance',
      date: 'July 24, 2026',
      content: `Government bureaucrats dealt a devastating hammer blow to the booming technology sector today by passing a sprawling, draconian AI regulatory bill. Industry leaders warned the catastrophic policy will throttle economic growth, impose crippling compliance costs, and hand an unprecedented victory to foreign rivals.

The radical regulation forces pioneering AI startups to submit to onerous government audits before releasing cutting-edge software. Economists warned that this bureaucratic scheme will paralyze capital investment and spark a nightmare exodus of top engineering talent to less hostile jurisdictions.

While administration officials foolishly boasted about safety benchmarks, market analysts predict the disastrous precedent will paralyze enterprise productivity and trigger widespread stagnation.`
    }
  },
  {
    id: 'climate-transition-2026',
    category: 'Environment & Energy',
    title: 'Clean Energy Infrastructure Mandate & Fossil Fuel Phase-Out',
    summary: 'Evaluating environmental advocacy framing vs industrial sector economic impact framing.',
    outletA: {
      name: 'The Eco Sentinel',
      stance: 'Left / Climate Advocacy',
      stanceType: 'left',
      headline: 'Visionary Climate Bill Triumphs Over Oil Cartel Propaganda to Accelerate Urgent Transition',
      author: 'Dr. Maya Lin',
      date: 'July 20, 2026',
      content: `In an unprecedented triumph for environmental justice, parliament enacted a visionary clean energy act designed to crush fossil fuel exploitation. The heroic mandate establishes ambitious carbon neutrality benchmarks despite furious lobbying from greedy oil executives and corporate polluters.

Activists celebrated the landmark vote as a heroic step toward repairing planetary damage caused by decades of reckless extraction. The law directs billions into solar and offshore wind infrastructure, putting an end to the toxic status quo enforced by energy cartels.

While fossil fuel zealots frantically spread misinformation about energy reliability, independent climate scientists confirmed the urgent necessity of this historic transition.`
    },
    outletB: {
      name: 'Industrial & Financial Review',
      stance: 'Right / Energy Sector',
      stanceType: 'right',
      headline: 'Radical Climate Mandate Fires Shocking Blow to Power Grid Reliability and Working-Class Budgets',
      author: 'Harrison Forde',
      date: 'July 20, 2026',
      content: `Radical environmental zealots rammed through a disastrous energy phase-out bill today, threatening severe energy shortages and skyrocketing utility bills for millions of hard-working families. 

The rash law imposes rigid mandates on regional grid operators while penalizing reliable fossil fuel providers. Energy sector executives denounced the agenda as an unfeasible political scheme that risks blackouts during peak winter seasons and threatens thousands of industrial manufacturing jobs.

Market analysts predictably warned that energy costs will soar, placing a heavy burden on low-income households while empowering foreign competitors unaffected by these self-inflicted economic shackles.`
    }
  },
  {
    id: 'central-bank-rates-2026',
    category: 'Global Economy',
    title: 'Central Bank Interest Rate Adjustment & Market Response',
    summary: 'Comparing monetary policy analysis from labor-focused perspective vs investor-market perspective.',
    outletA: {
      name: 'The Common Wealth Gazette',
      stance: 'Center-Left / Labor Focus',
      stanceType: 'center-left',
      headline: 'Central Bank Rate Hike Deals Punishing Blow to Struggling Families While Banking Elites Reap Profits',
      author: 'Sarah Jenkins',
      date: 'July 15, 2026',
      content: `The Federal Reserve dealt a ruthless blow to working-class homebuyers today by raising interest rates for the third consecutive quarter. The alarming move threatens to freeze housing affordability and stifle wage growth for middle-income households across the country.

Labor economists criticized the central bank for executing a blunt monetary hammer blow that burdens ordinary families while high-street banking syndicates enjoy record interest margin profits.

Despite signs that consumer inflation was already cooling naturally, central bank bureaucrats insisted on pushing mortgage costs to a twenty-year high, sparking widespread anxiety among prospective buyers.`
    },
    outletB: {
      name: 'Wall Street Chronicle',
      stance: 'Center / Financial Policy',
      stanceType: 'center',
      headline: 'Federal Reserve Enacts Measured Rate Hike to Anchor Inflation and Reinforce Market Stability',
      author: 'David Miller',
      date: 'July 15, 2026',
      content: `The Federal Reserve raised its benchmark interest rate by 25 basis points on Wednesday in a measured step to ensure long-term monetary stability and curb persistent inflationary pressures.

Chairman Powell emphasized during the press conference that the central bank remains committed to achieving a sustainable 2% inflation target while monitoring labor market resilience. Financial markets reacted with moderate gains as bond yields adjusted to the expected policy trajectory.

Economists noted that while borrowing costs for real estate and corporate credit will rise slightly, the decisive action reduces the risk of runaway inflation and supports overall economic equilibrium.`
    }
  }
];
