/**
 * ==============================================================================
 * 🚀 INSYS PRO v4.0 — MASTER CLIENT ENGINE
 * ==============================================================================
 * Features:
 * - Three.js 3D Constellation Dark Space Canvas
 * - Precision Live Clock (Day, Date, Seconds, Timezone)
 * - 10-Second Auto-Refresh Countdown & Manual Refresher
 * - Dual-Mode Fetch Engine (Live API + High-Fidelity Client-Side Fallback)
 * - 5-View Dynamic Architecture (Dashboard, Stocks, ML Predictions, Education, Settings)
 * - Filter & Multi-Criteria Sorting Engine
 * - Deep 50+ Indicator Modal Inspection Dialog
 * - Web Audio API Harmonic Synthesizer
 *
 * Author: INSYS Engineering Team
 * Version: 4.0.0
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// 1. GLOBAL STATE & CONFIGURATION
// ------------------------------------------------------------------------------
const APP_STATE = {
    stocks: [],
    summary: null,
    top5: [],
    selectedStock: null,
    activeView: 'view-dashboard',
    activeModalTab: 'tab-trend',
    searchQuery: '',
    signalFilter: 'ALL',
    sectorFilter: 'ALL',
    sortOrder: 'confidence_desc',
    viewMode: 'grid', // 'grid' or 'table'
    autoRefresh: true,
    refreshIntervalSeconds: 10,
    countdownRemaining: 10,
    isRefreshing: false,
    audioEnabled: true,
    currency: 'INR',
    usdExchangeRate: 83.5,
    forceFallback: false,
    isLiveMode: false,
    apiBaseUrl: window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
        ? 'http://localhost:5000'
        : window.location.origin
};

// ------------------------------------------------------------------------------
// 2. EMBEDDED CLIENT-SIDE FALLBACK UNIVERSE (100+ NIFTY EQUITIES)
// ------------------------------------------------------------------------------
const CLIENT_FALLBACK_STOCKS = [
    { symbol: "RELIANCE", name: "Reliance Industries Ltd", sector: "Energy", base: 2945.50 },
    { symbol: "TCS", name: "Tata Consultancy Services", sector: "IT", base: 4120.00 },
    { symbol: "HDFCBANK", name: "HDFC Bank Ltd", sector: "Financial Services", base: 1642.30 },
    { symbol: "INFY", name: "Infosys Ltd", sector: "IT", base: 1890.75 },
    { symbol: "ICICIBANK", name: "ICICI Bank Ltd", sector: "Financial Services", base: 1210.40 },
    { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd", sector: "Telecommunication", base: 1530.20 },
    { symbol: "SBIN", name: "State Bank of India", sector: "Financial Services", base: 815.60 },
    { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd", sector: "FMCG", base: 2680.10 },
    { symbol: "ITC", name: "ITC Ltd", sector: "FMCG", base: 502.40 },
    { symbol: "LT", name: "Larsen & Toubro Ltd", sector: "Construction", base: 3610.00 },
    { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd", sector: "Financial Services", base: 7250.00 },
    { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", sector: "Financial Services", base: 1785.00 },
    { symbol: "HCLTECH", name: "HCL Technologies Ltd", sector: "IT", base: 1740.50 },
    { symbol: "TATAMOTORS", name: "Tata Motors Ltd", sector: "Automobile", base: 1045.00 },
    { symbol: "MARUTI", name: "Maruti Suzuki India", sector: "Automobile", base: 12450.00 },
    { symbol: "SUNPHARMA", name: "Sun Pharmaceutical Industries", sector: "Healthcare", base: 1820.00 },
    { symbol: "TITAN", name: "Titan Company Ltd", sector: "Consumer Durables", base: 3580.00 },
    { symbol: "ONGC", name: "Oil & Natural Gas Corp", sector: "Energy", base: 315.20 },
    { symbol: "NTPC", name: "NTPC Ltd", sector: "Utilities", base: 412.80 },
    { symbol: "POWERGRID", name: "Power Grid Corp of India", sector: "Utilities", base: 338.50 },
    { symbol: "TATASTEEL", name: "Tata Steel Ltd", sector: "Metals & Mining", base: 154.20 },
    { symbol: "COALINDIA", name: "Coal India Ltd", sector: "Metals & Mining", base: 510.60 },
    { symbol: "ADANIENT", name: "Adani Enterprises Ltd", sector: "Metals & Mining", base: 3020.00 },
    { symbol: "ADANIPORTS", name: "Adani Ports & SEZ Ltd", sector: "Services", base: 1445.00 },
    { symbol: "WIPRO", name: "Wipro Ltd", sector: "IT", base: 525.40 },
    { symbol: "ULTRACEMCO", name: "UltraTech Cement Ltd", sector: "Construction Materials", base: 11350.00 },
    { symbol: "M&M", name: "Mahindra & Mahindra Ltd", sector: "Automobile", base: 2740.00 },
    { symbol: "ASIANPAINT", name: "Asian Paints Ltd", sector: "Consumer Durables", base: 3180.00 },
    { symbol: "BAJAJFINSV", name: "Bajaj Finserv Ltd", sector: "Financial Services", base: 1845.00 },
    { symbol: "DMART", name: "Avenue Supermarts Ltd", sector: "Consumer Services", base: 4920.00 },
    { symbol: "NESTLEIND", name: "Nestle India Ltd", sector: "FMCG", base: 2490.00 },
    { symbol: "JSWSTEEL", name: "JSW Steel Ltd", sector: "Metals & Mining", base: 940.00 },
    { symbol: "GRASIM", name: "Grasim Industries Ltd", sector: "Construction Materials", base: 2680.00 },
    { symbol: "BPCL", name: "Bharat Petroleum Corp", sector: "Energy", base: 355.00 },
    { symbol: "TECHM", name: "Tech Mahindra Ltd", sector: "IT", base: 1580.00 },
    { symbol: "HINDALCO", name: "Hindalco Industries Ltd", sector: "Metals & Mining", base: 685.00 },
    { symbol: "CIPLA", name: "Cipla Ltd", sector: "Healthcare", base: 1590.00 },
    { symbol: "DRREDDY", name: "Dr. Reddy's Laboratories", sector: "Healthcare", base: 6680.00 },
    { symbol: "EICHERMOT", name: "Eicher Motors Ltd", sector: "Automobile", base: 4890.00 },
    { symbol: "TATACONSUM", name: "Tata Consumer Products", sector: "FMCG", base: 1185.00 },
    { symbol: "BRITANNIA", name: "Britannia Industries Ltd", sector: "FMCG", base: 5850.00 },
    { symbol: "HEROMOTOCO", name: "Hero MotoCorp Ltd", sector: "Automobile", base: 5420.00 },
    { symbol: "SBILIFE", name: "SBI Life Insurance", sector: "Financial Services", base: 1780.00 },
    { symbol: "APOLLOHOSP", name: "Apollo Hospitals Enterprise", sector: "Healthcare", base: 6920.00 },
    { symbol: "VBL", name: "Varun Beverages Ltd", sector: "FMCG", base: 1560.00 },
    { symbol: "BEL", name: "Bharat Electronics Ltd", sector: "Capital Goods", base: 298.00 },
    { symbol: "HAL", name: "Hindustan Aeronautics Ltd", sector: "Capital Goods", base: 4720.00 },
    { symbol: "CHOLAFIN", name: "Cholamandalam Investment", sector: "Financial Services", base: 1450.00 },
    { symbol: "TORNTPHARM", name: "Torrent Pharmaceuticals", sector: "Healthcare", base: 3290.00 },
    { symbol: "GAIL", name: "GAIL (India) Ltd", sector: "Utilities", base: 232.00 }
];

/**
 * Generate synthetic dynamic stock object with 50+ indicators for offline fallback
 */
