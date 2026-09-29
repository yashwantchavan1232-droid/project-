# 🚀 INSYS PRO v4.0 — Advanced Stock Market Intelligence System

[![Python Version](https://img.shields.io/badge/Python-3.8%2B-blue.svg)](https://python.org)
[![Framework](https://img.shields.io/badge/Framework-Flask%20%7C%20Scikit--Learn-purple.svg)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/License-Educational-green.svg)](#disclaimer)
[![Market](https://img.shields.io/badge/Market-NIFTY%20100%20(NSE)-cyan.svg)](#)

INSYS PRO v4.0 is a professional-grade, quantitative stock market intelligence platform designed for traders, investors, and quantitative analysts. It synthesizes **50+ technical indicators** across 5 distinct categories, applies **Random Forest Machine Learning** to forecast directional trends, and generates **5-tier signals** with confidence percentages (0–99%) and top 5 actionable reasons.

---

## 🌟 Key Features

### 1. Dual-Mode Data Engine & Fallback Architecture
- **Live Mode**: Fetches real-time candlestick quotes from Yahoo Finance (`yfinance`) for 100+ top Indian equities listed on the National Stock Exchange (NSE NIFTY 100).
- **Fallback Mode**: In offline environments or during network rate-limiting, the system automatically activates a deterministic stochastic engine (Geometric Brownian Motion + periodic cycles), ensuring 100% uninterrupted uptime with realistic prices, indicators, and signals.

### 2. Comprehensive 50+ Technical Indicators
- **Trend Indicators (12)**: SMA (20, 50, 200), EMA (12, 26, 50), Ichimoku Cloud (Tenkan, Kijun, Senkou A, Senkou B, Chikou), Parabolic SAR, ADX (14, +DI, -DI), Aroon (Up, Down, Oscillator), Supertrend (10, 3), Hull Moving Average (HMA 20), Triple EMA (TEMA 20), Composite Trend Score (-100 to +100).
- **Momentum Indicators (10)**: RSI (14), MACD (12, 26, 9 line, signal, histogram, trend), Stochastic Oscillator (%K, %D), Money Flow Index (MFI 14), Williams %R, Commodity Channel Index (CCI 20), Rate of Change (ROC 12), Awesome Oscillator (AO), Ultimate Oscillator (7, 14, 28), True Strength Index (TSI).
- **Volatility Indicators (9)**: Bollinger Bands (Upper, Middle, Lower, %B, Bandwidth), Average True Range (ATR 14), Volatility Percentage, Keltner Channels (Upper, Middle, Lower), Donchian Channels (Upper, Middle, Lower), Historical Volatility (30-day annualized), Chaikin Volatility.
- **Volume Indicators (9)**: VWAP (Volume Weighted Average Price), On-Balance Volume (OBV), OBV 20-SMA, Volume 20-SMA, Volume Spike Detection (> 40% surge), Chaikin Money Flow (CMF 20), Force Index (13), Accumulation/Distribution Line (ADL), Price Volume Trend (PVT), Ease of Movement (EOM 14).
- **Advanced & Risk Indicators (10)**: Fibonacci Retracement Levels (0%, 23.6%, 38.2%, 50%, 61.8%, 78.6%, 100%), 52-Week High & Low + Distance %, Classic Pivot Points (PP, R1–R3, S1–S3), Fibonacci Pivot Points, Sharpe Ratio Estimate, Beta vs Market, Maximum Drawdown (MDD), Risk Assessment (HIGH / MEDIUM / LOW).

### 3. Quantitative 5-Tier Signal Engine
- **STRONG BUY**: $\ge 85\%$ Confidence
- **BUY**: $70\% - 84\%$ Confidence
- **HOLD**: $45\% - 69\%$ Confidence
- **SELL**: $30\% - 44\%$ Confidence
- **STRONG SELL**: $< 30\%$ Confidence
- **Top 5 Actionable Drivers**: Every stock analysis exposes the 5 primary bullish or bearish technical reasons explaining the signal.

### 4. Machine Learning Module
- **Random Forest Classifier**: Trained on multi-indicator features to forecast 5-day directional movement (`UPTREND`, `DOWNTREND`, `SIDEWAYS`).
- **Probabilistic Matrix**: Computes next-day likelihood (Up %, Neutral %, Down %).
- **SHAP-Style Feature Importance**: Ranks indicators by predictive weight.

### 5. Cyberpunk Glassmorphism UI & Three.js 3D Background
- Deep space `#0a0a0f` canvas with floating 3D particle constellation and wireframe grid.
- Live clock with day, date, live seconds, and timezone (IST).
- 10-second automatic refresh with animated circular countdown and toggle switch.
- Scrolling stock marquee ticker with real-time quotes.
- Deep dive modal dialog inspecting all 50+ indicators, Fibonacci tables, and pivot levels.

---

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8 or higher
- Modern web browser (Chrome, Edge, Firefox, Safari)

### 1. Clone or Open Project Directory
```bash
cd c:\Users\yashw\OneDrive\Desktop\insys
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Launch Web Server & API
```bash
python stock_data_advanced.py 50 --api
```
Open your browser at:
**[http://localhost:5000](http://localhost:5000)**

### 4. Run Formatted Terminal Intelligence Report (CLI Mode)
```bash
python stock_data_advanced.py 20 --cli
```

### 5. Run Automated Self-Verification Suite
```bash
python stock_data_advanced.py --test
```

---

## 🌐 REST API Endpoints (9 Endpoints)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Web Application interface & API Documentation |
| `GET` | `/api/stocks` | Full list of stocks with 50+ indicators, signals, and ML predictions |
| `GET` | `/api/stocks/<symbol>` | Comprehensive single-stock dossier |
| `GET` | `/api/summary` | Aggregate market statistics, sentiment distribution, and top pick |
| `GET` | `/api/top5` | Top 5 ranked algorithmic recommendations |
| `GET` | `/api/health` | System health, uptime, engine mode (LIVE / FALLBACK), and universe size |
| `GET` | `/api/buy` | Filtered list of BUY and STRONG BUY recommendations |
| `GET` | `/api/search?q=<query>` | Search stocks by ticker, company name, or industry sector |
| `GET` | `/api/indicators/<symbol>` | Deep technical indicators breakdown for a specific stock |

---

## 📁 Project Architecture

```
c:\Users\yashw\OneDrive\Desktop\insys\
├── stock_data_advanced.py    # Python Flask backend, 50+ indicators, ML models, CLI report (1,820 lines)
├── index.html                # Semantic Glassmorphism HTML5 web application
├── style.css                 # Dark theme, Glassmorphism, animations, responsive CSS (2,367 lines)
├── script.js                 # Three.js 3D canvas, live clock, 10s auto-refresh, modal logic (1,563 lines)
├── requirements.txt          # Python dependencies
└── README.md                 # Complete documentation & usage guide
```

---

## ⚠️ Regulatory Disclaimer

> **IMPORTANT STATUTORY NOTICE**:
> 1. **EDUCATIONAL AND RESEARCH PURPOSE ONLY**: INSYS PRO v4.0 is an automated algorithmic simulation tool designed exclusively for academic, research, and technical analysis education.
> 2. **NOT FINANCIAL ADVICE**: Nothing contained in this application or API represents investment advice, tax advice, or a recommendation to buy or sell any financial instrument.
> 3. **SEBI NOTICE**: The developers and operators are **NOT** SEBI-registered investment advisors or research analysts. Always consult an authorized SEBI-registered financial advisor before making real-world investment decisions.
> 4. **MARKET RISK**: Trading and investing in equities and derivatives involve substantial risk of financial loss. Past performance, backtests, or algorithmic predictions do not guarantee future returns.
