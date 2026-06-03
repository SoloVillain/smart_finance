import { Link, Head } from "@inertiajs/react";
import {
    ShieldCheck, Zap, Globe, ArrowRight,
    TrendingUp, Lock, Sparkles, Menu, X,
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

type WelcomeProps = { auth: { user?: any } };

export default function Welcome({ auth }: WelcomeProps) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const h = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", h);
        return () => window.removeEventListener("mousemove", h);
    }, []);

    const px = (mousePos.x / (window.innerWidth || 1) - 0.5) * 14;
    const py = (mousePos.y / (window.innerHeight || 1) - 0.5) * 14;

    return (
        <>
            <Head title="Smart Finance" />
            <style>{`
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                html, body {
                    width: 100%;
                    min-height: 100%;
                    overflow-x: hidden;
                    background: #050a14;
                    -webkit-font-smoothing: antialiased;
                }

                .wc-root {
                    font-family: 'DM Sans', sans-serif;
                    background: linear-gradient(165deg, #050a14 0%, #0a111f 48%, #0f1b2e 100%);
                    color: #b8c5d6;
                    min-height: 100vh;
                    overflow-x: hidden;
                    position: relative;
                }

                .wc-root::before {
                    content: '';
                    position: fixed; inset: 0;
                    background: radial-gradient(ellipse 70% 45% at 50% 0%, rgba(77,159,255,0.08) 0%, transparent 55%);
                    pointer-events: none; z-index: 0;
                }

                /* ─── NAVBAR (identik dengan AuthenticatedLayout) ─── */
                .wc-nav {
                    position: fixed;
                    top: 0; left: 0; right: 0; z-index: 200;
                    height: 62px;
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 0 40px;
                    background: rgba(5,10,20,0.9);
                    backdrop-filter: blur(18px);
                    -webkit-backdrop-filter: blur(18px);
                    border-bottom: 1px solid rgba(255,255,255,0.07);
                }

                .wc-logo {
                    display: flex; align-items: center; gap: 9px;
                    text-decoration: none; flex-shrink: 0;
                }

                .wc-logo-mark {
                    width: 32px; height: 32px;
                    background: #f0b429; border-radius: 7px;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Syne', sans-serif;
                    font-weight: 800; font-size: 15px;
                    color: #050a14; line-height: 1;
                }

                .wc-logo-text {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700; font-size: 16px;
                    color: #f0f6fc; letter-spacing: -0.01em;
                }
                .wc-logo-text em { color: #f0b429; font-style: normal; }

                .wc-nav-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

                .wc-btn-ghost {
                    padding: 6px 13px; border-radius: 7px;
                    font-size: 13px; font-weight: 500;
                    color: #ffffff; text-decoration: none;
                    transition: all 0.18s;
                    border: 1px solid transparent;
                    font-family: 'DM Sans', sans-serif;
                }
                .wc-btn-ghost:hover { color: #f0f6fc; background: rgba(255,255,255,0.06); }

                .wc-btn-solid {
                    padding: 6px 16px; border-radius: 7px;
                    font-size: 13px; font-weight: 700;
                    color: #050a14; text-decoration: none;
                    background: #f0b429;
                    transition: all 0.18s;
                    font-family: 'Syne', sans-serif;
                }
                .wc-btn-solid:hover { background: #f5c842; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(240,180,41,0.3); }

                .wc-mobile-btn {
                    display: none;
                    background: none; border: none;
                    color: #7d8fa8; cursor: pointer;
                    padding: 6px; border-radius: 8px;
                    transition: all 0.18s;
                }
                .wc-mobile-btn:hover { color: #f0f6fc; background: rgba(255,255,255,0.06); }

                /* ─── MOBILE MENU ─── */
                .wc-mobile-menu {
                    position: fixed;
                    top: 62px; left: 0; right: 0;
                    background: rgba(5,10,20,0.97);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255,255,255,0.07);
                    padding: 20px;
                    z-index: 199;
                    animation: wcSlideDown 0.2s ease both;
                }

                @keyframes wcSlideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .wc-mobile-link {
                    display: flex; align-items: center; gap: 10px;
                    padding: 12px 14px; border-radius: 9px;
                    font-size: 15px; font-weight: 600;
                    color: #c9d6e3; text-decoration: none;
                    transition: all 0.18s; margin-bottom: 6px;
                    font-family: 'DM Sans', sans-serif;
                }
                .wc-mobile-link:hover { color: #f0f6fc; background: rgba(255,255,255,0.06); }

                .wc-mobile-link-solid {
                    display: block; width: 100%;
                    padding: 12px 14px; border-radius: 9px;
                    font-size: 15px; font-weight: 700;
                    color: #050a14; text-decoration: none;
                    background: #f0b429; text-align: center;
                    font-family: 'Syne', sans-serif;
                    margin-top: 4px;
                    transition: all 0.18s;
                }
                .wc-mobile-link-solid:hover { background: #f5c842; }

                /* ─── TICKER ─── */
                .wc-ticker {
                    margin-top: 62px;
                    overflow: hidden; padding: 11px 0;
                    background: rgba(0,0,0,0.2);
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                }

                .wc-ticker-inner {
                    display: flex; gap: 48px;
                    animation: wcTicker 24s linear infinite;
                    width: max-content;
                }

                @keyframes wcTicker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

                .wc-tick {
                    font-size: 12px; font-weight: 600;
                    color: #7d8fa8; white-space: nowrap;
                    display: flex; align-items: center; gap: 6px;
                }
                .wc-tick strong { color: #c9d6e3; font-weight: 700; }
                .wc-tick .up { color: #4ade80; }

                /* ─── HERO ─── */
                .wc-hero {
                    position: relative; z-index: 1;
                    max-width: 1280px; margin: 0 auto;
                    padding: 60px 40px 72px;
                    min-height: calc(100vh - 62px - 40px);
                    display: flex; flex-direction: column;
                }

                .wc-hero-visual {
                    flex: 1; display: flex;
                    align-items: center; justify-content: center;
                    min-height: 260px;
                }

                .coins-cluster {
                    position: relative;
                    width: 300px; height: 260px;
                    transition: transform 0.1s ease;
                }

                .coin {
                    position: absolute; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Syne', sans-serif; font-weight: 800;
                    color: rgba(255,255,255,0.95);
                    border: 1px solid rgba(255,255,255,0.2);
                    box-shadow: 0 14px 36px rgba(0,0,0,0.35), inset 0 2px 8px rgba(255,255,255,0.18);
                }

                .coin-main {
                    width: 108px; height: 108px;
                    left: 50%; top: 44%;
                    transform: translate(-50%,-50%);
                    background: linear-gradient(145deg, rgba(255,255,255,0.3), rgba(160,190,230,0.1));
                    font-size: 36px; z-index: 3;
                    animation: coinMain 6s ease-in-out infinite;
                }
                @keyframes coinMain {
                    0%,100% { transform: translate(-50%,-50%) translateY(0); }
                    50% { transform: translate(-50%,-50%) translateY(-12px); }
                }

                .coin-2 { width: 66px; height: 66px; left:14%; top:20%; font-size:20px; background: linear-gradient(145deg, rgba(255,255,255,0.18), rgba(120,150,200,0.08)); animation: coinFloat 5s ease-in-out infinite; }
                .coin-3 { width: 58px; height: 58px; right:10%; top:26%; font-size:15px; background: linear-gradient(145deg, rgba(255,255,255,0.15), rgba(100,140,200,0.07)); animation: coinFloat 5s ease-in-out infinite -1.5s; }
                .coin-4 { width: 50px; height: 50px; left:6%; bottom:16%; font-size:13px; background: linear-gradient(145deg, rgba(255,255,255,0.13), rgba(90,130,190,0.06)); animation: coinFloat 5s ease-in-out infinite -3s; }
                .coin-5 { width: 46px; height: 46px; right:18%; bottom:10%; font-size:12px; background: linear-gradient(145deg, rgba(255,255,255,0.11), rgba(80,120,180,0.05)); animation: coinFloat 5s ease-in-out infinite -2s; }

                @keyframes coinFloat {
                    0%,100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }

                /* ─── HERO COPY ─── */
                .wc-hero-bottom { max-width: 740px; }

                .wc-badge {
                    display: inline-flex; align-items: center; gap: 6px;
                    margin-bottom: 18px;
                    font-size: 11px; font-weight: 700;
                    letter-spacing: 0.14em; text-transform: uppercase;
                    color: #94a3b8; /* lebih terang dari sebelumnya */
                }

                .wc-h1 {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(32px, 4.8vw, 54px);
                    font-weight: 800; line-height: 1.06;
                    color: #ffffff; letter-spacing: -0.04em;
                    margin-bottom: 18px;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.3);
                }

                .wc-desc {
                    font-size: 16px; font-weight: 400;
                    line-height: 1.75;
                    color: #c9d6e3; /* lebih terang agar terbaca */
                    max-width: 560px; margin-bottom: 28px;
                }

                .wc-cta { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 36px; }

                .wc-cta-main {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 13px 28px; border-radius: 9px;
                    font-size: 14px; font-weight: 700;
                    color: #050a14; text-decoration: none;
                    background: #f0b429;
                    transition: all 0.2s;
                    font-family: 'Syne', sans-serif;
                    box-shadow: 0 6px 20px rgba(240,180,41,0.25);
                }
                .wc-cta-main:hover { background: #f5c842; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(240,180,41,0.35); }
                .wc-cta-main svg { transition: transform 0.2s; }
                .wc-cta-main:hover svg { transform: translateX(4px); }

                .wc-cta-ghost {
                    display: inline-flex; align-items: center;
                    padding: 13px 28px; border-radius: 9px;
                    font-size: 14px; font-weight: 600;
                    color: #e2e8f0; text-decoration: none; /* lebih terang */
                    border: 1px solid rgba(255,255,255,0.2);
                    transition: all 0.2s;
                }
                .wc-cta-ghost:hover { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.05); color: #ffffff; }

                /* ─── STATS BAR ─── */
                .wc-stats {
                    display: flex; gap: 44px;
                    padding-top: 28px;
                    border-top: 1px solid rgba(255,255,255,0.09);
                }

                .wc-stat-n {
                    font-family: 'Syne', sans-serif;
                    font-size: 28px; font-weight: 800;
                    color: #ffffff; /* solid white */
                    margin-bottom: 4px; line-height: 1;
                }

                .wc-stat-l {
                    font-size: 11px; font-weight: 700;
                    text-transform: uppercase; letter-spacing: 0.1em;
                    color: #94a3b8; /* cukup kontras */
                }

                /* ─── FEATURES ─── */
                .wc-feat-section {
                    position: relative; z-index: 1;
                    max-width: 1280px; margin: 0 auto;
                    padding: 60px 40px 72px;
                    border-top: 1px solid rgba(255,255,255,0.07);
                }

                .wc-eyebrow {
                    font-size: 11px; font-weight: 700;
                    text-transform: uppercase; letter-spacing: 0.14em;
                    color: #94a3b8; margin-bottom: 10px;
                }

                .wc-feat-h2 {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(26px, 3vw, 36px);
                    font-weight: 800; color: #ffffff;
                    margin-bottom: 12px; letter-spacing: -0.03em;
                }

                .wc-feat-sub {
                    font-size: 15px; color: #c9d6e3; /* más claro */
                    max-width: 500px; line-height: 1.7;
                }

                .wc-feat-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 14px; margin-top: 44px;
                }

                .wc-feat-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 14px; padding: 26px;
                    transition: all 0.22s;
                    position: relative; overflow: hidden;
                }

                .wc-feat-card::after {
                    content: '';
                    position: absolute; bottom: 0; left: 0; right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #f0b429, #38bdf8);
                    opacity: 0; transition: opacity 0.22s;
                }

                .wc-feat-card:hover { border-color: rgba(255,255,255,0.14); transform: translateY(-3px); box-shadow: 0 14px 28px rgba(0,0,0,0.25); }
                .wc-feat-card:hover::after { opacity: 1; }

                .wc-feat-icon {
                    width: 42px; height: 42px; border-radius: 10px;
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 16px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .wc-feat-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 16px; font-weight: 700;
                    color: #f0f6fc; /* putih terang */
                    margin-bottom: 8px;
                }

                .wc-feat-desc {
                    font-size: 13.5px;
                    color: #c9d6e3; /* kontras cukup */
                    line-height: 1.65;
                }

                /* ─── FOOTER ─── */
                .wc-footer {
                    position: relative; z-index: 1;
                    padding: 22px 40px; text-align: center;
                    font-size: 12.5px; font-weight: 500;
                    color: #7d8fa8;
                    border-top: 1px solid rgba(255,255,255,0.06);
                    background: rgba(0,0,0,0.15);
                }

                /* ─── RESPONSIVE ─── */
                @media (max-width: 900px) {
                    .wc-nav { padding: 0 20px; }
                    .wc-btn-ghost { display: none; }
                    .wc-btn-solid { display: none; }
                    .wc-mobile-btn { display: flex; }
                    .wc-hero { padding: 40px 20px 56px; }
                    .wc-feat-section { padding: 48px 20px 56px; }
                    .wc-feat-grid { grid-template-columns: 1fr; }
                    .wc-stats { gap: 28px; flex-wrap: wrap; }
                    .coins-cluster { transform: scale(0.88) !important; }
                    .wc-footer { padding: 20px; }
                }
            `}</style>

            <div className="wc-root">
                {/* ── NAVBAR ── */}
                <nav className="wc-nav">
                    <Link href="/" className="wc-logo">
                        <div className="wc-logo-mark">S</div>
                        <span className="wc-logo-text">Smart<em>Finance</em></span>
                    </Link>

                    <div className="wc-nav-right">
                        {auth.user ? (
                            <Link href={route("dashboard")} className="wc-btn-solid">Dashboard</Link>
                        ) : (
                            <>
                                <Link href={route("login")} className="wc-btn-ghost">Masuk</Link>
                                <Link href={route("register")} className="wc-btn-solid">Mulai Gratis</Link>
                            </>
                        )}
                        <button className="wc-mobile-btn" onClick={() => setMobileOpen(p => !p)}>
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </nav>

                {/* ── MOBILE MENU ── */}
                {mobileOpen && (
                    <div className="wc-mobile-menu">
                        <a href="#features" className="wc-mobile-link" onClick={() => setMobileOpen(false)}>
                            Fitur
                        </a>
                        {auth.user ? (
                            <Link href={route("dashboard")} className="wc-mobile-link-solid">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route("login")} className="wc-mobile-link">
                                    Masuk
                                </Link>
                                <Link href={route("register")} className="wc-mobile-link-solid">
                                    Mulai Gratis →
                                </Link>
                            </>
                        )}
                    </div>
                )}

                {/* ── TICKER ── */}
                <div className="wc-ticker">
                    <div className="wc-ticker-inner">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} style={{ display: "flex", gap: "48px" }}>
                                {[
                                    ["SDG Impact", "+12.4%"],
                                    ["UMKM Funded", "+8.2%"],
                                    ["Loan Disbursed", "Rp 2.4B"],
                                    ["AI Score Avg", "87.3"],
                                    ["SDG 1 Progress", "+5.1%"],
                                    ["SDG 8 Progress", "+9.7%"],
                                    ["Active Users", "4,821"],
                                ].map(([label, val]) => (
                                    <span key={label} className="wc-tick">
                                        <strong>{label}</strong>
                                        <span className="up">▲ {val}</span>
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── HERO ── */}
                <section>
                    <div className="wc-hero">
                        <div className="wc-hero-visual">
                            <div
                                className="coins-cluster"
                                style={{ transform: `translate(${px}px, ${py}px)` }}
                            >
                                <div className="coin coin-2">$</div>
                                <div className="coin coin-3">$</div>
                                <div className="coin coin-4">$</div>
                                <div className="coin coin-5">$</div>
                                <div className="coin coin-main">$</div>
                            </div>
                        </div>

                        <div className="wc-hero-bottom">
                            <div className="wc-badge">
                                <Sparkles size={12} />
                                Fintech for SDGs 2026
                            </div>
                            <h1 className="wc-h1">
                                The apex of digital<br />finance for real impact.
                            </h1>
                            <p className="wc-desc">
                                Platform keuangan digital berbasis AI untuk mendorong inklusi keuangan dan mempercepat pencapaian SDGs bagi UMKM Indonesia.
                            </p>
                            <div className="wc-cta">
                                <Link href={route("register")} className="wc-cta-main">
                                    Mulai Sekarang <ArrowRight size={15} />
                                </Link>
                                <a href="#features" className="wc-cta-ghost">
                                    Pelajari Fitur
                                </a>
                            </div>
                            <div className="wc-stats">
                                <div>
                                    <div className="wc-stat-n">4.8K+</div>
                                    <div className="wc-stat-l">Pengguna Aktif</div>
                                </div>
                                <div>
                                    <div className="wc-stat-n">Rp 2.4B</div>
                                    <div className="wc-stat-l">Dana Tersalurkan</div>
                                </div>
                                <div>
                                    <div className="wc-stat-n">98.2%</div>
                                    <div className="wc-stat-l">Kepuasan</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── FEATURES ── */}
                <section id="features">
                    <div className="wc-feat-section">
                        <div className="wc-eyebrow">Pilar Layanan</div>
                        <h2 className="wc-feat-h2">Dirancang untuk dampak nyata.</h2>
                        <p className="wc-feat-sub">
                            Infrastruktur keuangan digital yang mendukung SDG 1, 8, dan 9 secara konsisten dan terukur.
                        </p>
                        <div className="wc-feat-grid">
                            {[
                                { icon: <Globe size={19} color="#38bdf8" />, title: "Inklusi Global", desc: "Menghubungkan masyarakat terpencil dengan akses layanan keuangan digital yang setara dan terjangkau." },
                                { icon: <ShieldCheck size={19} color="#4ade80" />, title: "Aman & Terpercaya", desc: "Verifikasi identitas berbasis AI dan big data untuk memastikan dana tersalurkan dengan tepat sasaran." },
                                { icon: <Zap size={19} color="#f0b429" />, title: "Proses Kilat", desc: "Pencairan dana pinjaman mikro dalam hitungan menit. Tidak ada birokrasi berlebihan." },
                                { icon: <TrendingUp size={19} color="#a78bfa" />, title: "AI Credit Scoring", desc: "Sistem penilaian kredit berbasis machine learning yang akurat dan adil untuk semua kalangan." },
                                { icon: <Lock size={19} color="#f87171" />, title: "Enkripsi End-to-End", desc: "Semua transaksi dilindungi enkripsi militer. Data Anda sepenuhnya aman bersama kami." },
                                { icon: <Sparkles size={19} color="#38bdf8" />, title: "SDG Analytics", desc: "Dashboard real-time untuk memantau dampak kontribusi Anda terhadap tujuan pembangunan global." },
                            ].map(f => (
                                <div className="wc-feat-card" key={f.title}>
                                    <div className="wc-feat-icon">{f.icon}</div>
                                    <div className="wc-feat-title">{f.title}</div>
                                    <p className="wc-feat-desc">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <footer className="wc-footer">
                    © 2026 Smart Finance — Kelompok 4 IMK · Fintech for SDGs
                </footer>
            </div>
        </>
    );
}