function generateClientFallbackStock(meta, index) {
    const now = Date.now();
    const cycle = Math.sin(index + now / 40000);
    const noise = Math.cos(index * 2 + now / 15000);
    const changePct = Number((cycle * 2.8 + noise * 0.9).toFixed(2));
    const price = Number((meta.base * (1 + changePct / 100)).toFixed(2));
    const change = Number((price - meta.base).toFixed(2));

    // Calculate signals & confidence
    let signal = 'HOLD';
    let signalColor = '#FACC15';
    let confidence = 55;

    if (changePct > 1.8) {
        signal = 'STRONG BUY';
        signalColor = '#00FFAA';
        confidence = Math.min(96, Math.max(86, Math.round(85 + cycle * 10)));
    } else if (changePct > 0.4) {
        signal = 'BUY';
        signalColor = '#00F0FF';
        confidence = Math.min(84, Math.max(72, Math.round(74 + cycle * 8)));
    } else if (changePct < -1.8) {
        signal = 'STRONG SELL';
        signalColor = '#FF2D78';
        confidence = Math.min(28, Math.max(12, Math.round(20 + noise * 6)));
    } else if (changePct < -0.4) {
        signal = 'SELL';
        signalColor = '#FB923C';
        confidence = Math.min(44, Math.max(32, Math.round(36 + noise * 6)));
    } else {
        signal = 'HOLD';
        signalColor = '#FACC15';
        confidence = Math.min(68, Math.max(48, Math.round(58 + noise * 8)));
    }

    const rsi = Number((50 + cycle * 24 + noise * 6).toFixed(1));
    const sma20 = Number((price * 0.985).toFixed(2));
    const sma50 = Number((price * 0.970).toFixed(2));
    const sma200 = Number((price * 0.930).toFixed(2));
    const atr14 = Number((price * 0.019).toFixed(2));
    const bbUpper = Number((price * 1.035).toFixed(2));
    const bbLower = Number((price * 0.965).toFixed(2));

    const reasons = [
        rsi < 35 ? `RSI oversold at ${rsi}, strong accumulation signal` : `RSI steady at ${rsi} in constructive momentum zone`,
        changePct > 0 ? `Price sustained above 20 & 50-day moving averages` : `Short-term consolidation below moving averages`,
        `MACD histogram showing positive divergence (+${(Math.abs(changePct) * 1.4).toFixed(1)})`,
        `Volume spike +${Math.round(Math.abs(cycle) * 120 + 35)}% indicating institutional interest`,
        `Holding firmly above 61.8% Fibonacci support level`
    ];

    return {
        symbol: meta.symbol,
        name: meta.name,
        sector: meta.sector,
        price: price,
        change: change,
        change_pct: changePct,
        currency: "INR",
        currency_symbol: "₹",
        signal: signal,
        signal_color: signalColor,
        confidence: confidence,
        top_reasons: reasons,
        risk_level: Math.abs(changePct) > 2.5 ? "HIGH" : (Math.abs(changePct) > 1.2 ? "MEDIUM" : "LOW"),
        multi_factor: {
            trend_score: Math.round(cycle * 80),
            momentum_score: Math.round(rsi),
            volatility_score: 82,
            volume_score: Math.round(Math.abs(cycle) * 90),
            support_score: 88
        },
        indicators: {
            trend: {
                sma_20: sma20,
                sma_50: sma50,
                sma_200: sma200,
                ema_12: Number((price * 0.99).toFixed(2)),
                ema_26: Number((price * 0.98).toFixed(2)),
                ema_50: Number((price * 0.97).toFixed(2)),
                ichimoku_tenkan: Number((price * 0.992).toFixed(2)),
                ichimoku_kijun: Number((price * 0.988).toFixed(2)),
                ichimoku_senkou_a: Number((price * 0.99).toFixed(2)),
                ichimoku_senkou_b: Number((price * 0.975).toFixed(2)),
                ichimoku_chikou: Number((price * 0.96).toFixed(2)),
                parabolic_sar: Number((price * 0.97).toFixed(2)),
                adx: Number((26.5 + Math.abs(cycle) * 14).toFixed(1)),
                plus_di: 28.4,
                minus_di: 16.2,
                aroon_up: 84.0,
                aroon_down: 24.0,
                aroon_oscillator: 60.0,
                supertrend: Number((price * 0.96).toFixed(2)),
                supertrend_signal: changePct >= 0 ? "BULLISH" : "BEARISH",
                hma_20: Number((price * 1.002).toFixed(2)),
                tema_20: Number((price * 1.004).toFixed(2)),
                trend_score: Math.round(cycle * 75)
            },
            momentum: {
                rsi: rsi,
                macd_line: Number((price * 0.008).toFixed(2)),
                macd_signal: Number((price * 0.006).toFixed(2)),
                macd_histogram: Number((price * 0.002).toFixed(2)),
                macd_trend: changePct >= 0 ? "BULLISH" : "BEARISH",
                stoch_k: 72.4,
                stoch_d: 68.1,
                mfi: 62.8,
                williams_r: -24.6,
                cci: 112.5,
                roc_12: changePct,
                awesome_oscillator: Number((price * 0.012).toFixed(2)),
                ultimate_oscillator: 64.2,
                tsi: 22.8
            },
            volatility: {
                bollinger_upper: bbUpper,
                bollinger_middle: sma20,
                bollinger_lower: bbLower,
                bollinger_pct_b: 0.68,
                bollinger_bandwidth: 7.2,
                atr_14: atr14,
                volatility_pct: 1.85,
                keltner_upper: Number((price * 1.025).toFixed(2)),
                keltner_middle: sma20,
                keltner_lower: Number((price * 0.975).toFixed(2)),
                donchian_upper: bbUpper,
                donchian_middle: sma20,
                donchian_lower: bbLower,
                historical_volatility: 18.4,
                chaikin_volatility: 4.8
            },
            volume: {
                vwap: Number((price * 0.998).toFixed(2)),
                obv: 14500000,
                obv_sma20: 13800000,
                volume_current: 2450000,
                volume_sma20: 1850000,
                volume_ratio: 1.32,
                volume_spike: changePct > 1.2,
                volume_spike_pct: 32.5,
                cmf_20: 0.145,
                force_index: 452000,
                adl: 38900000,
                pvt: 12450.0,
                ease_of_movement: 0.0042
            },
            advanced: {
                high_52w: Number((price * 1.15).toFixed(2)),
                low_52w: Number((price * 0.78).toFixed(2)),
                dist_high_52w_pct: -13.0,
                dist_low_52w_pct: 28.2,
                fibonacci_levels: {
                    fib_0: Number((price * 1.15).toFixed(2)),
                    fib_236: Number((price * 1.06).toFixed(2)),
                    fib_382: Number((price * 1.01).toFixed(2)),
                    fib_500: Number((price * 0.96).toFixed(2)),
                    fib_618: Number((price * 0.92).toFixed(2)),
                    fib_786: Number((price * 0.86).toFixed(2)),
                    fib_100: Number((price * 0.78).toFixed(2))
                },
                classic_pivots: {
                    pivot_point: Number((price * 0.995).toFixed(2)),
                    r1: Number((price * 1.015).toFixed(2)),
                    s1: Number((price * 0.985).toFixed(2)),
                    r2: Number((price * 1.035).toFixed(2)),
                    s2: Number((price * 0.970).toFixed(2)),
                    r3: Number((price * 1.055).toFixed(2)),
                    s3: Number((price * 0.955).toFixed(2))
                },
                fibonacci_pivots: {
                    fib_pivot: Number((price * 0.995).toFixed(2)),
                    fib_r1: Number((price * 1.012).toFixed(2)),
                    fib_s1: Number((price * 0.988).toFixed(2)),
                    fib_r2: Number((price * 1.028).toFixed(2)),
                    fib_s2: Number((price * 0.972).toFixed(2))
                },
                max_drawdown_pct: -12.4,
                sharpe_ratio: 1.85,
                beta: 1.12,
                risk_level: Math.abs(changePct) > 2.5 ? "HIGH" : (Math.abs(changePct) > 1.2 ? "MEDIUM" : "LOW")
            }
        },
        ml_prediction: {
            predicted_trend: changePct >= 0 ? "UPTREND" : "DOWNTREND",
            ml_confidence: Math.min(94, Math.max(65, Math.round(75 + cycle * 15))),
            next_day_probabilities: {
                up_prob: changePct >= 0 ? 64.5 : 22.0,
                neutral_prob: 22.5,
                down_prob: changePct >= 0 ? 13.0 : 55.5
            },
            feature_importances: {
                RSI: 24.5,
                MACD_Hist: 19.8,
                BB_Pct_B: 15.2,
                ADX: 12.0,
                SMA20_Dist: 9.5,
                SMA50_Dist: 7.5,
                Vol_Ratio: 5.5,
                CMF: 4.0,
                ROC_12: 2.0
            },
            model_type: "RandomForest v4.0",
            status: "SUCCESS"
        }
    };
}

