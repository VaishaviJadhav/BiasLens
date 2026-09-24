import sys
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 750, "BiasLens — Project Documentation & Technical Overview")
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.5)
            self.line(54, 742, 558, 742)
            
        # Footer
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 36, page_str)
        self.drawString(54, 36, "BiasLens | Media Literacy & NLP Bias Analyzer")
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.5)
        self.line(54, 48, 558, 48)
        
        self.restoreState()

def build_pdf(filename="BiasLens_Project_Documentation.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    
    styles = getSampleStyleSheet()
    
    # Custom palette
    primary = colors.HexColor("#1e293b")
    brand_red = colors.HexColor("#e03535")
    brand_blue = colors.HexColor("#2563eb")
    accent_cyan = colors.HexColor("#0891b2")
    bg_light = colors.HexColor("#f8fafc")
    text_dark = colors.HexColor("#0f172a")
    text_muted = colors.HexColor("#475569")
    border_color = colors.HexColor("#cbd5e1")
    
    # Custom Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary,
        spaceAfter=4
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=brand_blue,
        spaceAfter=15
    )
    
    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=primary,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=brand_blue,
        spaceBefore=10,
        spaceAfter=6,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=text_dark,
        spaceAfter=8
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=body_style,
        leftIndent=14,
        firstLineIndent=-10,
        spaceAfter=4
    )
    
    callout_style = ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#1e3a8a"),
        spaceAfter=0
    )
    
    code_style = ParagraphStyle(
        'CodeSnippet',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#0f172a"),
        spaceAfter=0
    )
    
    story = []
    
    # Header Banner
    story.append(Paragraph("<font color='#e03535'><b>Bias</b></font><b>Lens</b> — Project Documentation & Mentor Presentation", title_style))
    story.append(Paragraph("<b>Comprehensive Overview, Problem Statement, System Architecture, Features & Client-Side NLP Engine Logic</b>", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=brand_blue, spaceBefore=0, spaceAfter=12))
    
    # 1. Project Overview & Vision
    story.append(Paragraph("1. Project Overview & Vision", h1_style))
    story.append(Paragraph(
        "<b>BiasLens</b> is an open-source, media-literacy web application designed to empower readers by revealing how different news outlets frame the exact same real-world event. "
        "Through a side-by-side article reader, real-time natural language processing (NLP), interactive 3D stacked benchmark cards, and Explainable AI (XAI) tooltips, BiasLens makes media bias, loaded phrasing, and editorial framing transparent, measurable, and easily understandable.",
        body_style
    ))
    
    # Quick Summary Table Box
    meta_data = [
        [Paragraph("<b>Project Name:</b>", body_style), Paragraph("BiasLens (NLP Media Literacy Analyzer)", body_style)],
        [Paragraph("<b>Target Audience:</b>", body_style), Paragraph("Students, Journalists, Researchers, General Public seeking balanced media consumption", body_style)],
        [Paragraph("<b>Core Execution:</b>", body_style), Paragraph("100% Client-side in-browser NLP execution (Zero backend latency, total user privacy)", body_style)],
        [Paragraph("<b>Key Innovation:</b>", body_style), Paragraph("Interactive 3D article card stack, dual-panel reader, XAI word neutralizer popovers", body_style)]
    ]
    meta_table = Table(meta_data, colWidths=[120, 384])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg_light),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('INNERGRID', (0,0), (-1,-1), 0.5, border_color),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 10))
    
    # 2. Problem Statement & Need
    story.append(Paragraph("2. Problem Statement & Why We Need BiasLens", h1_style))
    story.append(Paragraph(
        "Modern media consumers face unprecedented challenges due to algorithmic echo chambers, partisan media polarization, and high-intensity sensationalism:",
        body_style
    ))
    story.append(Paragraph("• <b>Information Echo Chambers & Confirmation Bias:</b> Most readers stick to single news outlets that reinforce their pre-existing beliefs, remaining unaware of alternative viewpoints or loaded adjectives.", bullet_style))
    story.append(Paragraph("• <b>Sensationalism & Clickbait Framing:</b> Outlets frequently use high-emotion, sensationalist words (e.g. <i>'catastrophic'</i>, <i>'slammed'</i>, <i>'draconian'</i>) to drive clicks rather than report objective facts.", bullet_style))
    story.append(Paragraph("• <b>Selective Omission & Framing Divergence:</b> Two outlets covering the same legislative vote or economic policy will characterize key actors and institutions in opposite ways (e.g. <i>'Historic Win to Protect Workers'</i> vs. <i>'Draconian Scheme Throttle Growth'</i>).", bullet_style))
    story.append(Paragraph("• <b>Lack of Real-Time Media Literacy Tools:</b> Consumers lack easy-to-use, visual tools to compare news coverage side-by-side in real time and see <i>why</i> specific words carry bias.", bullet_style))
    story.append(Spacer(1, 8))
    
    # Callout Box: Why Client-Side?
    callout_data = [[
        Paragraph("<b>💡 Why 100% Client-Side Architecture?</b><br/>By building our NLP engine natively in browser JavaScript, BiasLens requires zero backend server costs, operates instantly with no network latency, and ensures total user privacy — as article text is never sent to external third-party tracking servers.", callout_style)
    ]]
    callout_table = Table(callout_data, colWidths=[504])
    callout_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#eff6ff")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#bfdbfe")),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(callout_table)
    story.append(Spacer(1, 10))
    
    # 3. Key Objectives
    story.append(Paragraph("3. Core Objectives", h1_style))
    story.append(Paragraph("1. <b>Side-by-Side Comparison:</b> Render news articles on identical events in parallel to contrast headlines, tone, and framing.", bullet_style))
    story.append(Paragraph("2. <b>Real-Time Language Scanning:</b> Automatically highlight sensationalism, loaded political terms, and subjective opinion markers.", bullet_style))
    story.append(Paragraph("3. <b>Explainable AI (XAI):</b> Allow users to click any highlighted word to view feature attribution details and see neutral alternative phrasing.", bullet_style))
    story.append(Paragraph("4. <b>Quantitative Bias Metrics:</b> Display visual charts for political stance spectrums, sensationalism indices, factual objectivity ratings, and entity alignment matrices.", bullet_style))
    story.append(Paragraph("5. <b>Custom Article Analysis:</b> Provide a dedicated floating glass panel where users can paste any two news articles for instant analysis.", bullet_style))
    story.append(Spacer(1, 10))
    
    # 4. Tech Stack Used
    story.append(Paragraph("4. Technology Stack", h1_style))
    tech_data = [
        [Paragraph("<b>Layer</b>", h2_style), Paragraph("<b>Technology / Tool</b>", h2_style), Paragraph("<b>Role & Purpose</b>", h2_style)],
        [Paragraph("<b>Core Frontend</b>", body_style), Paragraph("React 18 + Vite", body_style), Paragraph("Component-based architecture, fast state management, modular components, instant HMR", body_style)],
        [Paragraph("<b>Styling & Design</b>", body_style), Paragraph("Vanilla CSS (Glassmorphism)", body_style), Paragraph("Custom dark design system (`#080a10`), backdrop blur (`blur(24px)`), grid mesh overlays, 3D card stack", body_style)],
        [Paragraph("<b>Icons</b>", body_style), Paragraph("Lucide React", body_style), Paragraph("Clean, modern SVG icons for UI indicators, badges, and action buttons", body_style)],
        [Paragraph("<b>NLP Computing</b>", body_style), Paragraph("JavaScript NLP Engine (`nlpEngine.js`)", body_style), Paragraph("Custom regex tokenization, lexicon dictionaries, sentiment analysis, headline skew, entity alignment", body_style)],
        [Paragraph("<b>Graphics & Assets</b>", body_style), Paragraph("AI Generated Artwork", body_style), Paragraph("Custom editorial artwork thumbnails for AI Act, Climate Policy, and Global Economy cards", body_style)]
    ]
    tech_table = Table(tech_data, colWidths=[100, 150, 254])
    tech_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#e2e8f0")),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('INNERGRID', (0,0), (-1,-1), 0.5, border_color),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(tech_table)
    story.append(Spacer(1, 12))
    
    # 5. Logic of the NLP Engine (Explained in Easy Terms)
    story.append(Paragraph("5. Logic of the NLP Engine (Easy Explanation)", h1_style))
    story.append(Paragraph(
        "The NLP engine in BiasLens evaluates news text through a 6-stage algorithmic pipeline:",
        body_style
    ))
    
    story.append(Paragraph("Stage 1: Tokenization & Normalization", h2_style))
    story.append(Paragraph(
        "The article body text is split into individual sentences using sentence boundary detection regex (<code>/[^.!?]+[.!?]+/g</code>). Each sentence is then broken down into cleaned lowercase word tokens while retaining punctuation for smooth rendering.",
        body_style
    ))
    
    story.append(Paragraph("Stage 2: Lexicon & Dictionary Matching", h2_style))
    story.append(Paragraph(
        "Each word token is checked against curated linguistic dictionaries:",
        body_style
    ))
    story.append(Paragraph("• <font color='#e03535'><b>Sensational Words:</b></font> Words designed to provoke strong emotional arousal (e.g., <i>devastating, catastrophic, slammed, bloodbath, chaos, crushed</i>).", bullet_style))
    story.append(Paragraph("• <font color='#e8a82b'><b>Loaded Words:</b></font> Words carrying heavy political or ideological framing (e.g., <i>draconian, bureaucrats, cartel, regime, radical, syndicate</i>).", bullet_style))
    story.append(Paragraph("• <font color='#7c6af0'><b>Opinion Markers:</b></font> Words asserting subjective editorial judgment (e.g., <i>clearly, obviously, tragically, foolishly, shockingly</i>).", bullet_style))
    
    story.append(Paragraph("Stage 3: Sentiment & Objectivity Scoring", h2_style))
    story.append(Paragraph(
        "Words are evaluated against positive lexicon (<i>historic, triumph, landmark, pioneering</i>) and negative lexicon (<i>collapse, crisis, bleak, ruinous</i>) to compute sentence-level and article-level net sentiment scores.",
        body_style
    ))
    
    story.append(Spacer(1, 4))
    # Formula Box
    formula_code = """Sensationalism Index = min(100, (Sensational Words / Total Words) * 1200)
Loaded Language Index = min(100, (Loaded Words / Total Words) * 1400)
Objectivity Rating    = max(0, 100 - (0.4 * Sensationalism + 0.4 * Loaded + 0.2 * Subjectivity))"""
    
    formula_table = Table([[Paragraph(formula_code.replace("\n", "<br/>"), code_style)]], colWidths=[504])
    formula_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f1f5f9")),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(formula_table)
    story.append(Spacer(1, 8))
    
    story.append(Paragraph("Stage 4: Headline vs. Body Skew Analysis", h2_style))
    story.append(Paragraph(
        "BiasLens checks if the headline uses high-arousal clickbait terms while the underlying body text remains neutral. If headline sensationalism exceeds body sensationalism significantly, a <b>Headline Skew Alert</b> is raised.",
        body_style
    ))
    
    story.append(Paragraph("Stage 5: Entity Framing Divergence Matrix", h2_style))
    story.append(Paragraph(
        "The engine identifies key actors (e.g. <i>'Government & Policymakers'</i>, <i>'AI Act'</i>, <i>'Climate Policy'</i>, <i>'Economy & Central Bank'</i>). It extracts all sentences mentioning these entity keywords and computes the localized sentiment score to determine whether each outlet frames that specific entity as <b>Favorable</b>, <b>Critical</b>, or <b>Neutral</b>.",
        body_style
    ))
    
    story.append(Paragraph("Stage 6: Explainable AI (XAI) & Neutralizer Suggestions", h2_style))
    story.append(Paragraph(
        "When a user clicks on any flagged word in the text, an XAI popover displays feature attribution reasoning and automatically maps the word to a neutral substitute (e.g. replacing <i>'slammed'</i> with <i>'criticized'</i>, <i>'draconian'</i> with <i>'strict'</i>, <i>'bureaucrats'</i> with <i>'officials'</i>).",
        body_style
    ))
    story.append(Spacer(1, 10))
    
    # 6. Key UI Modules & Features
    story.append(Paragraph("6. Key UI Modules & Application Features", h1_style))
    story.append(Paragraph("1. <b>3D Interactive Article Card Stack:</b> Fanned horizontal cards in the hero section displaying benchmark articles with artwork, category badges, and bias rating pills.", bullet_style))
    story.append(Paragraph("2. <b>Sticky Glassmorphic Navbar:</b> Features brand identity (Bias in red, Lens in white), live model indicator badge, quick reset button, and custom article trigger button.", bullet_style))
    story.append(Paragraph("3. <b>Dual Article Reader Panel:</b> Side-by-side article reader with filter pills (All, Sensational, Loaded, Subjective) and interactive word highlights.", bullet_style))
    story.append(Paragraph("4. <b>XAI Popover Modal:</b> Interactive popover explaining why a highlighted token was marked and providing a neutral rewrite.", bullet_style))
    story.append(Paragraph("5. <b>Comparative Analytics Dashboard:</b> Includes Political Stance Spectrum bar gauge, loaded language progress meters, and objectivity ratings.", bullet_style))
    story.append(Paragraph("6. <b>Entity & Keyword Matrix:</b> Matrix comparing how specific entities are framed across outlets.", bullet_style))
    story.append(Paragraph("7. <b>Custom Article Floating Panel:</b> Modal dialog allowing users to input custom article pairs for instant NLP analysis.", bullet_style))
    story.append(Spacer(1, 10))
    
    # 7. Summary for Presentation to Mentor
    story.append(Paragraph("7. Summary & Presentation Talking Points for Mentor", h1_style))
    story.append(Paragraph(
        "When presenting BiasLens to your mentor, highlight these 4 key takeaways:",
        body_style
    ))
    story.append(Paragraph("1. <b> Solves a Real Social Problem:</b> Improves media literacy by helping users identify emotional manipulation and biased framing in news.", bullet_style))
    story.append(Paragraph("2. <b> Zero-Cost & Private Architecture:</b> 100% client-side execution means instant speed, zero server bills, and total privacy for readers.", bullet_style))
    story.append(Paragraph("3. <b> Modern Premium Aesthetics:</b> Implements glassmorphism, 3D article card stacks, and curated color tokens for a stunning user experience.", bullet_style))
    story.append(Paragraph("4. <b> Explainable & Actionable:</b> Doesn't just call an article 'biased'; it pinpoints exact words, explains *why*, and suggests neutral alternatives.", bullet_style))
    
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated PDF: {filename}")

if __name__ == '__main__':
    build_pdf()
