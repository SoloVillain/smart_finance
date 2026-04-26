import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    TrendingUp,
    History,
    LayoutDashboard,
    PieChart,
} from "lucide-react";
import { ReactNode, useState } from "react";

type Contribution = {
    id: number;
    program_name: string;
    sdg_type: string;
    amount: number;
    status: "aktif" | "pending" | "nonaktif";
};

type Stats = {
    total_asset?: number;
    total_donasi?: number;
    loan_count?: number;
};

type DashboardProps = {
    auth: {
        user: {
            name: string;
        };
    };
    contributions?: Contribution[];
    stats?: Stats;
};

type StatCardProps = {
    title: string;
    amount: string;
    icon: ReactNode;
    iconBg: string;
    trend?: string;
};

export default function Dashboard({
    auth,
    contributions = [],
    stats = {},
}: DashboardProps) {
    const { data, setData, post, processing, reset, errors } = useForm({
        amount: "",
        tenor: "",
    });

    const [displayAmount, setDisplayAmount] = useState('');
    const [displayTenor, setDisplayTenor] = useState('');

    const submitLoan = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("loans.store"), {
            onSuccess: () => {
                reset();
                setDisplayAmount('');
                setDisplayTenor('');
                alert("Pengajuan berhasil dikirim! Skor AI sedang menganalisis data Anda.");
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard - Smart Finance" />
            <style>{`
                .dash-root {
                    font-family: 'DM Sans', sans-serif;
                    background: #020617;
                    min-height: 100vh;
                    padding: 32px 24px;
                    position: relative;
                    overflow-x: hidden;
                }

                .sf-display { font-family: 'Syne', sans-serif; }

                .dash-bg-orb {
                    position: fixed;
                    border-radius: 50%;
                    filter: blur(100px);
                    pointer-events: none;
                    z-index: 0;
                    animation: dashOrb 12s ease-in-out infinite;
                }
                .dash-bg-orb-1 { width: 600px; height: 600px; background: rgba(59,130,246,0.07); top: -200px; left: -100px; animation-delay: 0s; }
                .dash-bg-orb-2 { width: 400px; height: 400px; background: rgba(99,102,241,0.06); bottom: 0; right: -100px; animation-delay: -6s; }

                @keyframes dashOrb {
                    0%, 100% { transform: translate(0,0); }
                    50% { transform: translate(30px, -30px); }
                }

                .dash-grid-pattern {
                    position: fixed;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
                    background-size: 60px 60px;
                    pointer-events: none;
                    z-index: 0;
                }

                .dash-content {
                    position: relative;
                    z-index: 10;
                    max-width: 1280px;
                    margin: 0 auto;
                }

                .dash-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 32px;
                    animation: fadeSlideUp 0.5s ease both;
                }

                .dash-greeting {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(24px, 3vw, 36px);
                    font-weight: 800;
                    color: white;
                    line-height: 1.1;
                    margin-bottom: 6px;
                }

                .dash-greeting .accent {
                    background: linear-gradient(135deg, #60a5fa, #818cf8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .dash-subtext { font-size: 14px; color: #475569; font-weight: 300; }
                .dash-subtext .up { color: #34d399; font-weight: 600; }

                .wallet-card {
                    background: linear-gradient(135deg, #0f172a, #1e293b);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 24px;
                    padding: 28px;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
                    transition: transform 0.3s ease;
                }

                .wallet-card:hover { transform: translateY(-4px); }

                .wallet-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(59,130,246,0.1) 0%, transparent 60%);
                    pointer-events: none;
                }

                .wallet-chip {
                    width: 40px; height: 30px;
                    background: linear-gradient(135deg, #fbbf24, #f59e0b);
                    border-radius: 5px;
                    margin-bottom: 32px;
                    position: relative;
                    overflow: hidden;
                }

                .wallet-chip::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.15) 4px, rgba(0,0,0,0.15) 5px);
                }

                .wallet-label { font-size: 10px; color: #475569; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
                .wallet-amount {
                    font-family: 'Syne', sans-serif;
                    font-size: 28px;
                    font-weight: 700;
                    color: white;
                    letter-spacing: -0.02em;
                    margin-bottom: 20px;
                }

                .wallet-footer { display: flex; justify-content: space-between; align-items: center; }
                .wallet-verified {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 10px;
                    color: #34d399;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                }
                .verified-dot { width: 6px; height: 6px; border-radius: 50%; background: #34d399; box-shadow: 0 0 6px #34d399; }

                .stat-cards-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                    margin-bottom: 24px;
                    animation: fadeSlideUp 0.5s ease 0.15s both;
                }

                .stat-card {
                    background: rgba(15,23,42,0.7);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 20px;
                    padding: 22px;
                    backdrop-filter: blur(10px);
                    transition: all 0.3s;
                    position: relative;
                    overflow: hidden;
                }

                .stat-card:hover { border-color: rgba(59,130,246,0.2); transform: translateY(-2px); }
                .stat-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(59,130,246,0.04) 0%, transparent 60%); opacity: 0; transition: opacity 0.3s; }
                .stat-card:hover::before { opacity: 1; }

                .stat-icon-wrap { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
                .stat-title { font-size: 11px; color: #475569; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; margin-bottom: 6px; }
                .stat-amount { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; color: white; letter-spacing: -0.02em; }
                .stat-trend { font-size: 11px; color: #34d399; margin-top: 4px; font-weight: 500; }

                .loan-form-card {
                    background: rgba(15,23,42,0.7);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 24px;
                    padding: 28px;
                    backdrop-filter: blur(10px);
                    margin-bottom: 24px;
                    animation: fadeSlideUp 0.5s ease 0.2s both;
                }

                .section-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 18px;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .section-title .icon-wrap {
                    width: 36px; height: 36px;
                    background: rgba(59,130,246,0.1);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .loan-form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr auto;
                    gap: 16px;
                    align-items: end;
                }

                .form-field label {
                    display: block;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #475569;
                    margin-bottom: 8px;
                }

                .form-field input {
                    width: 100%;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    padding: 12px 16px;
                    font-size: 14px;
                    color: white;
                    font-family: 'DM Sans', sans-serif;
                    outline: none;
                    transition: all 0.2s;
                }

                .form-field input::placeholder { color: #334155; }

                .form-field input:focus {
                    border-color: rgba(59,130,246,0.5);
                    background: rgba(59,130,246,0.05);
                    box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
                }

                /* Input prefix wrapper */
                .input-prefix-wrap {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .input-prefix {
                    position: absolute;
                    left: 14px;
                    font-size: 13px;
                    font-weight: 600;
                    color: #475569;
                    pointer-events: none;
                    font-family: 'DM Sans', sans-serif;
                }

                .input-prefix-wrap input {
                    padding-left: 42px !important;
                }

                .field-error { font-size: 12px; color: #f87171; margin-top: 5px; }

                .loan-submit-btn {
                    padding: 12px 24px;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-family: 'Syne', sans-serif;
                    font-size: 13px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 6px 20px rgba(59,130,246,0.3);
                    white-space: nowrap;
                    letter-spacing: 0.03em;
                }

                .loan-submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(59,130,246,0.45); }
                .loan-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                .table-card {
                    background: rgba(15,23,42,0.7);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 24px;
                    backdrop-filter: blur(10px);
                    overflow: hidden;
                    animation: fadeSlideUp 0.5s ease 0.3s both;
                }

                .table-header { padding: 24px 28px; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .table-title { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; color: white; display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
                .table-subtitle { font-size: 13px; color: #475569; }

                table { width: 100%; border-collapse: collapse; }
                thead tr { background: rgba(255,255,255,0.02); }
                thead th { padding: 14px 24px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #334155; text-align: left; }
                tbody tr { border-top: 1px solid rgba(255,255,255,0.04); transition: background 0.2s; }
                tbody tr:hover { background: rgba(59,130,246,0.04); }
                tbody td { padding: 18px 24px; font-size: 14px; color: #94a3b8; }

                .td-program { font-weight: 600; color: white; }
                tbody tr:hover .td-program { color: #60a5fa; }

                .sdg-badge { padding: 4px 12px; background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2); border-radius: 100px; font-size: 10px; font-weight: 700; color: #60a5fa; text-transform: uppercase; letter-spacing: 0.08em; }
                .td-amount { font-family: 'Syne', sans-serif; font-weight: 600; color: white; }
                .status-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
                .status-row { display: flex; align-items: center; gap: 8px; }
                .status-text { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-style: italic; }

                .empty-state { padding: 80px 24px; text-align: center; color: #1e293b; }
                .empty-state p { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 16px; color: #334155; }

                .top-grid {
                    display: grid;
                    grid-template-columns: 1fr 340px;
                    gap: 20px;
                    margin-bottom: 24px;
                    animation: fadeSlideUp 0.5s ease 0.1s both;
                }

                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 1024px) {
                    .top-grid { grid-template-columns: 1fr; }
                    .stat-cards-grid { grid-template-columns: 1fr 1fr; }
                    .loan-form-grid { grid-template-columns: 1fr 1fr; }
                    .loan-submit-btn { grid-column: span 2; width: 100%; }
                }

                @media (max-width: 640px) {
                    .stat-cards-grid { grid-template-columns: 1fr; }
                    .loan-form-grid { grid-template-columns: 1fr; }
                    .loan-submit-btn { grid-column: span 1; }
                }
            `}</style>

            <div className="dash-root">
                <div className="dash-bg-orb dash-bg-orb-1" />
                <div className="dash-bg-orb dash-bg-orb-2" />
                <div className="dash-grid-pattern" />

                <div className="dash-content">

                    {/* Header */}
                    <div className="dash-header">
                        <div>
                            <div className="dash-greeting sf-display">
                                Halo, <span className="accent">{auth.user.name}!</span> 👋
                            </div>
                            <p className="dash-subtext">
                                Progres kontribusi SDG Anda meningkat <span className="up">+12%</span> bulan ini.
                            </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.15)', borderRadius: '100px', padding: '8px 16px' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399' }} />
                            <span style={{ fontSize: '12px', color: '#34d399', fontWeight: 600, fontFamily: 'Syne, sans-serif' }}>Live Monitoring</span>
                        </div>
                    </div>

                    {/* Top Grid */}
                    <div className="top-grid">
                        <div className="stat-cards-grid" style={{ margin: 0 }}>
                            <StatCard
                                title="Total Donasi SDGs"
                                amount={`Rp ${stats.total_donasi?.toLocaleString('id-ID') || "0"}`}
                                icon={<ArrowDownLeft size={18} color="#34d399" />}
                                iconBg="rgba(52,211,153,0.1)"
                                trend="+8.2% bulan ini"
                            />
                            <StatCard
                                title="Pinjaman Aktif"
                                amount={`${stats.loan_count || 0} Program`}
                                icon={<ArrowUpRight size={18} color="#f87171" />}
                                iconBg="rgba(248,113,113,0.1)"
                                trend="Sedang berjalan"
                            />
                            <StatCard
                                title="Target Capaian"
                                amount="85% SDG 8"
                                icon={<TrendingUp size={18} color="#60a5fa" />}
                                iconBg="rgba(59,130,246,0.1)"
                                trend="+5% dari target"
                            />
                        </div>

                        {/* Wallet Card */}
                        <div className="wallet-card">
                            <div className="wallet-chip" />
                            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '13px', color: '#475569', letterSpacing: '0.15em', marginBottom: '8px' }}>
                                •••• •••• •••• 2026
                            </div>
                            <div className="wallet-label">Total Digital Asset</div>
                            <div className="wallet-amount">
                                Rp {stats.total_asset?.toLocaleString('id-ID') || "0"}
                            </div>
                            <div className="wallet-footer">
                                <div>
                                    <div style={{ fontSize: '10px', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Kelompok 4</div>
                                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Akbar · Calvin · Ridhwan</div>
                                </div>
                                <div className="wallet-verified">
                                    <div className="verified-dot" />
                                    Verified
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Loan Form */}
                    <div className="loan-form-card">
                        <div className="section-title sf-display">
                            <div className="icon-wrap">
                                <LayoutDashboard size={18} color="#60a5fa" />
                            </div>
                            Ajukan Modal Usaha (SDG 8)
                        </div>
                        <form onSubmit={submitLoan}>
                            <div className="loan-form-grid">
                                <div className="form-field">
                                    <label>Jumlah Pinjaman</label>
                                    <div className="input-prefix-wrap">
                                        <span className="input-prefix">Rp</span>
                                        <input
                                            type="text"
                                            placeholder="500.000"
                                            value={displayAmount}
                                            onChange={(e) => {
                                                const raw = e.target.value.replace(/\D/g, '');
                                                const formatted = raw ? Number(raw).toLocaleString('id-ID') : '';
                                                setDisplayAmount(formatted);
                                                setData("amount", raw);
                                            }}
                                        />
                                    </div>
                                    {errors.amount && <div className="field-error">{errors.amount}</div>}
                                </div>

                                <div className="form-field">
                                    <label>Tenor (Bulan)</label>
                                    <div className="input-prefix-wrap">
                                        <span className="input-prefix">📅</span>
                                        <input
                                            type="text"
                                            placeholder="12"
                                            value={displayTenor}
                                            onChange={(e) => {
                                                const raw = e.target.value.replace(/\D/g, '');
                                                setDisplayTenor(raw);
                                                setData("tenor", raw);
                                            }}
                                        />
                                    </div>
                                    {errors.tenor && <div className="field-error">{errors.tenor}</div>}
                                </div>

                                <button type="submit" className="loan-submit-btn" disabled={processing}>
                                    {processing ? "Menganalisis..." : "Ajukan Pinjaman"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="table-card">
                        <div className="table-header">
                            <div className="table-title sf-display">
                                <History size={18} color="#60a5fa" />
                                Monitoring Program SDGs
                            </div>
                            <div className="table-subtitle">Laporan real-time pemanfaatan fintech untuk target global.</div>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nama Program</th>
                                        <th>Kategori</th>
                                        <th>Nilai Kontribusi</th>
                                        <th>Status Verifikasi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contributions.length > 0 ? (
                                        contributions.map((item) => (
                                            <tr key={item.id}>
                                                <td className="td-program">{item.program_name}</td>
                                                <td><span className="sdg-badge">{item.sdg_type}</span></td>
                                                <td className="td-amount">Rp {Number(item.amount).toLocaleString('id-ID')}</td>
                                                <td>
                                                    <div className="status-row">
                                                        <div className="status-dot" style={{
                                                            background: item.status === 'aktif' ? '#34d399' : item.status === 'pending' ? '#fbbf24' : '#f87171',
                                                            boxShadow: `0 0 6px ${item.status === 'aktif' ? '#34d399' : item.status === 'pending' ? '#fbbf24' : '#f87171'}`
                                                        }} />
                                                        <span className="status-text" style={{
                                                            color: item.status === 'aktif' ? '#34d399' : item.status === 'pending' ? '#fbbf24' : '#f87171'
                                                        }}>{item.status}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4}>
                                                <div className="empty-state">
                                                    <PieChart size={40} color="#1e293b" />
                                                    <p>Belum ada pengajuan pinjaman</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ title, amount, icon, iconBg, trend }: StatCardProps) {
    return (
        <div className="stat-card">
            <div className="stat-icon-wrap" style={{ background: iconBg }}>
                {icon}
            </div>
            <div className="stat-title">{title}</div>
            <div className="stat-amount sf-display">{amount}</div>
            {trend && <div className="stat-trend">↑ {trend}</div>}
        </div>
    );
}