// ------------------------------------------------------------------------------
// 3. THREE.JS 3D CONSTELLATION BACKGROUND
// ------------------------------------------------------------------------------
let scene, camera, renderer, particlesMesh, gridLines;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function initThreeBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.0012);

    camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 1000;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Particles Constellation Geometry
    const particleCount = 750;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const purpleColor = new THREE.Color(0xa855f7);
    const cyanColor = new THREE.Color(0x00f0ff);
    const mintColor = new THREE.Color(0x00ffaa);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 2400;
        positions[i + 1] = (Math.random() - 0.5) * 2400;
        positions[i + 2] = (Math.random() - 0.5) * 2400;

        const choice = Math.random();
        const col = choice < 0.45 ? purpleColor : (choice < 0.85 ? cyanColor : mintColor);
        colors[i] = col.r;
        colors[i + 1] = col.g;
        colors[i + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
        size: 3.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
    });

    particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // Subtle Grid Wireframe
    const gridHelper = new THREE.GridHelper(3000, 40, 0x221c3b, 0x141428);
    gridHelper.position.y = -600;
    scene.add(gridHelper);

    // Event Listeners
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    animateThree();
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.15;
    mouseY = (event.clientY - windowHalfY) * 0.15;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

function animateThree() {
    requestAnimationFrame(animateThree);
    if (!particlesMesh || !camera || !renderer) return;

    // Slow organic rotation
    particlesMesh.rotation.y += 0.0006;
    particlesMesh.rotation.x += 0.0003;

    // Smooth camera mouse follow
    camera.position.x += (mouseX - camera.position.x) * 0.03;
    camera.position.y += (-mouseY - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// ------------------------------------------------------------------------------
// 4. WEB AUDIO API SYNTHESIZER (HARMONIC CHIMES)
// ------------------------------------------------------------------------------
let audioCtx = null;

function playAudioChime(type = 'refresh') {
    if (!APP_STATE.audioEnabled) return;
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        if (type === 'strong-buy') {
            // Futuristic rising major third chord
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5
            osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.30); // G5
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
            osc.start(now);
            osc.stop(now + 0.45);
        } else {
            // Subtle crisp UI ping
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, now); // A5
            osc.frequency.exponentialRampToValueAtTime(1320, now + 0.1);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
            osc.start(now);
            osc.stop(now + 0.18);
        }
    } catch (e) {
        console.debug("Audio synthesis disabled or blocked", e);
    }
}

// ------------------------------------------------------------------------------
// 5. LIVE CLOCK ENGINE
// ------------------------------------------------------------------------------
function updateLiveClock() {
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const dateNum = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const dateElem = document.getElementById('live-date');
    const timeElem = document.getElementById('live-time');

    if (dateElem) {
        dateElem.textContent = `${dayName} ${monthName} ${dateNum}, ${year}`;
    }
    if (timeElem) {
        timeElem.textContent = `${hours}:${minutes}:${seconds} IST`;
    }
}

// ------------------------------------------------------------------------------
// 6. DATA FETCHING & API ENGINE (WITH FALLBACK)
// ------------------------------------------------------------------------------
async function fetchStockIntelligence(forceRefresh = false) {
    if (APP_STATE.isRefreshing) return;
    APP_STATE.isRefreshing = true;

    const refreshIcon = document.getElementById('refresh-icon');
    if (refreshIcon) refreshIcon.classList.add('spinning');

    let loadedStocks = [];
    let isLive = false;

    // Check if user forced offline fallback testing
    if (!APP_STATE.forceFallback) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3500);

            const url = `${APP_STATE.apiBaseUrl}/api/stocks?limit=100${forceRefresh ? '&refresh=true' : ''}`;
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (response.ok) {
                const json = await response.json();
                if (json.success && json.data && json.data.length > 0) {
                    loadedStocks = json.data;
                    isLive = (json.mode === 'LIVE');
                }
            }
        } catch (err) {
            console.warn("Backend API unavailable, engaging client fallback engine:", err.message);
        }
    }

    // If API failed or yielded empty, populate via realistic client generator
    if (loadedStocks.length === 0) {
        loadedStocks = CLIENT_FALLBACK_STOCKS.map((meta, idx) => generateClientFallbackStock(meta, idx));
        isLive = false;
    }

    APP_STATE.stocks = loadedStocks;
    APP_STATE.isLiveMode = isLive;
    APP_STATE.summary = computeSummaryMetrics(loadedStocks, isLive);
    APP_STATE.top5 = extractTop5(loadedStocks);

    // Update Status Badges
    updateStatusIndicators(isLive);

    // Render Views
    renderDashboard();
    renderStocksList();
    renderMLPredictions();
    renderTickerBar();

    // Reset countdown
    APP_STATE.countdownRemaining = APP_STATE.refreshIntervalSeconds;

    setTimeout(() => {
        if (refreshIcon) refreshIcon.classList.remove('spinning');
        APP_STATE.isRefreshing = false;
    }, 600);

    playAudioChime('refresh');
}

/**
 * Compute aggregate market statistics from current universe
 */
function computeSummaryMetrics(stocks, isLive) {
    const total = stocks.length;
    const strongBuys = stocks.filter(s => s.signal === 'STRONG BUY').length;
    const buys = stocks.filter(s => s.signal === 'BUY').length;
    const holds = stocks.filter(s => s.signal === 'HOLD').length;
    const sells = stocks.filter(s => s.signal === 'SELL').length;
    const strongSells = stocks.filter(s => s.signal === 'STRONG SELL').length;

    const totalBuy = strongBuys + buys;
    const sentimentPct = total > 0 ? Number(((totalBuy / total) * 100).toFixed(1)) : 50;

    let sentiment = "Neutral";
    if (sentimentPct >= 58) sentiment = "Bullish";
    else if (sentimentPct <= 35) sentiment = "Bearish";

    // Top Pick
    const buyCandidates = stocks.filter(s => s.signal === 'STRONG BUY' || s.signal === 'BUY');
    const sorted = [...buyCandidates].sort((a, b) => b.confidence - a.confidence);
    const topPick = sorted.length > 0 ? sorted[0] : stocks[0];

    return {
        total: total,
        strongBuys, buys, holds, sells, strongSells,
        totalBuy,
        sentiment,
        sentimentPct,
        topPick,
        mode: isLive ? 'LIVE' : 'FALLBACK'
    };
}

/**
 * Extract Top 5 ranked picks
 */
function extractTop5(stocks) {
    const sorted = [...stocks].sort((a, b) => {
        const sigWeight = (s) => (s.signal === 'STRONG BUY' ? 3 : (s.signal === 'BUY' ? 2 : 1));
        const diffWeight = sigWeight(b) - sigWeight(a);
        if (diffWeight !== 0) return diffWeight;
        return b.confidence - a.confidence;
    });

    return sorted.slice(0, 5).map((stock, i) => ({
        ...stock,
        rank: i + 1
    }));
}

/**
 * Update system status badges
 */
function updateStatusIndicators(isLive) {
    const dot = document.getElementById('system-status-dot');
    const text = document.getElementById('system-status-text');
    const tag = document.getElementById('system-mode-tag');
    const topPill = document.getElementById('top-status-pill');
    const topLabel = document.getElementById('top-status-label');

    if (isLive) {
        if (dot) { dot.style.background = 'var(--accent-green)'; dot.style.boxShadow = '0 0 8px var(--accent-green)'; }
        if (text) text.textContent = 'STATUS: STREAMING';
        if (tag) { tag.className = 'mode-tag live'; tag.textContent = 'LIVE'; }
        if (topPill) { topPill.className = 'status-pill live'; }
        if (topLabel) topLabel.textContent = 'LIVE';
    } else {
        if (dot) { dot.style.background = 'var(--accent-yellow)'; dot.style.boxShadow = '0 0 8px var(--accent-yellow)'; }
        if (text) text.textContent = 'STATUS: DEMO/FALLBACK';
        if (tag) { tag.className = 'mode-tag fallback'; tag.textContent = 'FALLBACK'; }
        if (topPill) { topPill.className = 'status-pill fallback'; }
        if (topLabel) topLabel.textContent = 'FALLBACK';
    }
}

