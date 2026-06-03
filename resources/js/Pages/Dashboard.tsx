import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowDownLeft,
    ArrowUpRight,
    TrendingUp,
    LayoutDashboard,
    History,
    ArrowRight,
} from "lucide-react";
import { ReactNode } from "react";

type Stats = {
    total_asset?: number;
    total_donasi?: number;
    loan_count?: number;
};

type DashboardProps = {
    auth: { user: { name: string } };
    stats?: Stats;
};

export default function Dashboard({ auth, stats = {} }: DashboardProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard - Smart Finance" />
            <style>{`
                html, body, #app, .min-h-screen {
                    min-height: 100vh !important;
                    display: flex;
                    flex-direction: column;
                    overflow-y: auto !important;
                    overflow-x: hidden !important;
                }
                .dash-root {
                    font-family: 'DM Sans', sans-serif;
                    background: linear-gradient(165deg, #050a14 0%, #0a111f 48%, #0f1b2e 100%);
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow-y: auto;
                    overflow-x: clip;
                    padding: 42px 48px 64px;
                    position: relative;
                    color: #e2e8f0; /* Ditingkatkan dari #b8c5d6 agar teks default lebih cerah */
                    -webkit-font-smoothing: antialiased;
                }

                .dash-root::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse 70% 45% at 50% 0%, rgba(77,159,255,0.08) 0%, transparent 55%);
                    pointer-events: none;
                    z-index: 0;
                }

                .dash-content {
                    position: relative;
                    z-index: 1;
                    max-width: 1280px;
                    margin: 0 auto;
                    width: 100%;
                }

                /* ── HEADER ── */
                .dash-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 36px;
                    animation: fadeUp 0.4s ease both;
                }

                .dash-greeting {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(26px, 3vw, 38px);
                    font-weight: 800;
                    color: #ffffff;
                    letter-spacing: -0.035em;
                    line-height: 1.1;
                    margin-bottom: 6px;
                }

                .dash-greeting .name { color: #f0b429; }

                .dash-sub {
                    font-size: 14px;
                    font-weight: 400;
                    color: #cbd5e1; /* Kontras ditingkatkan dari #7d8fa8 (lebih putih & jelas) */
                    line-height: 1.5;
                }

                .dash-sub .up {
                    color: #4ade80;
                    font-weight: 600;
                }

                .live-badge {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    padding: 8px 16px;
                    background: rgba(74,222,128,0.07);
                    border: 1px solid rgba(74,222,128,0.18);
                    border-radius: 100px;
                    font-size: 11.5px;
                    font-weight: 700;
                    color: #4ade80;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    font-family: 'Syne', sans-serif;
                }

                .live-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #4ade80;
                    box-shadow: 0 0 6px #4ade80;
                }

                /* ── STATS ROW ── */
                .top-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr;
                    gap: 16px;
                    margin-bottom: 20px;
                    animation: fadeUp 0.4s ease 0.08s both;
                }

                .stat-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px;
                    padding: 22px 24px;
                    transition: border-color 0.2s;
                    position: relative;
                    overflow: hidden;
                }

                .stat-card::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 2px;
                    border-radius: 14px 14px 0 0;
                    opacity: 0;
                    transition: opacity 0.2s;
                }

                .stat-card.green::after { background: #4ade80; }
                .stat-card.red::after   { background: #f87171; }
                .stat-card.blue::after  { background: #60a5fa; }

                .stat-card:hover { border-color: rgba(255,255,255,0.13); }
                .stat-card:hover::after { opacity: 1; }

                .stat-icon-box {
                    width: 38px; height: 38px;
                    border-radius: 9px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 16px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                }

                .stat-lbl {
                    font-size: 10.5px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    color: #94a3b8; /* Kontras ditingkatkan dari #7d8fa8 (label kecil di atas angka) */
                    margin-bottom: 7px;
                }

                .stat-val {
                    font-family: 'Syne', sans-serif;
                    font-size: 22px;
                    font-weight: 800;
                    color: #ffffff;
                    letter-spacing: -0.025em;
                    line-height: 1;
                    margin-bottom: 5px;
                }

                .stat-trend {
                    font-size: 11.5px;
                    font-weight: 600;
                    color: #4ade80;
                }

                /* ── WALLET CARD ── */
                .wallet-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.09);
                    border-radius: 14px;
                    padding: 22px 24px;
                    position: relative;
                    overflow: hidden;
                }

                .wallet-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #60a5fa, #a78bfa);
                    border-radius: 14px 14px 0 0;
                }

                .wallet-chip {
                    width: 38px; height: 28px;
                    background: linear-gradient(135deg, #fbbf24, #d97706);
                    border-radius: 5px;
                    margin-bottom: 28px;
                    position: relative;
                    overflow: hidden;
                }
                .wallet-chip::after {
                    content: '';
                    position: absolute; inset: 0;
                    background: repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.12) 4px, rgba(0,0,0,0.12) 5px);
                }

                .wallet-num {
                    font-family: 'Syne', sans-serif;
                    font-size: 12px;
                    font-weight: 600;
                    color: #94a3b8; /* Kontras ditingkatkan dari #475569 agar nomor kartu lebih kelihatan */
                    letter-spacing: 0.16em;
                    margin-bottom: 8px;
                }

                .wallet-lbl {
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #94a3b8; /* Kontras ditingkatkan dari #475569 */
                    margin-bottom: 4px;
                }

                .wallet-amount {
                    font-family: 'Syne', sans-serif;
                    font-size: 22px;
                    font-weight: 800;
                    color: #ffffff;
                    letter-spacing: -0.025em;
                    margin-bottom: 20px;
                }

                .wallet-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }

                .wallet-owner-lbl {
                    font-size: 9.5px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #64748b; /* Kontras ditingkatkan dari #334155 */
                    margin-bottom: 3px;
                }

                .wallet-owner-name {
                    font-size: 12.5px;
                    font-weight: 500;
                    color: #cbd5e1; /* Kontras ditingkatkan dari #64748b agar nama kelompok terbaca jelas */
                }

                .wallet-verified {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 10px;
                    font-weight: 700;
                    color: #4ade80;
                    text-transform: uppercase;
                    letter-spacing: 0.07em;
                }

                .verified-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #4ade80;
                    box-shadow: 0 0 5px #4ade80;
                }

                /* ── SHORTCUT CARDS ── */
                .shortcuts-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                    animation: fadeUp 0.4s ease 0.16s both;
                }

                .shortcut-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px;
                    padding: 28px;
                    text-decoration: none;
                    display: block;
                    transition: all 0.22s;
                    position: relative;
                    overflow: hidden;
                }

                .shortcut-card::after {
                    content: '';
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    height: 2px;
                    opacity: 0;
                    transition: opacity 0.22s;
                }

                .shortcut-card.blue::after { background: linear-gradient(90deg, #60a5fa, #818cf8); }
                .shortcut-card.green::after { background: linear-gradient(90deg, #4ade80, #22d3ee); }

                .shortcut-card:hover {
                    border-color: rgba(255,255,255,0.13);
                    transform: translateY(-3px);
                    box-shadow: 0 16px 32px rgba(0,0,0,0.25);
                }
                .shortcut-card:hover::after { opacity: 1; }

                .shortcut-icon {
                    width: 46px; height: 46px;
                    border-radius: 11px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 18px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                }

                .shortcut-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 18px;
                    font-weight: 800;
                    color: #ffffff;
                    letter-spacing: -0.02em;
                    margin-bottom: 8px;
                }

                .shortcut-desc {
                    font-size: 13px;
                    font-weight: 400;
                    color: #cbd5e1; /* Kontras ditingkatkan dari #7d8fa8 agar deskripsi shortcut card lebih tajam */
                    line-height: 1.65;
                    margin-bottom: 20px;
                }

                .shortcut-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 13px;
                    font-weight: 700;
                    color: #e2e8f0; /* Kontras ditingkatkan dari #b8c5d6 */
                    font-family: 'Syne', sans-serif;
                    letter-spacing: 0.01em;
                    transition: gap 0.2s;
                }

                .shortcut-card:hover .shortcut-link { gap: 10px; }
                .shortcut-card.blue .shortcut-link { color: #60a5fa; }
                .shortcut-card.green .shortcut-link { color: #4ade80; }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 1100px) {
                    .top-grid { grid-template-columns: 1fr 1fr; }
                }

                @media (max-width: 768px) {
                    .dash-root {
                        padding: 32px 20px 48px;
                        height: auto !important;
                        min-height: 100vh;
                        overflow-y: visible;
                    }
                    .top-grid { grid-template-columns: 1fr; }
                    .shortcuts-grid { grid-template-columns: 1fr; }
                    .dash-header { flex-direction: column; gap: 16px; align-items: flex-start; }
                }
            `}</style>

            <div className="dash-root">
                <div className="dash-content">
                    {/* Header */}
                    <div className="dash-header">
                        <div>
                            <div className="dash-greeting">
                                Halo,{" "}
                                <span className="name">{auth.user.name}!</span>{" "}
                                👋
                            </div>
                            <p className="dash-sub">
                                Selamat datang kembali di Smart Finance. Pantau
                                progres SDGs dan kelola aset digital Anda secara
                                real-time.
                            </p>
                        </div>
                        <div className="live-badge">
                            <div className="live-dot" />
                            Live Monitoring
                        </div>
                    </div>

                    {/* Top Grid — 3 stat cards + wallet */}
                    <div className="top-grid">
                        {/* Stat 1 */}
                        <div className="stat-card green">
                            <div className="stat-icon-box">
                                <ArrowDownLeft size={17} color="#4ade80" />
                            </div>
                            <div className="stat-lbl">Total Donasi SDGs</div>
                            <div className="stat-val">
                                Rp{" "}
                                {Number(stats.total_donasi || 0).toLocaleString(
                                    "id-ID",
                                )}
                            </div>
                            <div className="stat-trend">↑ +8.2% bulan ini</div>
                        </div>

                        {/* Stat 2 */}
                        <div className="stat-card red">
                            <div className="stat-icon-box">
                                <ArrowUpRight size={17} color="#f87171" />
                            </div>
                            <div className="stat-lbl">Pinjaman Aktif</div>
                            <div className="stat-val">
                                {stats.loan_count || 0} Program
                            </div>
                            <div
                                className="stat-trend"
                                style={{
                                    color: "#cbd5e1",
                                }} /* Tingkat kontras teks status "Sedang berjalan" ditingkatkan */
                            >
                                Sedang berjalan
                            </div>
                        </div>

                        {/* Stat 3 */}
                        <div className="stat-card blue">
                            <div className="stat-icon-box">
                                <TrendingUp size={17} color="#60a5fa" />
                            </div>
                            <div className="stat-lbl">Target Capaian</div>
                            <div className="stat-val">85% SDG 8</div>
                            <div className="stat-trend">↑ +5% dari target</div>
                        </div>

                        {/* Wallet */}
                        <div className="wallet-card">
                            <div className="wallet-chip" />
                            <div className="wallet-num">
                                •••• •••• •••• 2026
                            </div>
                            <div className="wallet-lbl">
                                Total Digital Asset
                            </div>
                            <div className="wallet-amount">
                                Rp{" "}
                                {Number(stats.total_asset || 0).toLocaleString(
                                    "id-ID",
                                )}
                            </div>
                            <div className="wallet-footer">
                                <div>
                                    <div className="wallet-owner-lbl">
                                        Kelompok 4
                                    </div>
                                    <div className="wallet-owner-name">
                                        Akbar · Calvin · Ridhwan
                                    </div>
                                </div>
                                <div className="wallet-verified">
                                    <div className="verified-dot" />
                                    Verified
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shortcut Cards */}
                    <div className="shortcuts-grid">
                        <Link
                            href={route("loans.create")}
                            className="shortcut-card blue"
                        >
                            <div className="shortcut-icon">
                                <LayoutDashboard size={20} color="#60a5fa" />
                            </div>
                            <div className="shortcut-title">
                                Ajukan Pinjaman
                            </div>
                            <div className="shortcut-desc">
                                Ajukan modal usaha mikro dengan analisis AI
                                modern untuk mendukung perkembangan bisnis UMKM
                                Anda.
                            </div>
                            <div className="shortcut-link">
                                Ajukan Sekarang <ArrowRight size={14} />
                            </div>
                        </Link>

                        <Link
                            href={route("loans.monitoring")}
                            className="shortcut-card green"
                        >
                            <div className="shortcut-icon">
                                <History size={20} color="#4ade80" />
                            </div>
                            <div className="shortcut-title">
                                Monitoring SDGs
                            </div>
                            <div className="shortcut-desc">
                                Pantau progres kontribusi SDGs, riwayat
                                pinjaman, serta pembayaran secara real-time
                                dalam satu dashboard.
                            </div>
                            <div className="shortcut-link">
                                Lihat Monitoring <ArrowRight size={14} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
