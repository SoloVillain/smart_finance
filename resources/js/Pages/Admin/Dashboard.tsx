import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import { Head, useForm } from "@inertiajs/react";
import {
    ShieldCheck,
    Clock,
    TrendingUp,
    CheckCircle,
    XCircle,
    AlertTriangle,
} from "lucide-react";

type User = {
    name: string;
    email: string;
};

type Loan = {
    id: number;
    amount: number;
    skor_kredit: number;
    user?: User;
};

type Stats = {
    total_pending?: number;
    total_aktif?: number;
    total_sdg_impact?: number;
};

type AdminDashboardProps = {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
    pendingLoans: Loan[];
    stats: Stats;
};

export default function Dashboard({
    auth,
    pendingLoans,
    stats,
}: AdminDashboardProps) {
    const { processing } = useForm({ action: "" });

    const handleVerify = (loanId: number, actionType: string) => {
        const message = actionType === "approve" ? "menyetujui" : "menolak";
        if (confirm(`Apakah Anda yakin ingin ${message} pinjaman ini?`)) {
            router.post(
                route("admin.loans.verify", { loan: loanId }),
                { action: actionType },
                {
                    preserveScroll: true,
                    onSuccess: () => alert("Berhasil memperbarui status!"),
                    onError: (errors) => alert("Gagal: " + errors.action),
                },
            );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />
            <style>{`

                .admin-root {
                    font-family: 'DM Sans', sans-serif;
                    background: #020617;
                    min-height: 100vh;
                    padding: 88px 24px 60px;
                    position: relative;
                    overflow-x: hidden;
                }

                .sf-display { font-family: 'Syne', sans-serif; }

                .admin-bg-orb {
                    position: fixed;
                    border-radius: 50%;
                    filter: blur(100px);
                    pointer-events: none;
                    z-index: 0;
                    animation: adminOrb 12s ease-in-out infinite;
                }
                .admin-bg-orb-1 { width: 500px; height: 500px; background: rgba(99,102,241,0.08); top: -100px; right: -100px; animation-delay: 0s; }
                .admin-bg-orb-2 { width: 400px; height: 400px; background: rgba(59,130,246,0.06); bottom: 0; left: -100px; animation-delay: -6s; }

                @keyframes adminOrb {
                    0%, 100% { transform: translate(0,0); }
                    50% { transform: translate(20px, -20px); }
                }

                .admin-grid-pattern {
                    position: fixed;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
                    background-size: 60px 60px;
                    pointer-events: none;
                    z-index: 0;
                }

                .admin-content {
                    position: relative;
                    z-index: 10;
                    max-width: 1280px;
                    margin: 0 auto;
                }

                /* Header */
                .admin-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 28px;
                    animation: fadeSlideUp 0.4s ease both;
                }

                .admin-title {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(24px, 3vw, 32px);
                    font-weight: 800;
                    color: white;
                    margin-bottom: 4px;
                }

                .admin-title span {
                    background: linear-gradient(135deg, #818cf8, #60a5fa);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .admin-subtitle { font-size: 13px; color: #475569; }

                .admin-badge {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(99,102,241,0.08);
                    border: 1px solid rgba(99,102,241,0.2);
                    border-radius: 100px;
                    padding: 8px 16px;
                    font-size: 12px;
                    font-weight: 700;
                    color: #818cf8;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    font-family: 'Syne', sans-serif;
                }

                .admin-badge-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #818cf8;
                    box-shadow: 0 0 6px #818cf8;
                }

                /* Stat Cards */
                .admin-stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                    margin-bottom: 24px;
                    animation: fadeSlideUp 0.4s ease 0.1s both;
                }

                .admin-stat-card {
                    background: rgba(15,23,42,0.7);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 20px;
                    padding: 28px 28px 32px;
                    backdrop-filter: blur(10px);
                    transition: all 0.3s;
                    position: relative;
                    overflow: hidden;
                }

                .admin-stat-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 3px;
                    border-radius: 20px 20px 0 0;
                }

                .admin-stat-card.yellow::before { background: linear-gradient(90deg, #fbbf24, #f59e0b); }
                .admin-stat-card.green::before { background: linear-gradient(90deg, #34d399, #059669); }
                .admin-stat-card.blue::before { background: linear-gradient(90deg, #60a5fa, #3b82f6); }

                .admin-stat-card:hover { border-color: rgba(99,102,241,0.2); transform: translateY(-3px); }

                .stat-icon-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 16px;
                }

                .stat-icon-box {
                    width: 42px; height: 42px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .stat-card-label {
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #475569;
                    margin-bottom: 6px;
                }

                .stat-card-value {
                    font-family: 'Syne', sans-serif;
                    font-size: 40px;
                    font-weight: 800;
                    color: white;
                    letter-spacing: -0.03em;
                    line-height: 1;
                }

                /* Table Card */
                .admin-table-card {
                    background: rgba(15,23,42,0.7);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 24px;
                    overflow: hidden;
                    backdrop-filter: blur(10px);
                    animation: fadeSlideUp 0.4s ease 0.2s both;
                }

                .admin-table-header {
                    padding: 24px 28px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .admin-table-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 17px;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 4px;
                }

                .admin-table-subtitle { font-size: 13px; color: #475569; }

                .pending-count {
                    background: rgba(251,191,36,0.1);
                    border: 1px solid rgba(251,191,36,0.2);
                    border-radius: 100px;
                    padding: 5px 14px;
                    font-size: 12px;
                    font-weight: 700;
                    color: #fbbf24;
                    font-family: 'Syne', sans-serif;
                }

                table { width: 100%; border-collapse: collapse; }

                thead tr { background: rgba(255,255,255,0.02); }

                thead th {
                    padding: 14px 24px;
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    color: #334155;
                    text-align: left;
                }

                thead th.center { text-align: center; }

                tbody tr {
                    border-top: 1px solid rgba(255,255,255,0.04);
                    transition: background 0.2s;
                }

                tbody tr:hover { background: rgba(99,102,241,0.04); }

                tbody td { padding: 18px 24px; font-size: 14px; }
                tbody td.center { text-align: center; }

                .borrower-name {
                    font-weight: 600;
                    color: white;
                    margin-bottom: 3px;
                    font-size: 14px;
                }

                .borrower-email { font-size: 12px; color: #475569; }

                .loan-amount {
                    font-family: 'Syne', sans-serif;
                    font-weight: 600;
                    color: white;
                    font-size: 14px;
                }

                .score-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    padding: 5px 12px;
                    border-radius: 100px;
                    font-size: 12px;
                    font-weight: 700;
                    font-family: 'Syne', sans-serif;
                }

                .score-badge.high {
                    background: rgba(52,211,153,0.1);
                    border: 1px solid rgba(52,211,153,0.2);
                    color: #34d399;
                }

                .score-badge.low {
                    background: rgba(248,113,113,0.1);
                    border: 1px solid rgba(248,113,113,0.2);
                    color: #f87171;
                }

                .action-btns { display: flex; justify-content: center; gap: 8px; }

                .btn-approve {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    padding: 7px 14px;
                    background: rgba(52,211,153,0.1);
                    border: 1px solid rgba(52,211,153,0.25);
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 700;
                    color: #34d399;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: 'Syne', sans-serif;
                }

                .btn-approve:hover:not(:disabled) {
                    background: rgba(52,211,153,0.18);
                    border-color: rgba(52,211,153,0.4);
                    transform: translateY(-1px);
                }

                .btn-reject {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    padding: 7px 14px;
                    background: rgba(248,113,113,0.08);
                    border: 1px solid rgba(248,113,113,0.2);
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 700;
                    color: #f87171;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: 'Syne', sans-serif;
                }

                .btn-reject:hover:not(:disabled) {
                    background: rgba(248,113,113,0.15);
                    border-color: rgba(248,113,113,0.4);
                    transform: translateY(-1px);
                }

                .btn-approve:disabled,
                .btn-reject:disabled { opacity: 0.4; cursor: not-allowed; }

                .empty-state {
                    padding: 80px 24px;
                    text-align: center;
                }

                .empty-icon { color: #1e293b; margin: 0 auto 16px; display: block; }
                .empty-text {
                    font-size: 13px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #334155;
                }

                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 768px) {
                    .admin-stats-grid { grid-template-columns: 1fr; }
                    .admin-header { flex-direction: column; gap: 12px; }
                }
            `}</style>

            <div className="admin-root">
                <div className="admin-bg-orb admin-bg-orb-1" />
                <div className="admin-bg-orb admin-bg-orb-2" />
                <div className="admin-grid-pattern" />

                <div className="admin-content">
                    {/* Header */}
                    <div className="admin-header">
                        <div>
                            <div className="admin-title sf-display">
                                Admin <span>Dashboard.</span>
                            </div>
                            <div className="admin-subtitle">
                                Manajemen & verifikasi pengajuan pinjaman mikro
                                SDGs
                            </div>
                        </div>
                        <div className="admin-badge">
                            <div className="admin-badge-dot" />
                            Panel Admin
                        </div>
                    </div>

                    {/* Stat Cards */}
                    <div className="admin-stats-grid">
                        <div className="admin-stat-card yellow">
                            <div className="stat-icon-row">
                                <div
                                    className="stat-icon-box"
                                    style={{
                                        background: "rgba(251,191,36,0.1)",
                                    }}
                                >
                                    <Clock size={20} color="#fbbf24" />
                                </div>
                                <AlertTriangle
                                    size={14}
                                    color="#fbbf24"
                                    style={{ opacity: 0.5 }}
                                />
                            </div>
                            <div className="stat-card-label">
                                Menunggu Verifikasi
                            </div>
                            <div className="stat-card-value">
                                {stats?.total_pending || 0}
                            </div>
                        </div>

                        <div className="admin-stat-card green">
                            <div className="stat-icon-row">
                                <div
                                    className="stat-icon-box"
                                    style={{
                                        background: "rgba(52,211,153,0.1)",
                                    }}
                                >
                                    <ShieldCheck size={20} color="#34d399" />
                                </div>
                            </div>
                            <div className="stat-card-label">
                                Pinjaman Aktif
                            </div>
                            <div className="stat-card-value">
                                {stats?.total_aktif || 0}
                            </div>
                        </div>

                        <div className="admin-stat-card blue">
                            <div className="stat-icon-row">
                                <div
                                    className="stat-icon-box"
                                    style={{
                                        background: "rgba(59,130,246,0.1)",
                                    }}
                                >
                                    <TrendingUp size={20} color="#60a5fa" />
                                </div>
                            </div>
                            <div className="stat-card-label">
                                Total Dampak SDG 8
                            </div>
                            <div
                                className="stat-card-value"
                                style={{ fontSize: "20px" }}
                            >
                                Rp{" "}
                                {stats?.total_sdg_impact?.toLocaleString(
                                    "id-ID",
                                ) || 0}
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="admin-table-card">
                        <div className="admin-table-header">
                            <div>
                                <div className="admin-table-title sf-display">
                                    Pengajuan Pinjaman Mikro
                                </div>
                                <div className="admin-table-subtitle">
                                    Daftar pengajuan dengan status pending yang
                                    membutuhkan verifikasi
                                </div>
                            </div>
                            <div className="pending-count">
                                {pendingLoans?.length || 0} Pending
                            </div>
                        </div>

                        <div style={{ overflowX: "auto" }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Peminjam</th>
                                        <th>Jumlah Pinjaman</th>
                                        <th className="center">Skor AI</th>
                                        <th className="center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingLoans && pendingLoans.length > 0 ? (
                                        pendingLoans.map((loan) => (
                                            <tr key={loan.id}>
                                                <td>
                                                    <div className="borrower-name">
                                                        {loan.user?.name ||
                                                            "Unknown"}
                                                    </div>
                                                    <div className="borrower-email">
                                                        {loan.user?.email}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="loan-amount">
                                                        Rp{" "}
                                                        {loan.amount?.toLocaleString(
                                                            "id-ID",
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="center">
                                                    <span
                                                        className={`score-badge ${loan.skor_kredit >= 70 ? "high" : "low"}`}
                                                    >
                                                        {loan.skor_kredit >=
                                                        70 ? (
                                                            <CheckCircle
                                                                size={12}
                                                            />
                                                        ) : (
                                                            <XCircle
                                                                size={12}
                                                            />
                                                        )}
                                                        {loan.skor_kredit ||
                                                            "N/A"}
                                                    </span>
                                                </td>
                                                <td className="center">
                                                    <div className="action-btns">
                                                        <button
                                                            onClick={() =>
                                                                handleVerify(
                                                                    loan.id,
                                                                    "approve",
                                                                )
                                                            }
                                                            disabled={
                                                                processing
                                                            }
                                                            className="btn-approve"
                                                        >
                                                            <CheckCircle
                                                                size={13}
                                                            />
                                                            Setujui
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleVerify(
                                                                    loan.id,
                                                                    "reject",
                                                                )
                                                            }
                                                            disabled={
                                                                processing
                                                            }
                                                            className="btn-reject"
                                                        >
                                                            <XCircle
                                                                size={13}
                                                            />
                                                            Tolak
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4}>
                                                <div className="empty-state">
                                                    <ShieldCheck
                                                        size={40}
                                                        className="empty-icon"
                                                    />
                                                    <div className="empty-text">
                                                        Tidak ada pengajuan yang
                                                        menunggu verifikasi
                                                    </div>
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