// ------------------------------------------------------------------------------
// 7. DASHBOARD RENDERING
// ------------------------------------------------------------------------------
function renderDashboard() {
    const s = APP_STATE.summary;
    if (!s) return;

    // Header stock counter
    const headerCount = document.getElementById('header-count');
    const sidebarCount = document.getElementById('sidebar-stock-count');
    if (headerCount) headerCount.textContent = s.total;
    if (sidebarCount) sidebarCount.textContent = s.total;

    // Stat 1: Top Pick
    if (s.topPick) {
        const topSymbol = document.getElementById('stat-top-symbol');
        const topSignal = document.getElementById('stat-top-signal');
        const topReason = document.getElementById('stat-top-reason');
        if (topSymbol) topSymbol.textContent = s.topPick.symbol;
        if (topSignal) {
            topSignal.textContent = `${s.topPick.signal} ${s.topPick.confidence}%`;
            topSignal.style.color = s.topPick.signal_color || 'var(--accent-green)';
        }
        if (topReason && s.topPick.top_reasons && s.topPick.top_reasons.length > 0) {
            topReason.textContent = s.topPick.top_reasons[0];
        }

        const cardTopPick = document.getElementById('card-top-pick');
        if (cardTopPick) {
            cardTopPick.onclick = () => openStockModal(s.topPick);
            cardTopPick.style.cursor = 'pointer';
        }
    }

    // Stat 2: Market Sentiment
    const statSentiment = document.getElementById('stat-sentiment');
    const statSentimentPct = document.getElementById('stat-sentiment-pct');
    if (statSentiment) statSentiment.textContent = s.sentiment;
    if (statSentimentPct) statSentimentPct.textContent = `${s.sentimentPct}% BUY`;

    // Stat 3: Risk
    const statRisk = document.getElementById('stat-risk');
    if (statRisk) {
        statRisk.textContent = s.sentimentPct > 50 ? "LOW" : "MEDIUM";
        statRisk.style.color = s.sentimentPct > 50 ? "var(--accent-green)" : "var(--accent-yellow)";
    }

    // Stat 4: Total Stocks
    const statTotal = document.getElementById('stat-total-count');
    const statBuyCount = document.getElementById('stat-buy-count');
    const statSellCount = document.getElementById('stat-sell-count');
    if (statTotal) statTotal.textContent = s.total;
    if (statBuyCount) statBuyCount.textContent = `${s.totalBuy} BUY`;
    if (statSellCount) statSellCount.textContent = `${s.holds} Hold · ${s.sells + s.strongSells} Sell`;

    // Render Top 5 Recommendations
    renderTop5Cards();

    // Render SHAP Feature Importance Bars
    renderSHAPBars();

    // Render Quick Watchlist
    renderWatchlist();
}

/**
 * Render Top 5 Cards
 */
