import { Link, Head } from '@inertiajs/react';
import { ShieldCheck, Zap, Globe, ArrowRight, TrendingUp, Lock, Sparkles } from 'lucide-react';
import { ReactNode, useEffect, useRef, useState } from 'react';

type AuthProps = {
    user?: any;
};

type WelcomeProps = {
    auth: AuthProps;
};

export default function Welcome({ auth }: WelcomeProps) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('mousemove', handleMouse);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('mousemove', handleMouse);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const parallaxX = (mousePos.x / window.innerWidth - 0.5) * 20;
    const parallaxY = (mousePos.y / window.innerHeight - 0.5) * 20;

    return (
        <>
            <Head title="Welcome - Smart Finance" />
            <style>{`
                
                * { box-sizing: border-box; }

                .sf-root {
                    font-family: 'DM Sans', sans-serif;
                    background: #020617;
                    color: #e2e8f0;
                    min-height: 100vh;
                    overflow-x: hidden;
                }

                .sf-display { font-family: 'Syne', sans-serif; }

                /* Animated gradient background */
                .hero-bg {
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(ellipse 80% 60% at 20% 40%, rgba(59,130,246,0.15) 0%, transparent 60%),
                        radial-gradient(ellipse 60% 50% at 80% 20%, rgba(99,102,241,0.1) 0%, transparent 55%),
                        radial-gradient(ellipse 40% 40% at 60% 80%, rgba(16,185,129,0.08) 0%, transparent 50%);
                    animation: bgPulse 8s ease-in-out infinite alternate;
                }

                @keyframes bgPulse {
                    0% { opacity: 0.7; }
                    100% { opacity: 1; }
                }

                /* Grid pattern */
                .grid-pattern {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                    background-size: 60px 60px;
                }

                /* Floating orbs */
                .orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    animation: floatOrb 12s ease-in-out infinite;
                    pointer-events: none;
                }
                .orb-1 { width: 400px; height: 400px; background: rgba(59,130,246,0.12); top: -100px; left: -100px; animation-delay: 0s; }
                .orb-2 { width: 300px; height: 300px; background: rgba(99,102,241,0.1); top: 30%; right: -50px; animation-delay: -4s; }
                .orb-3 { width: 250px; height: 250px; background: rgba(16,185,129,0.08); bottom: 10%; left: 30%; animation-delay: -8s; }

                @keyframes floatOrb {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -30px) scale(1.05); }
                    66% { transform: translate(-20px, 20px) scale(0.95); }
                }

                /* Navbar */
                .navbar {
                    position: fixed;
                    top: 0; left: 0; right: 0;
                    z-index: 100;
                    padding: 20px 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(2,6,23,0.6);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                }

                .nav-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                }

                .logo-icon {
                    width: 38px; height: 38px;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 18px;
                    color: white;
                    font-family: 'Syne', sans-serif;
                    box-shadow: 0 0 20px rgba(59,130,246,0.4);
                }

                .logo-text {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    font-size: 18px;
                    color: white;
                }

                .logo-text span { color: #60a5fa; }

                .nav-links { display: flex; gap: 12px; align-items: center; }

                .btn-ghost {
                    padding: 8px 20px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #94a3b8;
                    text-decoration: none;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                }
                .btn-ghost:hover { color: white; border-color: rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); }

                .btn-primary {
                    padding: 9px 22px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    color: white;
                    text-decoration: none;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    transition: all 0.3s;
                    box-shadow: 0 4px 15px rgba(59,130,246,0.3);
                    font-family: 'DM Sans', sans-serif;
                }
                .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(59,130,246,0.45); }

                /* Hero */
                .hero {
                    position: relative;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    padding: 120px 40px 80px;
                    max-width: 1280px;
                    margin: 0 auto;
                }

                .hero-content {
                    flex: 1;
                    z-index: 10;
                    max-width: 580px;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 14px;
                    background: rgba(59,130,246,0.1);
                    border: 1px solid rgba(59,130,246,0.3);
                    border-radius: 100px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #60a5fa;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    margin-bottom: 28px;
                    animation: fadeSlideUp 0.6s ease both;
                }

                .hero-title {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(42px, 6vw, 76px);
                    font-weight: 800;
                    line-height: 1.05;
                    margin-bottom: 24px;
                    animation: fadeSlideUp 0.6s ease 0.1s both;
                }

                .hero-title .accent {
                    background: linear-gradient(135deg, #60a5fa, #818cf8, #34d399);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .hero-desc {
                    font-size: 17px;
                    line-height: 1.7;
                    color: #94a3b8;
                    margin-bottom: 40px;
                    font-weight: 300;
                    animation: fadeSlideUp 0.6s ease 0.2s both;
                }

                .hero-cta {
                    display: flex;
                    gap: 14px;
                    flex-wrap: wrap;
                    animation: fadeSlideUp 0.6s ease 0.3s both;
                }

                .cta-main {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 14px 28px;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    color: white;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 15px;
                    text-decoration: none;
                    transition: all 0.3s;
                    box-shadow: 0 8px 25px rgba(59,130,246,0.35), 0 0 0 1px rgba(99,102,241,0.3);
                    font-family: 'DM Sans', sans-serif;
                }
                .cta-main:hover { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(59,130,246,0.5), 0 0 0 1px rgba(99,102,241,0.5); }
                .cta-main svg { transition: transform 0.2s; }
                .cta-main:hover svg { transform: translateX(4px); }

                .cta-secondary {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 14px 28px;
                    background: rgba(255,255,255,0.05);
                    color: #e2e8f0;
                    border-radius: 12px;
                    font-weight: 500;
                    font-size: 15px;
                    text-decoration: none;
                    border: 1px solid rgba(255,255,255,0.1);
                    transition: all 0.3s;
                    font-family: 'DM Sans', sans-serif;
                }
                .cta-secondary:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); }

                /* 3D Card */
                .hero-visual {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    z-index: 10;
                    animation: fadeSlideUp 0.8s ease 0.2s both;
                }

                .card-3d-wrapper {
                    perspective: 1000px;
                    position: relative;
                }

                .card-3d {
                    width: 340px;
                    background: linear-gradient(135deg, #0f172a, #1e293b);
                    border-radius: 24px;
                    padding: 32px;
                    border: 1px solid rgba(255,255,255,0.08);
                    box-shadow:
                        0 40px 80px rgba(0,0,0,0.6),
                        0 0 0 1px rgba(255,255,255,0.05),
                        inset 0 1px 0 rgba(255,255,255,0.1);
                    transition: transform 0.1s ease;
                    position: relative;
                    overflow: hidden;
                }

                .card-3d::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(59,130,246,0.08) 0%, transparent 50%, rgba(99,102,241,0.05) 100%);
                    pointer-events: none;
                }

                .card-chip {
                    width: 44px; height: 34px;
                    background: linear-gradient(135deg, #fbbf24, #f59e0b);
                    border-radius: 6px;
                    margin-bottom: 40px;
                    box-shadow: 0 2px 8px rgba(251,191,36,0.3);
                    position: relative;
                    overflow: hidden;
                }

                .card-chip::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.15) 4px, rgba(0,0,0,0.15) 5px);
                }

                .card-amount {
                    font-family: 'Syne', sans-serif;
                    font-size: 32px;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 4px;
                    letter-spacing: -0.02em;
                }

                .card-label {
                    font-size: 11px;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 32px;
                }

                .card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }

                .card-name {
                    font-size: 13px;
                    color: #94a3b8;
                    font-weight: 500;
                }

                .card-verified {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 10px;
                    color: #34d399;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                }

                .card-number {
                    font-family: 'Syne', sans-serif;
                    font-size: 14px;
                    color: #475569;
                    letter-spacing: 0.15em;
                    margin-bottom: 20px;
                }

                /* Floating mini cards */
                .float-card {
                    position: absolute;
                    background: rgba(15,23,42,0.9);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 16px;
                    padding: 14px 18px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                    animation: floatCard 6s ease-in-out infinite;
                    white-space: nowrap;
                }

                .float-card-1 {
                    top: -20px; right: -60px;
                    animation-delay: 0s;
                }

                .float-card-2 {
                    bottom: 20px; left: -80px;
                    animation-delay: -3s;
                }

                @keyframes floatCard {
                    0%, 100% { transform: translateY(0px) rotate(-1deg); }
                    50% { transform: translateY(-12px) rotate(1deg); }
                }

                .float-label { font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
                .float-value { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: white; }
                .float-value.green { color: #34d399; }
                .float-value.blue { color: #60a5fa; }

                /* Stats bar */
                .stats-bar {
                    display: flex;
                    gap: 40px;
                    padding: 24px 0;
                    border-top: 1px solid rgba(255,255,255,0.06);
                    margin-top: 60px;
                    animation: fadeSlideUp 0.6s ease 0.5s both;
                }

                .stat-item { text-align: left; }
                .stat-number {
                    font-family: 'Syne', sans-serif;
                    font-size: 28px;
                    font-weight: 800;
                    color: white;
                    line-height: 1;
                    margin-bottom: 4px;
                }
                .stat-label { font-size: 13px; color: #64748b; font-weight: 400; }

                /* Features section */
                .features-section {
                    padding: 100px 40px;
                    max-width: 1280px;
                    margin: 0 auto;
                }

                .section-label {
                    display: inline-block;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    color: #60a5fa;
                    margin-bottom: 16px;
                }

                .section-title {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(32px, 4vw, 48px);
                    font-weight: 800;
                    color: white;
                    margin-bottom: 16px;
                    line-height: 1.15;
                }

                .section-desc { font-size: 16px; color: #64748b; font-weight: 300; max-width: 500px; line-height: 1.7; }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    margin-top: 60px;
                }

                @media (max-width: 768px) {
                    .features-grid { grid-template-columns: 1fr; }
                    .hero { flex-direction: column; padding: 100px 24px 60px; }
                    .hero-visual { margin-top: 60px; }
                    .stats-bar { gap: 24px; flex-wrap: wrap; }
                    .float-card-1, .float-card-2 { display: none; }
                    .navbar { padding: 16px 24px; }
                }

                .feature-card {
                    background: rgba(15,23,42,0.6);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 20px;
                    padding: 32px;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    cursor: default;
                }

                .feature-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(59,130,246,0.05) 0%, transparent 60%);
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .feature-card:hover { transform: translateY(-4px); border-color: rgba(59,130,246,0.25); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
                .feature-card:hover::before { opacity: 1; }

                .feature-icon {
                    width: 48px; height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                }

                .feature-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 18px;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 10px;
                }

                .feature-desc { font-size: 14px; color: #64748b; line-height: 1.7; font-weight: 300; }

                /* Ticker */
                .ticker-wrap {
                    overflow: hidden;
                    padding: 16px 0;
                    background: rgba(59,130,246,0.05);
                    border-top: 1px solid rgba(59,130,246,0.1);
                    border-bottom: 1px solid rgba(59,130,246,0.1);
                }

                .ticker {
                    display: flex;
                    gap: 60px;
                    animation: ticker 20s linear infinite;
                    width: max-content;
                }

                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .ticker-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 13px;
                    font-weight: 500;
                    color: #64748b;
                    white-space: nowrap;
                }

                .ticker-item .up { color: #34d399; }
                .ticker-item .down { color: #f87171; }

                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* Footer */
                .footer {
                    padding: 40px;
                    text-align: center;
                    border-top: 1px solid rgba(255,255,255,0.05);
                    color: #334155;
                    font-size: 13px;
                }
            `}</style>

            <div className="sf-root">
                {/* Orbs */}
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />

                {/* Navbar */}
                <nav className="navbar">
                    <a href="/" className="nav-logo">
                        <div className="logo-icon">S</div>
                        <span className="logo-text">Smart<span>Finance.</span></span>
                    </a>
                    <div className="nav-links">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="btn-primary">Dashboard</Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="btn-ghost">Log in</Link>
                                <Link href={route('register')} className="btn-primary">Get Started</Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Ticker */}
                <div style={{ paddingTop: '80px' }}>
                    <div className="ticker-wrap">
                        <div className="ticker">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} style={{ display: 'flex', gap: '60px' }}>
                                    <span className="ticker-item">SDG Impact <span className="up">▲ +12.4%</span></span>
                                    <span className="ticker-item">UMKM Funded <span className="up">▲ +8.2%</span></span>
                                    <span className="ticker-item">Loan Disbursed <span className="up">Rp 2.4B</span></span>
                                    <span className="ticker-item">AI Score Avg <span className="up">▲ 87.3</span></span>
                                    <span className="ticker-item">SDG 1 Progress <span className="up">▲ +5.1%</span></span>
                                    <span className="ticker-item">SDG 8 Progress <span className="up">▲ +9.7%</span></span>
                                    <span className="ticker-item">SDG 9 Progress <span className="up">▲ +6.3%</span></span>
                                    <span className="ticker-item">Active Users <span className="up">▲ 4,821</span></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Hero */}
                <div style={{ position: 'relative' }} ref={heroRef}>
                    <div className="hero-bg" />
                    <div className="grid-pattern" />
                    <div className="hero" style={{ gap: '60px' }}>
                        <div className="hero-content">
                            <div className="hero-badge">
                                <Sparkles size={12} />
                                Fintech for SDGs 2026
                            </div>
                            <h1 className="hero-title sf-display">
                                Finance That<br />
                                Drives <span className="accent">Real Change.</span>
                            </h1>
                            <p className="hero-desc">
                                Platform keuangan digital berbasis AI untuk mendorong inklusi keuangan dan mempercepat pencapaian SDGs bagi UMKM Indonesia.
                            </p>
                            <div className="hero-cta">
                                <Link href={route('register')} className="cta-main">
                                    Mulai Sekarang <ArrowRight size={16} />
                                </Link>
                                <a href="#features" className="cta-secondary">
                                    Pelajari Fitur
                                </a>
                            </div>
                            <div className="stats-bar">
                                <div className="stat-item">
                                    <div className="stat-number">4.8K+</div>
                                    <div className="stat-label">Pengguna Aktif</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">Rp 2.4B</div>
                                    <div className="stat-label">Dana Tersalurkan</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">98.2%</div>
                                    <div className="stat-label">Tingkat Kepuasan</div>
                                </div>
                            </div>
                        </div>

                        <div className="hero-visual">
                            <div className="card-3d-wrapper">
                                {/* Floating mini cards */}
                                <div className="float-card float-card-1">
                                    <div className="float-label">AI Credit Score</div>
                                    <div className="float-value green">87.3 / 100</div>
                                </div>
                                <div className="float-card float-card-2">
                                    <div className="float-label">SDG Impact</div>
                                    <div className="float-value blue">+12.4% ▲</div>
                                </div>

                                {/* Main 3D card */}
                                <div
                                    className="card-3d"
                                    style={{
                                        transform: `rotateY(${parallaxX * 0.5}deg) rotateX(${-parallaxY * 0.3}deg)`
                                    }}
                                >
                                    <div className="card-chip" />
                                    <div className="card-number">•••• •••• •••• 2026</div>
                                    <div className="card-amount">Rp ∞</div>
                                    <div className="card-label">Total SDG Impact Contribution</div>
                                    <div className="card-footer">
                                        <div>
                                            <div className="card-name" style={{ fontSize: '10px', color: '#475569', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Kelompok 4</div>
                                            <div className="card-name">Akbar · Calvin · Ridhwan</div>
                                        </div>
                                        <div className="card-verified">
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399' }} />
                                            Verified
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <section id="features">
                    <div className="features-section">
                        <div>
                            <span className="section-label">Pilar Layanan</span>
                            <h2 className="section-title sf-display">Dirancang untuk<br />Dampak Nyata.</h2>
                            <p className="section-desc">Infrastruktur keuangan digital yang mendukung SDG 1, 8, dan 9 secara konsisten dan terukur.</p>
                        </div>
                        <div className="features-grid">
                            <FeatureCard
                                icon={<Globe size={22} color="#60a5fa" />}
                                iconBg="rgba(59,130,246,0.1)"
                                title="Inklusi Global"
                                desc="Menghubungkan masyarakat terpencil dengan akses layanan keuangan digital yang setara dan terjangkau."
                            />
                            <FeatureCard
                                icon={<ShieldCheck size={22} color="#34d399" />}
                                iconBg="rgba(52,211,153,0.1)"
                                title="Aman & Terpercaya"
                                desc="Verifikasi identitas berbasis AI dan big data untuk memastikan dana tersalurkan dengan tepat sasaran."
                            />
                            <FeatureCard
                                icon={<Zap size={22} color="#fbbf24" />}
                                iconBg="rgba(251,191,36,0.1)"
                                title="Proses Kilat"
                                desc="Pencairan dana pinjaman mikro dalam hitungan menit. Tidak ada birokrasi berlebihan."
                            />
                            <FeatureCard
                                icon={<TrendingUp size={22} color="#a78bfa" />}
                                iconBg="rgba(167,139,250,0.1)"
                                title="AI Credit Scoring"
                                desc="Sistem penilaian kredit berbasis machine learning yang akurat dan adil untuk semua kalangan."
                            />
                            <FeatureCard
                                icon={<Lock size={22} color="#f472b6" />}
                                iconBg="rgba(244,114,182,0.1)"
                                title="Enkripsi End-to-End"
                                desc="Semua transaksi dilindungi enkripsi militer. Data Anda sepenuhnya aman bersama kami."
                            />
                            <FeatureCard
                                icon={<Sparkles size={22} color="#38bdf8" />}
                                iconBg="rgba(56,189,248,0.1)"
                                title="SDG Analytics"
                                desc="Dashboard real-time untuk memantau dampak kontribusi Anda terhadap tujuan pembangunan global."
                            />
                        </div>
                    </div>
                </section>

                <div className="footer">
                    © 2026 Smart Finance — Kelompok 4 IMK · Fintech for SDGs
                </div>
            </div>
        </>
    );
}

type FeatureCardProps = {
    icon: ReactNode;
    iconBg: string;
    title: string;
    desc: string;
};

function FeatureCard({ icon, iconBg, title, desc }: FeatureCardProps) {
    return (
        <div className="feature-card">
            <div className="feature-icon" style={{ background: iconBg }}>
                {icon}
            </div>
            <div className="feature-title sf-display">{title}</div>
            <p className="feature-desc">{desc}</p>
        </div>
    );
}