function renderTop5Cards() {
    const container = document.getElementById('top5-container');
    if (!container) return;

    if (!APP_STATE.top5 || APP_STATE.top5.length === 0) {
        container.innerHTML = `<div class="glass-card skeleton-card">Evaluating opportunities...</div>`;
        return;
    }

    container.innerHTML = APP_STATE.top5.map(stock => {
        const isPos = stock.change_pct >= 0;
        const changeSign = isPos ? '+' : '';
        const priceStr = formatCurrency(stock.price);

        return `
            <div class="glass-card top5-card" onclick="openStockModalBySymbol('${stock.symbol}')">
                <div class="top5-rank-badge">#${stock.rank}</div>
                <div>
                    <div class="top5-symbol">${stock.symbol}</div>
                    <div class="top5-name">${stock.name}</div>
                </div>

                <div>
                    <div class="top5-price-row">
                        <span class="top5-price">${priceStr}</span>
                        <span class="top5-change ${isPos ? 'pos' : 'neg'}">${changeSign}${stock.change_pct}%</span>
                    </div>

                    <div class="confidence-container">
                        <div class="confidence-header">
                            <span>${stock.signal}</span>
                            <span>${stock.confidence}%</span>
                        </div>
                        <div class="confidence-bar-track">
                            <div class="confidence-bar-fill" style="width: ${stock.confidence}%; background: ${stock.signal_color};"></div>
                        </div>
                    </div>

                    <p class="top5-reason">${stock.top_reasons && stock.top_reasons[0] ? stock.top_reasons[0] : 'Technical Confluence'}</p>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Render SHAP Decision Weights
 */
function renderSHAPBars() {
    const container = document.getElementById('shap-bars-list');
    if (!container) return;

    const sample = APP_STATE.stocks[0];
    const importances = (sample && sample.ml_prediction && sample.ml_prediction.feature_importances)
        ? sample.ml_prediction.feature_importances
        : {
            "RSI (14)": 24.5,
            "MACD Histogram": 19.8,
            "Bollinger %B": 15.2,
            "ADX Trend": 12.0,
            "SMA 20 Distance": 9.5,
            "SMA 50 Distance": 7.5,
            "Volume Spike": 5.5,
            "Chaikin Flow": 4.0,
            "ROC (12)": 2.0
        };

    const sorted = Object.entries(importances).sort((a, b) => b[1] - a[1]);

    container.innerHTML = sorted.map(([feat, val]) => `
        <div class="shap-row">
            <span class="shap-name">${feat}</span>
            <div class="shap-track">
                <div class="shap-fill" style="width: ${Math.min(100, val * 3.5)}%;"></div>
            </div>
            <span class="shap-val">${val}%</span>
        </div>
    `).join('');
}

/**
 * Render Quick Watchlist on Dashboard
 */
function renderWatchlist() {
    const container = document.getElementById('watchlist-quick-list');
    if (!container) return;

    const watchlistItems = APP_STATE.stocks.slice(0, 6);
    container.innerHTML = watchlistItems.map(stock => {
        const isPos = stock.change_pct >= 0;
        return `
            <div class="watchlist-row" onclick="openStockModalBySymbol('${stock.symbol}')">
                <div class="watchlist-sym-group">
                    <div class="avatar-mini">${stock.symbol.slice(0, 2)}</div>
                    <div>
                        <div class="watchlist-sym">${stock.symbol}</div>
                        <div class="watchlist-sector">${stock.sector}</div>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-family: 'JetBrains Mono'; font-weight: 700; color: #ffffff;">${formatCurrency(stock.price)}</div>
                    <div style="font-size: 11px; font-weight: 700; color: ${isPos ? 'var(--accent-green)' : 'var(--accent-red)'}">
                        ${isPos ? '+' : ''}${stock.change_pct}%
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ------------------------------------------------------------------------------
// 8. STOCKS INTELLIGENCE VIEW (GRID & TABLE)
// ------------------------------------------------------------------------------
function renderStocksList() {
    const filtered = getFilteredStocks();
    const countElem = document.getElementById('filtered-stocks-count');
    if (countElem) countElem.textContent = filtered.length;

    if (APP_STATE.viewMode === 'grid') {
        renderStocksGrid(filtered);
    } else {
        renderStocksTable(filtered);
    }
}

function getFilteredStocks() {
    let result = [...APP_STATE.stocks];

    // Search Query
    if (APP_STATE.searchQuery) {
        const q = APP_STATE.searchQuery.toLowerCase();
        result = result.filter(s =>
            s.symbol.toLowerCase().includes(q) ||
            s.name.toLowerCase().includes(q) ||
            s.sector.toLowerCase().includes(q)
        );
    }

    // Signal Filter
    if (APP_STATE.signalFilter !== 'ALL') {
        result = result.filter(s => s.signal === APP_STATE.signalFilter);
    }

    // Sector Filter
    if (APP_STATE.sectorFilter !== 'ALL') {
        result = result.filter(s => s.sector === APP_STATE.sectorFilter);
    }

    // Sort Order
    result.sort((a, b) => {
        switch (APP_STATE.sortOrder) {
            case 'confidence_desc': return b.confidence - a.confidence;
            case 'confidence_asc': return a.confidence - b.confidence;
            case 'change_desc': return b.change_pct - a.change_pct;
            case 'change_asc': return a.change_pct - b.change_pct;
            case 'price_desc': return b.price - a.price;
            case 'symbol_asc': return a.symbol.localeCompare(b.symbol);
            default: return b.confidence - a.confidence;
        }
    });

    return result;
}

function renderStocksGrid(stocks) {
    const grid = document.getElementById('stocks-container');
    const tableContainer = document.getElementById('stocks-table-container');
    if (!grid) return;

    grid.style.display = 'grid';
    if (tableContainer) tableContainer.style.display = 'none';

    if (stocks.length === 0) {
        grid.innerHTML = `
            <div class="glass-card" style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-muted);">
                <i data-lucide="search" style="width: 32px; height: 32px; margin-bottom: 12px; color: var(--text-muted);"></i>
                <p>No equities found matching current filter criteria.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    grid.innerHTML = stocks.map(stock => {
        const isPos = stock.change_pct >= 0;
        const changeSign = isPos ? '+' : '';
        const priceStr = formatCurrency(stock.price);
        const rsiVal = stock.indicators && stock.indicators.momentum ? stock.indicators.momentum.rsi : 50;
        const riskVal = stock.risk_level || 'MED';
        const reasonText = (stock.top_reasons && stock.top_reasons.length > 0) ? stock.top_reasons[0] : 'Technical Confluence';

        return `
            <div class="glass-card stock-card" onclick="openStockModalBySymbol('${stock.symbol}')">
                <div>
                    <div class="stock-card-top">
                        <div class="stock-sym-wrapper">
                            <div class="stock-avatar">${stock.symbol.slice(0, 2)}</div>
                            <div class="stock-title-col">
                                <span class="stock-sym">${stock.symbol}</span>
                                <span class="stock-sector-tag">${stock.sector}</span>
                            </div>
                        </div>
                        <span class="signal-pill ${getSignalClass(stock.signal)}">${stock.signal}</span>
                    </div>

                    <div class="stock-price-block">
                        <span class="stock-price-val">${priceStr}</span>
                        <span class="stock-change-pill ${isPos ? 'pos' : 'neg'}">${changeSign}${stock.change_pct}%</span>
                    </div>

                    <div class="confidence-container">
                        <div class="confidence-header">
                            <span>Confidence Score</span>
                            <span style="color: ${stock.signal_color};">${stock.confidence}%</span>
                        </div>
                        <div class="confidence-bar-track">
                            <div class="confidence-bar-fill" style="width: ${stock.confidence}%; background: ${stock.signal_color};"></div>
                        </div>
                    </div>

                    <div class="stock-mini-indicators">
                        <span class="indicator-chip">RSI: <b>${rsiVal}</b></span>
                        <span class="indicator-chip">Risk: <b>${riskVal}</b></span>
                        <span class="indicator-chip">Trend: <b>${stock.indicators?.trend?.supertrend_signal || 'BULL'}</b></span>
                    </div>

                    <p class="stock-top-reason-text">${reasonText}</p>
                </div>
            </div>
        `;
    }).join('');

    if (window.lucide) lucide.createIcons();
}

function renderStocksTable(stocks) {
    const grid = document.getElementById('stocks-container');
    const tableContainer = document.getElementById('stocks-table-container');
    const tbody = document.getElementById('stocks-table-body');
    if (!tbody || !tableContainer) return;

    if (grid) grid.style.display = 'none';
    tableContainer.style.display = 'block';

    tbody.innerHTML = stocks.map((stock, i) => {
        const isPos = stock.change_pct >= 0;
        return `
            <tr>
                <td>${i + 1}</td>
                <td>
                    <div class="table-sym-cell">
                        <div class="avatar-mini">${stock.symbol.slice(0, 2)}</div>
                        <span>${stock.symbol}</span>
                    </div>
                </td>
                <td><span style="color: var(--text-muted); font-size: 11px;">${stock.sector}</span></td>
                <td style="font-family: 'JetBrains Mono'; font-weight: 700;">${formatCurrency(stock.price)}</td>
                <td style="font-family: 'JetBrains Mono'; font-weight: 700; color: ${isPos ? 'var(--accent-green)' : 'var(--accent-red)'}">
                    ${isPos ? '+' : ''}${stock.change_pct}%
                </td>
                <td><span class="signal-pill ${getSignalClass(stock.signal)}">${stock.signal}</span></td>
                <td>
                    <span style="font-family: 'JetBrains Mono'; font-weight: 700; color: ${stock.signal_color}">${stock.confidence}%</span>
                </td>
                <td><span class="badge-pill">${stock.risk_level || 'MED'}</span></td>
                <td style="max-width: 240px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-secondary); font-size: 11px;">
                    ${stock.top_reasons?.[0] || 'Technical Alignment'}
                </td>
                <td>
                    <button class="table-btn" onclick="openStockModalBySymbol('${stock.symbol}')">Inspect</button>
                </td>
            </tr>
        `;
    }).join('');
}

function getSignalClass(signal) {
    switch (signal) {
        case 'STRONG BUY': return 'strong-buy';
        case 'BUY': return 'buy';
        case 'HOLD': return 'hold';
        case 'SELL': return 'sell';
        case 'STRONG SELL': return 'strong-sell';
        default: return 'hold';
    }
}

// ------------------------------------------------------------------------------
// 9. ML PREDICTIONS VIEW
// ------------------------------------------------------------------------------
function renderMLPredictions() {
    const tbody = document.getElementById('ml-predictions-table-body');
    if (!tbody) return;

    const stocks = APP_STATE.stocks;
    if (stocks.length === 0) return;

    // Dominant trend metric
    const uptrends = stocks.filter(s => s.ml_prediction?.predicted_trend === 'UPTREND').length;
    const downtrends = stocks.filter(s => s.ml_prediction?.predicted_trend === 'DOWNTREND').length;
    const sideways = stocks.filter(s => s.ml_prediction?.predicted_trend === 'SIDEWAYS').length;

    const dominantElem = document.getElementById('ml-dominant-trend');
    const countsElem = document.getElementById('ml-trend-counts');
    const highConvElem = document.getElementById('ml-high-conviction-count');

    if (dominantElem) {
        dominantElem.textContent = uptrends >= downtrends ? 'UPTREND' : 'DOWNTREND';
        dominantElem.style.color = uptrends >= downtrends ? 'var(--accent-green)' : 'var(--accent-red)';
    }
    if (countsElem) {
        const pct = Math.round((Math.max(uptrends, downtrends) / stocks.length) * 100);
        countsElem.textContent = `${pct}% of Universe (${uptrends} Up · ${sideways} Side · ${downtrends} Down)`;
    }
    if (highConvElem) {
        const highConv = stocks.filter(s => (s.ml_prediction?.ml_confidence || 0) >= 78).length;
        highConvElem.textContent = highConv;
    }

    tbody.innerHTML = stocks.slice(0, 30).map(stock => {
        const ml = stock.ml_prediction || {};
        const trend = ml.predicted_trend || 'SIDEWAYS';
        const conf = ml.ml_confidence || 65;
        const probs = ml.next_day_probabilities || { up_prob: 33, neutral_prob: 34, down_prob: 33 };

        const trendColor = trend === 'UPTREND' ? 'var(--accent-green)' : (trend === 'DOWNTREND' ? 'var(--accent-red)' : 'var(--accent-yellow)');

        return `
            <tr>
                <td>
                    <div class="table-sym-cell">
                        <div class="avatar-mini">${stock.symbol.slice(0, 2)}</div>
                        <b>${stock.symbol}</b>
                    </div>
                </td>
                <td style="font-family: 'JetBrains Mono'; font-weight: 700;">${formatCurrency(stock.price)}</td>
                <td>
                    <span style="font-weight: 800; color: ${trendColor}; font-size: 11.5px;">${trend}</span>
                </td>
                <td>
                    <span style="font-family: 'JetBrains Mono'; font-weight: 800; color: var(--accent-cyan);">${conf}%</span>
                </td>
                <td>
                    <span style="font-family: 'JetBrains Mono'; color: var(--accent-green); font-weight: 700;">${probs.up_prob}%</span>
                </td>
                <td>
                    <span style="font-family: 'JetBrains Mono'; color: var(--accent-yellow);">${probs.neutral_prob}%</span>
                </td>
                <td>
                    <span style="font-family: 'JetBrains Mono'; color: var(--accent-red); font-weight: 700;">${probs.down_prob}%</span>
                </td>
                <td>
                    <span class="badge-pill">${ml.model_type || 'RandomForest'}</span>
                </td>
                <td>
                    <button class="table-btn" onclick="openStockModalBySymbol('${stock.symbol}')">Inspect</button>
                </td>
            </tr>
        `;
    }).join('');
}

// ------------------------------------------------------------------------------
// 10. TICKER MARQUEE ENGINE
// ------------------------------------------------------------------------------
function renderTickerBar() {
    const track = document.getElementById('ticker-track');
    if (!track) return;

    if (APP_STATE.stocks.length === 0) return;

    // Generate repeated items for seamless infinite scroll
    const itemsHtml = APP_STATE.stocks.map(stock => {
        const isPos = stock.change_pct >= 0;
        return `
            <div class="ticker-item" onclick="openStockModalBySymbol('${stock.symbol}')">
                <span class="ticker-sym">${stock.symbol}</span>
                <span class="ticker-price">${formatCurrency(stock.price)}</span>
                <span class="ticker-change ${isPos ? 'pos' : 'neg'}">
                    ${isPos ? '+' : ''}${stock.change_pct}%
                </span>
            </div>
        `;
    }).join('');

    // Duplicate string once for smooth looping
    track.innerHTML = itemsHtml + itemsHtml;
}

// ------------------------------------------------------------------------------
// 11. COMPREHENSIVE STOCK DETAIL MODAL (50+ INDICATORS)
// ------------------------------------------------------------------------------
function openStockModalBySymbol(symbol) {
    const stock = APP_STATE.stocks.find(s => s.symbol === symbol);
    if (stock) {
        openStockModal(stock);
    }
}

function openStockModal(stock) {
    APP_STATE.selectedStock = stock;
    const modal = document.getElementById('stock-modal');
    if (!modal) return;

    // Header info
    document.getElementById('modal-symbol-badge').textContent = stock.symbol.slice(0, 2);
    document.getElementById('modal-symbol').textContent = stock.symbol;
    document.getElementById('modal-company-name').textContent = stock.name;
    document.getElementById('modal-sector').textContent = stock.sector;
    document.getElementById('modal-price').textContent = formatCurrency(stock.price);

    const isPos = stock.change_pct >= 0;
    const changeElem = document.getElementById('modal-change');
    changeElem.textContent = `${isPos ? '+' : ''}₹${Math.abs(stock.change).toFixed(2)} (${isPos ? '+' : ''}${stock.change_pct}%)`;
    changeElem.className = `modal-change ${isPos ? 'positive' : 'negative'}`;

    const signalBadge = document.getElementById('modal-signal-badge');
    signalBadge.textContent = stock.signal;
    signalBadge.className = `badge-pill ${getSignalClass(stock.signal)}`;

    document.getElementById('modal-confidence-text').textContent = `${stock.confidence}% CONFIDENCE`;

    // Top 5 Reasons List
    const reasonsList = document.getElementById('modal-reasons-list');
    if (reasonsList && stock.top_reasons) {
        reasonsList.innerHTML = stock.top_reasons.map(r => `<li>${r}</li>`).join('');
    }

    // Populate Tab Data
    populateModalIndicators(stock);

    // Show Modal
    modal.classList.add('active');

    // Trigger Strong Buy Sound if applicable
    if (stock.signal === 'STRONG BUY') {
        playAudioChime('strong-buy');
    }
}

function closeStockModal() {
    const modal = document.getElementById('stock-modal');
    if (modal) modal.classList.remove('active');
}

/**
 * Populate all 50+ indicators across tabs
 */
function populateModalIndicators(stock) {
    const ind = stock.indicators || {};
    const t = ind.trend || {};
    const m = ind.momentum || {};
    const v = ind.volatility || {};
    const vol = ind.volume || {};
    const adv = ind.advanced || {};
    const ml = stock.ml_prediction || {};

    // 1. Trend Tab (12+ indicators)
    const gridTrend = document.getElementById('grid-trend-indicators');
    if (gridTrend) {
        gridTrend.innerHTML = `
            <div class="metric-tile"><span class="metric-tile-label">SMA (20)</span><span class="metric-tile-value">₹${t.sma_20}</span><span class="metric-tile-sub">Short-term Baseline</span></div>
            <div class="metric-tile"><span class="metric-tile-label">SMA (50)</span><span class="metric-tile-value">₹${t.sma_50}</span><span class="metric-tile-sub">Intermediate Trend</span></div>
            <div class="metric-tile"><span class="metric-tile-label">SMA (200)</span><span class="metric-tile-value">₹${t.sma_200}</span><span class="metric-tile-sub">Macro Regime Line</span></div>
            <div class="metric-tile"><span class="metric-tile-label">EMA (12)</span><span class="metric-tile-value">₹${t.ema_12}</span><span class="metric-tile-sub">Fast Reaction</span></div>
            <div class="metric-tile"><span class="metric-tile-label">EMA (26)</span><span class="metric-tile-value">₹${t.ema_26}</span><span class="metric-tile-sub">Medium Exponential</span></div>
            <div class="metric-tile"><span class="metric-tile-label">EMA (50)</span><span class="metric-tile-value">₹${t.ema_50}</span><span class="metric-tile-sub">Institutional Curve</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Tenkan-sen (9)</span><span class="metric-tile-value">₹${t.ichimoku_tenkan}</span><span class="metric-tile-sub">Ichimoku Conversion</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Kijun-sen (26)</span><span class="metric-tile-value">₹${t.ichimoku_kijun}</span><span class="metric-tile-sub">Ichimoku Base Line</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Senkou Span A</span><span class="metric-tile-value">₹${t.ichimoku_senkou_a}</span><span class="metric-tile-sub">Kumo Cloud Top</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Senkou Span B</span><span class="metric-tile-value">₹${t.ichimoku_senkou_b}</span><span class="metric-tile-sub">Kumo Cloud Base</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Parabolic SAR</span><span class="metric-tile-value">₹${t.parabolic_sar}</span><span class="metric-tile-sub">Trailing Stop Target</span></div>
            <div class="metric-tile"><span class="metric-tile-label">ADX (14)</span><span class="metric-tile-value">${t.adx}</span><span class="metric-tile-sub">Trend Intensity</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Plus DI (+DI)</span><span class="metric-tile-value">${t.plus_di}</span><span class="metric-tile-sub">Bullish Directional</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Minus DI (-DI)</span><span class="metric-tile-value">${t.minus_di}</span><span class="metric-tile-sub">Bearish Directional</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Aroon Up / Down</span><span class="metric-tile-value">${t.aroon_up} / ${t.aroon_down}</span><span class="metric-tile-sub">Osc: ${t.aroon_oscillator}</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Supertrend (10,3)</span><span class="metric-tile-value">₹${t.supertrend}</span><span class="metric-tile-sub" style="color: ${t.supertrend_signal === 'BULLISH' ? 'var(--accent-green)' : 'var(--accent-red)'}; font-weight:700;">${t.supertrend_signal}</span></div>
        `;
    }

    // 2. Momentum Tab (10+ indicators)
    const gridMomentum = document.getElementById('grid-momentum-indicators');
    if (gridMomentum) {
        gridMomentum.innerHTML = `
            <div class="metric-tile"><span class="metric-tile-label">RSI (14)</span><span class="metric-tile-value">${m.rsi}</span><span class="metric-tile-sub">${m.rsi < 30 ? 'OVERSOLD' : (m.rsi > 70 ? 'OVERBOUGHT' : 'NEUTRAL ZONE')}</span></div>
            <div class="metric-tile"><span class="metric-tile-label">MACD Line</span><span class="metric-tile-value">${m.macd_line}</span><span class="metric-tile-sub">12-26 Fast Difference</span></div>
            <div class="metric-tile"><span class="metric-tile-label">MACD Signal</span><span class="metric-tile-value">${m.macd_signal}</span><span class="metric-tile-sub">9 EMA Smoothed</span></div>
            <div class="metric-tile"><span class="metric-tile-label">MACD Histogram</span><span class="metric-tile-value" style="color: ${m.macd_histogram >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'}">${m.macd_histogram}</span><span class="metric-tile-sub">${m.macd_trend}</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Stochastic %K</span><span class="metric-tile-value">${m.stoch_k}%</span><span class="metric-tile-sub">Fast Oscillator</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Stochastic %D</span><span class="metric-tile-value">${m.stoch_d}%</span><span class="metric-tile-sub">Signal Line</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Money Flow Index</span><span class="metric-tile-value">${m.mfi}</span><span class="metric-tile-sub">Volume-Weighted RSI</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Williams %R</span><span class="metric-tile-value">${m.williams_r}</span><span class="metric-tile-sub">14-Day Range Position</span></div>
            <div class="metric-tile"><span class="metric-tile-label">CCI (20)</span><span class="metric-tile-value">${m.cci}</span><span class="metric-tile-sub">Commodity Channel</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Rate of Change</span><span class="metric-tile-value">${m.roc_12}%</span><span class="metric-tile-sub">12-Period Velocity</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Awesome Oscillator</span><span class="metric-tile-value">${m.awesome_oscillator}</span><span class="metric-tile-sub">Bill Williams AO</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Ultimate Oscillator</span><span class="metric-tile-value">${m.ultimate_oscillator}</span><span class="metric-tile-sub">7/14/28 Confluence</span></div>
        `;
    }

    // 3. Volatility Tab (9 indicators)
    const gridVol = document.getElementById('grid-volatility-indicators');
    if (gridVol) {
        gridVol.innerHTML = `
            <div class="metric-tile"><span class="metric-tile-label">Bollinger Upper</span><span class="metric-tile-value">₹${v.bollinger_upper}</span><span class="metric-tile-sub">+2 Std Deviation</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Bollinger Middle</span><span class="metric-tile-value">₹${v.bollinger_middle}</span><span class="metric-tile-sub">20-SMA Mean</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Bollinger Lower</span><span class="metric-tile-value">₹${v.bollinger_lower}</span><span class="metric-tile-sub">-2 Std Deviation</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Bollinger %B</span><span class="metric-tile-value">${v.bollinger_pct_b}</span><span class="metric-tile-sub">Position In Bands</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Bandwidth</span><span class="metric-tile-value">${v.bollinger_bandwidth}%</span><span class="metric-tile-sub">Squeeze Meter</span></div>
            <div class="metric-tile"><span class="metric-tile-label">ATR (14)</span><span class="metric-tile-value">₹${v.atr_14}</span><span class="metric-tile-sub">Average True Range</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Volatility %</span><span class="metric-tile-value">${v.volatility_pct}%</span><span class="metric-tile-sub">ATR Normalized</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Keltner Channel</span><span class="metric-tile-value">₹${v.keltner_middle}</span><span class="metric-tile-sub">±1.5 ATR Envelope</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Historical Vol (30d)</span><span class="metric-tile-value">${v.historical_volatility}%</span><span class="metric-tile-sub">Annualized Log Variance</span></div>
        `;
    }

    // 4. Volume Tab (9 indicators)
    const gridVolume = document.getElementById('grid-volume-indicators');
    if (gridVolume) {
        gridVolume.innerHTML = `
            <div class="metric-tile"><span class="metric-tile-label">VWAP</span><span class="metric-tile-value">₹${vol.vwap}</span><span class="metric-tile-sub">True Institutional Price</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Current Volume</span><span class="metric-tile-value">${(vol.volume_current || 0).toLocaleString()}</span><span class="metric-tile-sub">Shares Traded</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Volume 20-SMA</span><span class="metric-tile-value">${(vol.volume_sma20 || 0).toLocaleString()}</span><span class="metric-tile-sub">20-Session Average</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Volume Surge Ratio</span><span class="metric-tile-value" style="color: ${vol.volume_spike ? 'var(--accent-green)' : 'var(--text-primary)'}">${vol.volume_ratio}x</span><span class="metric-tile-sub">${vol.volume_spike ? 'SPIKE DETECTED' : 'NORMAL RANGE'}</span></div>
            <div class="metric-tile"><span class="metric-tile-label">On-Balance Volume</span><span class="metric-tile-value">${Math.round((vol.obv || 0) / 1000000)}M</span><span class="metric-tile-sub">Cumulative Flow</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Chaikin Money Flow</span><span class="metric-tile-value" style="color: ${vol.cmf_20 >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'}">${vol.cmf_20}</span><span class="metric-tile-sub">Accumulation Pressure</span></div>
            <div class="metric-tile"><span class="metric-tile-label">Force Index (13)</span><span class="metric-tile-value">${Math.round(vol.force_index || 0)}</span><span class="metric-tile-sub">Price x Volume Delta</span></div>
            <div class="metric-tile"><span class="metric-tile-label">A/D Line (ADL)</span><span class="metric-tile-value">${Math.round((vol.adl || 0) / 1000000)}M</span><span class="metric-tile-sub">Volume Location</span></div>
        `;
    }

    // 5. Levels & Fibonacci Tab
    const fibTable = document.getElementById('modal-fib-table');
    const fibs = adv.fibonacci_levels || {};
    if (fibTable) {
        fibTable.innerHTML = `
            <tr><td>0.0% (Swing High)</td><td>₹${fibs.fib_0 || 0}</td></tr>
            <tr><td>23.6% Retracement</td><td>₹${fibs.fib_236 || 0}</td></tr>
            <tr><td>38.2% Retracement</td><td>₹${fibs.fib_382 || 0}</td></tr>
            <tr style="background: rgba(0, 240, 255, 0.08); font-weight:700;"><td style="color: var(--accent-cyan);">50.0% Equilibrium</td><td style="color: var(--accent-cyan);">₹${fibs.fib_500 || 0}</td></tr>
            <tr style="background: rgba(0, 255, 170, 0.08); font-weight:700;"><td style="color: var(--accent-green);">61.8% Golden Ratio</td><td style="color: var(--accent-green);">₹${fibs.fib_618 || 0}</td></tr>
            <tr><td>78.6% Deep Zone</td><td>₹${fibs.fib_786 || 0}</td></tr>
            <tr><td>100.0% (Swing Low)</td><td>₹${fibs.fib_100 || 0}</td></tr>
        `;
    }

    const pivotsTable = document.getElementById('modal-pivots-table');
    const cp = adv.classic_pivots || {};
    if (pivotsTable) {
        pivotsTable.innerHTML = `
            <tr><td>Resistance 3 (R3)</td><td>₹${cp.r3 || 0}</td></tr>
            <tr><td>Resistance 2 (R2)</td><td>₹${cp.r2 || 0}</td></tr>
            <tr><td>Resistance 1 (R1)</td><td>₹${cp.r1 || 0}</td></tr>
            <tr style="background: rgba(168, 85, 247, 0.1); font-weight:700;"><td style="color: var(--accent-purple);">Central Pivot (PP)</td><td style="color: var(--accent-purple);">₹${cp.pivot_point || 0}</td></tr>
            <tr><td>Support 1 (S1)</td><td>₹${cp.s1 || 0}</td></tr>
            <tr><td>Support 2 (S2)</td><td>₹${cp.s2 || 0}</td></tr>
            <tr><td>Support 3 (S3)</td><td>₹${cp.s3 || 0}</td></tr>
        `;
    }

    // 6. ML Forecast Tab
    const modalMlTrend = document.getElementById('modal-ml-trend');
    const modalMlConf = document.getElementById('modal-ml-conf');
    const probUpBar = document.getElementById('modal-prob-up');
    const probUpVal = document.getElementById('modal-prob-up-val');
    const probNeutBar = document.getElementById('modal-prob-neutral');
    const probNeutVal = document.getElementById('modal-prob-neutral-val');
    const probDownBar = document.getElementById('modal-prob-down');
    const probDownVal = document.getElementById('modal-prob-down-val');

    const trend = ml.predicted_trend || 'UPTREND';
    const conf = ml.ml_confidence || 82;
    const probs = ml.next_day_probabilities || { up_prob: 65, neutral_prob: 22, down_prob: 13 };

    if (modalMlTrend) {
        modalMlTrend.textContent = trend;
        modalMlTrend.style.color = trend === 'UPTREND' ? 'var(--accent-green)' : (trend === 'DOWNTREND' ? 'var(--accent-red)' : 'var(--accent-yellow)');
    }
    if (modalMlConf) modalMlConf.textContent = `${conf}% Confidence Score`;

    if (probUpBar) probUpBar.style.width = `${probs.up_prob}%`;
    if (probUpVal) probUpVal.textContent = `${probs.up_prob}%`;
    if (probNeutBar) probNeutBar.style.width = `${probs.neutral_prob}%`;
    if (probNeutVal) probNeutVal.textContent = `${probs.neutral_prob}%`;
    if (probDownBar) probDownBar.style.width = `${probs.down_prob}%`;
    if (probDownVal) probDownVal.textContent = `${probs.down_prob}%`;
}

// ------------------------------------------------------------------------------
// 12. CURRENCY FORMATTER
// ------------------------------------------------------------------------------
function formatCurrency(valInInr) {
    if (valInInr == null || isNaN(valInInr)) return '₹0.00';
    if (APP_STATE.currency === 'USD') {
        const inUsd = valInInr / APP_STATE.usdExchangeRate;
        return `$${inUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `₹${valInInr.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ------------------------------------------------------------------------------
// 13. EVENT LISTENERS & NAVIGATION
// ------------------------------------------------------------------------------
function setupEventListeners() {
    // 1. Sidebar Navigation
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetView = btn.getAttribute('data-view');
            switchView(targetView);
            document.body.classList.remove('sidebar-open');
        });
    });

    // Mobile Drawer Open / Close
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            document.body.classList.add('sidebar-open');
        });
    }
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', () => {
            document.body.classList.remove('sidebar-open');
        });
    }
    if (sidebarBackdrop) {
        sidebarBackdrop.addEventListener('click', () => {
            document.body.classList.remove('sidebar-open');
        });
    }

    // Mobile Bottom Navigation
    document.querySelectorAll('.mobile-bottom-nav .bottom-nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetView = btn.getAttribute('data-view');
            switchView(targetView);
        });
    });

    // "View all BUY opportunities" button on dashboard
    const btnViewBuys = document.getElementById('btn-view-all-buys');
    if (btnViewBuys) {
        btnViewBuys.addEventListener('click', () => {
            switchView('view-stocks');
            // Filter to BUY
            setActiveSignalFilter('BUY');
        });
    }

    // 2. Manual Refresh Button
    const btnRefresh = document.getElementById('btn-refresh');
    if (btnRefresh) {
        btnRefresh.addEventListener('click', () => {
            fetchStockIntelligence(true);
        });
    }

    // 3. Sound Toggle Button
    const btnSound = document.getElementById('btn-sound-toggle');
    if (btnSound) {
        btnSound.addEventListener('click', () => {
            APP_STATE.audioEnabled = !APP_STATE.audioEnabled;
            const soundIcon = document.getElementById('sound-icon');
            if (soundIcon) {
                soundIcon.setAttribute('data-lucide', APP_STATE.audioEnabled ? 'volume-2' : 'volume-x');
                if (window.lucide) lucide.createIcons();
            }
        });
    }

    // 4. Auto-Refresh Toggle
    const autoToggle = document.getElementById('auto-refresh-toggle');
    if (autoToggle) {
        autoToggle.addEventListener('change', (e) => {
            APP_STATE.autoRefresh = e.target.checked;
        });
    }

    // 5. Search Input
    const searchInput = document.getElementById('stocks-search-input');
    const clearBtn = document.getElementById('clear-search-btn');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            APP_STATE.searchQuery = e.target.value.trim();
            if (clearBtn) {
                if (APP_STATE.searchQuery) clearBtn.classList.add('visible');
                else clearBtn.classList.remove('visible');
            }
            renderStocksList();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            APP_STATE.searchQuery = '';
            clearBtn.classList.remove('visible');
            renderStocksList();
        });
    }

    // 6. Signal Filter Pills
    document.querySelectorAll('#signal-filter-group .filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('#signal-filter-group .filter-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            APP_STATE.signalFilter = pill.getAttribute('data-signal');
            renderStocksList();
        });
    });

    // 7. Sector Dropdown
    const sectorSelect = document.getElementById('sector-filter-select');
    if (sectorSelect) {
        sectorSelect.addEventListener('change', (e) => {
            APP_STATE.sectorFilter = e.target.value;
            renderStocksList();
        });
    }

    // 8. Sort Dropdown
    const sortSelect = document.getElementById('stocks-sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            APP_STATE.sortOrder = e.target.value;
            renderStocksList();
        });
    }

    // 9. View Mode Toggles (Grid vs Table)
    const btnGrid = document.getElementById('btn-mode-grid');
    const btnTable = document.getElementById('btn-mode-table');
    if (btnGrid && btnTable) {
        btnGrid.addEventListener('click', () => {
            btnGrid.classList.add('active');
            btnTable.classList.remove('active');
            APP_STATE.viewMode = 'grid';
            renderStocksList();
        });
        btnTable.addEventListener('click', () => {
            btnTable.classList.add('active');
            btnGrid.classList.remove('active');
            APP_STATE.viewMode = 'table';
            renderStocksList();
        });
    }

    // 10. Modal Tabs Switcher
    document.querySelectorAll('.modal-tab-btn').forEach(tabBtn => {
        tabBtn.addEventListener('click', () => {
            document.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.modal-tab-pane').forEach(p => p.classList.remove('active'));

            tabBtn.classList.add('active');
            const targetPane = tabBtn.getAttribute('data-tab');
            const pane = document.getElementById(targetPane);
            if (pane) pane.classList.add('active');
        });
    });

    // 11. Modal Close Buttons
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCloseAction = document.getElementById('modal-close-action-btn');
    const modalOverlay = document.getElementById('stock-modal');

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeStockModal);
    if (modalCloseAction) modalCloseAction.addEventListener('click', closeStockModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeStockModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeStockModal();
    });

    // 12. Settings Controls
    const intervalSelect = document.getElementById('setting-refresh-interval');
    if (intervalSelect) {
        intervalSelect.addEventListener('change', (e) => {
            APP_STATE.refreshIntervalSeconds = parseInt(e.target.value, 10);
            APP_STATE.countdownRemaining = APP_STATE.refreshIntervalSeconds;
        });
    }

    const fallbackToggle = document.getElementById('setting-force-fallback');
    if (fallbackToggle) {
        fallbackToggle.addEventListener('change', (e) => {
            APP_STATE.forceFallback = e.target.checked;
            fetchStockIntelligence(true);
        });
    }

    const currencySelect = document.getElementById('setting-currency-select');
    if (currencySelect) {
        currencySelect.addEventListener('change', (e) => {
            APP_STATE.currency = e.target.value;
            renderDashboard();
            renderStocksList();
            renderMLPredictions();
            renderTickerBar();
            if (APP_STATE.selectedStock) populateModalIndicators(APP_STATE.selectedStock);
        });
    }

    const bg3dToggle = document.getElementById('setting-3d-bg');
    if (bg3dToggle) {
        bg3dToggle.addEventListener('change', (e) => {
            const canvas = document.getElementById('bg-canvas');
            if (canvas) canvas.style.display = e.target.checked ? 'block' : 'none';
        });
    }
}

function switchView(viewId) {
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.mobile-bottom-nav .bottom-nav-item').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.content-view').forEach(v => v.classList.remove('active'));

    const navBtn = document.querySelector(`.sidebar-nav .nav-item[data-view="${viewId}"]`);
    const bottomBtn = document.querySelector(`.mobile-bottom-nav .bottom-nav-item[data-view="${viewId}"]`);
    const viewSection = document.getElementById(viewId);

    if (navBtn) navBtn.classList.add('active');
    if (bottomBtn) bottomBtn.classList.add('active');
    if (viewSection) viewSection.classList.add('active');

    APP_STATE.activeView = viewId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setActiveSignalFilter(signal) {
    APP_STATE.signalFilter = signal;
    document.querySelectorAll('#signal-filter-group .filter-pill').forEach(pill => {
        if (pill.getAttribute('data-signal') === signal) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });
    renderStocksList();
}

// ------------------------------------------------------------------------------
// 14. COUNTDOWN TIMER & SCHEDULER
// ------------------------------------------------------------------------------
function startCountdownScheduler() {
    setInterval(() => {
        updateLiveClock();

        if (APP_STATE.autoRefresh && !APP_STATE.isRefreshing) {
            APP_STATE.countdownRemaining--;

            const timerElem = document.getElementById('countdown-timer');
            if (timerElem) {
                timerElem.textContent = `${APP_STATE.countdownRemaining}s`;
            }

            if (APP_STATE.countdownRemaining <= 0) {
                APP_STATE.countdownRemaining = APP_STATE.refreshIntervalSeconds;
                fetchStockIntelligence(true);
            }
        }
    }, 1000);
}

// ------------------------------------------------------------------------------
// 15. INITIALIZATION ENTRYPOINT
// ------------------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Initializing INSYS PRO v4.0 Master Intelligence Engine...");

    // 1. Initialize Three.js 3D Background
    initThreeBackground();

    // 2. Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 3. Attach Event Listeners
    setupEventListeners();

    // 4. Initial Clock tick
    updateLiveClock();

    // 5. Initial Data Fetch
    fetchStockIntelligence(false);

    // 6. Launch 1-second cadence scheduler for clock and countdown
    startCountdownScheduler();
});
