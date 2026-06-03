import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import { Head, useForm } from "@inertiajs/react";
import {
    ShieldCheck, Clock, TrendingUp,
    CheckCircle, XCircle, AlertTriangle,
} from "lucide-react";

type User  = { name: string; email: string };
type Loan  = { id: number; amount: number; skor_kredit: number; user?: User };
type Stats = { total_pending?: number; total_aktif?: number; total_sdg_impact?: number };

type AdminDashboardProps = {
    auth: { user: { name: string; email: string } };
    pendingLoans: Loan[];
    stats: Stats;
};

export default function Dashboard({ auth, pendingLoans, stats }: AdminDashboardProps) {
    const { processing } = useForm({ action: "" });

    const handleVerify = (loanId: number, actionType: string) => {
        const msg = actionType === "approve" ? "menyetujui" : "menolak";
        if (confirm(`Apakah Anda yakin ingin ${msg} pinjaman ini?`)) {
            router.post(
                route("admin.loans.verify", { loan: loanId }),
                { action: actionType },
                {
                    preserveScroll: true,
                    onSuccess: () => alert("Berhasil memperbarui status!"),
                    onError: (e) => alert("Gagal: " + e.action),
                },
            );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard — Smart Finance" />
            <style>{`
                /* ── Reset padding dari AuthLayout ── */
                main { padding-top: 0 !important; }

                .ad-root {
                    font-family: 'DM Sans', sans-serif;
                    background: linear-gradient(165deg, #050a14 0%, #0a111f 48%, #0f1b2e 100%);
                    min-height: calc(100vh - 62px);
                    padding: 94px 24px 34px;
                    position: relative;
                    overflow-x: hidden;
                    color: #c9d6e3;
                    -webkit-font-smoothing: antialiased;
                }

                .ad-root::before {
                    content: '';
                    position: fixed; inset: 0;
                    background: radial-gradient(ellipse 70% 45% at 50% 0%, rgba(77,159,255,0.07) 0%, transparent 55%);
                    pointer-events: none; z-index: 0;
                }

                .ad-content {
                    position: relative; z-index: 1;
                    max-width: 1280px; margin: 0 auto;
                }

                /* ── HEADER ── */
                .ad-header {
                    display: flex; justify-content: space-between; align-items: flex-start;
                    margin-bottom: 28px;
                    animation: adUp 0.4s ease both;
                }

                .ad-title {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(24px, 3vw, 32px); font-weight: 800;
                    color: #ffffff; letter-spacing: -0.03em; line-height: 1.1;
                    margin-bottom: 5px;
                }
                .ad-title em { color: #f0b429; font-style: normal; }

                .ad-subtitle { font-size: 13.5px; font-weight: 400; color: #ffffff; }

                .ad-badge {
                    display: flex; align-items: center; gap: 7px;
                    padding: 7px 16px;
                    background: rgba(240,180,41,0.08);
                    border: 1px solid rgba(240,180,41,0.2);
                    border-radius: 100px;
                    font-size: 11px; font-weight: 700;
                    color: #f0b429;
                    text-transform: uppercase; letter-spacing: 0.08em;
                    font-family: 'Syne', sans-serif;
                    white-space: nowrap; flex-shrink: 0;
                }
                .ad-badge-dot {
                    width: 6px; height: 6px; border-radius: 50%;
                    background: #f0b429; box-shadow: 0 0 6px #f0b429;
                }

                /* ── STAT CARDS ── */
                .ad-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px; margin-bottom: 24px;
                    animation: adUp 0.4s ease 0.08s both;
                }

                .ad-stat {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px; padding: 22px 24px;
                    position: relative; overflow: hidden;
                    transition: border-color 0.2s, transform 0.2s;
                }

                .ad-stat::before {
                    content: '';
                    position: absolute; top: 0; left: 0; right: 0; height: 2px;
                    border-radius: 14px 14px 0 0;
                }

                .ad-stat.amber::before { background: #f0b429; }
                .ad-stat.green::before { background: #4ade80; }
                .ad-stat.blue::before  { background: #38bdf8; }

                .ad-stat:hover { border-color: rgba(255,255,255,0.13); transform: translateY(-2px); }

                .ad-stat-top {
                    display: flex; justify-content: space-between; align-items: flex-start;
                    margin-bottom: 16px;
                }

                .ad-stat-ico {
                    width: 38px; height: 38px; border-radius: 9px;
                    display: flex; align-items: center; justify-content: center;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                }

                .ad-stat-lbl {
                    font-size: 10.5px; font-weight: 700;
                    text-transform: uppercase; letter-spacing: 0.12em;
                    color: #ffffff; margin-bottom: 6px;
                }

                .ad-stat-val {
                    font-family: 'Syne', sans-serif;
                    font-size: 36px; font-weight: 800;
                    color: #ffffff; letter-spacing: -0.03em; line-height: 1;
                }

                .ad-stat-val.sm { font-size: 20px; }

                /* ── TABLE CARD ── */
                .ad-table-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 16px; overflow: hidden;
                    animation: adUp 0.4s ease 0.16s both;
                }

                .ad-table-head {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 20px 24px;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                }

                .ad-table-head-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 16px; font-weight: 700;
                    color: #f0f6fc; letter-spacing: -0.01em;
                    margin-bottom: 3px;
                }

                .ad-table-head-sub { font-size: 12.5px; font-weight: 400; color: #ffffff; }

                .ad-pending-pill {
                    padding: 5px 14px;
                    background: rgba(240,180,41,0.1);
                    border: 1px solid rgba(240,180,41,0.25);
                    border-radius: 100px;
                    font-size: 12px; font-weight: 700;
                    color: #f0b429;
                    font-family: 'Syne', sans-serif;
                    white-space: nowrap;
                }

                /* Table */
                .ad-table-wrap { overflow-x: auto; }

                table { width: 100%; border-collapse: collapse; }

                thead tr { background: rgba(255,255,255,0.02); }

                thead th {
                    padding: 13px 20px;
                    font-size: 10px; font-weight: 700;
                    text-transform: uppercase; letter-spacing: 0.14em;
                    color: #ffffff; text-align: left;
                }
                thead th.ctr { text-align: center; }

                tbody tr {
                    border-top: 1px solid rgba(255,255,255,0.04);
                    transition: background 0.18s;
                }
                tbody tr:hover { background: rgba(240,180,41,0.03); }

                tbody td { padding: 16px 20px; font-size: 13.5px; vertical-align: middle; }
                tbody td.ctr { text-align: center; }

                .ad-borrower-name {
                    font-family: 'Syne', sans-serif;
                    font-size: 14px; font-weight: 700;
                    color: #f0b429; margin-bottom: 3px;
                }
                .ad-borrower-email { font-size: 12px; font-weight: 400; color: #ffffff; }

                .ad-amount {
                    font-family: 'Syne', sans-serif;
                    font-size: 14px; font-weight: 700;
                    color: #f0f6fc;
                }

                .ad-score {
                    display: inline-flex; align-items: center; gap: 5px;
                    padding: 4px 12px; border-radius: 100px;
                    font-size: 12px; font-weight: 700;
                    font-family: 'Syne', sans-serif;
                }
                .ad-score.good {
                    background: rgba(74,222,128,0.08);
                    border: 1px solid rgba(74,222,128,0.2);
                    color: #4ade80;
                }
                .ad-score.bad {
                    background: rgba(248,113,113,0.08);
                    border: 1px solid rgba(248,113,113,0.2);
                    color: #f87171;
                }

                .ad-actions { display: flex; justify-content: center; gap: 8px; }

                .ad-btn-approve {
                    display: inline-flex; align-items: center; gap: 5px;
                    padding: 7px 14px;
                    background: rgba(74,222,128,0.08);
                    border: 1px solid rgba(74,222,128,0.2);
                    border-radius: 8px;
                    font-size: 12px; font-weight: 700;
                    color: #4ade80; cursor: pointer;
                    transition: all 0.18s;
                    font-family: 'Syne', sans-serif;
                }
                .ad-btn-approve:hover:not(:disabled) {
                    background: rgba(74,222,128,0.15);
                    border-color: rgba(74,222,128,0.35);
                    transform: translateY(-1px);
                }

                .ad-btn-reject {
                    display: inline-flex; align-items: center; gap: 5px;
                    padding: 7px 14px;
                    background: rgba(248,113,113,0.07);
                    border: 1px solid rgba(248,113,113,0.18);
                    border-radius: 8px;
                    font-size: 12px; font-weight: 700;
                    color: #f87171; cursor: pointer;
                    transition: all 0.18s;
                    font-family: 'Syne', sans-serif;
                }
                .ad-btn-reject:hover:not(:disabled) {
                    background: rgba(248,113,113,0.14);
                    border-color: rgba(248,113,113,0.35);
                    transform: translateY(-1px);
                }

                .ad-btn-approve:disabled,
                .ad-btn-reject:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

                /* Empty state */
                .ad-empty {
                    padding: 64px 24px; text-align: center;
                }
                .ad-empty-ico { color: #1e293b; margin: 0 auto 14px; display: block; }
                .ad-empty-txt {
                    font-size: 12.5px; font-weight: 600;
                    text-transform: uppercase; letter-spacing: 0.1em;
                    color: #334155;
                }

                @keyframes adUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 900px) {
                    .ad-root { padding: 20px 16px 48px; }
                    .ad-stats { grid-template-columns: 1fr; }
                    .ad-header { flex-direction: column; gap: 12px; }
                }
            `}</style>

            <div className="ad-root">
                <div className="ad-content">

                    {/* ── HEADER ── */}
                    <div className="ad-header">
                        <div>
                            <div className="ad-title">
                                Admin <em>Dashboard.</em>
                            </div>
                            <div className="ad-subtitle">
                                Manajemen &amp; verifikasi pengajuan pinjaman mikro SDGs
                            </div>
                        </div>
                        <div className="ad-badge">
                            <div className="ad-badge-dot" />
                            Panel Admin
                        </div>
                    </div>

                    {/* ── STAT CARDS ── */}
                    <div className="ad-stats">
                        <div className="ad-stat amber">
                            <div className="ad-stat-top">
                                <div className="ad-stat-ico">
                                    <Clock size={17} color="#f0b429" />
                                </div>
                                <AlertTriangle size={13} color="#f0b429" style={{ opacity: 0.45 }} />
                            </div>
                            <div className="ad-stat-lbl">Menunggu Verifikasi</div>
                            <div className="ad-stat-val">{stats?.total_pending || 0}</div>
                        </div>

                        <div className="ad-stat green">
                            <div className="ad-stat-top">
                                <div className="ad-stat-ico">
                                    <ShieldCheck size={17} color="#4ade80" />
                                </div>
                            </div>
                            <div className="ad-stat-lbl">Pinjaman Aktif</div>
                            <div className="ad-stat-val">{stats?.total_aktif || 0}</div>
                        </div>

                        <div className="ad-stat blue">
                            <div className="ad-stat-top">
                                <div className="ad-stat-ico">
                                    <TrendingUp size={17} color="#38bdf8" />
                                </div>
                            </div>
                            <div className="ad-stat-lbl">Total Dampak SDG 8</div>
                            <div className="ad-stat-val sm">
                                Rp {stats?.total_sdg_impact?.toLocaleString("id-ID") || 0}
                            </div>
                        </div>
                    </div>

                    {/* ── TABLE ── */}
                    <div className="ad-table-card">
                        <div className="ad-table-head">
                            <div>
                                <div className="ad-table-head-title">Pengajuan Pinjaman Mikro</div>
                                <div className="ad-table-head-sub">
                                    Daftar pengajuan dengan status pending yang membutuhkan verifikasi
                                </div>
                            </div>
                            <div className="ad-pending-pill">
                                {pendingLoans?.length || 0} Pending
                            </div>
                        </div>

                        <div className="ad-table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Peminjam</th>
                                        <th>Jumlah Pinjaman</th>
                                        <th className="ctr">Skor AI</th>
                                        <th className="ctr">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingLoans && pendingLoans.length > 0 ? (
                                        pendingLoans.map(loan => (
                                            <tr key={loan.id}>
                                                <td>
                                                    <div className="ad-borrower-name">{loan.user?.name || "Unknown"}</div>
                                                    <div className="ad-borrower-email">{loan.user?.email}</div>
                                                </td>
                                                <td>
                                                    <div className="ad-amount">
                                                        Rp {loan.amount?.toLocaleString("id-ID")}
                                                    </div>
                                                </td>
                                                <td className="ctr">
                                                    <span className={`ad-score ${loan.skor_kredit >= 70 ? "good" : "bad"}`}>
                                                        {loan.skor_kredit >= 70
                                                            ? <CheckCircle size={11} />
                                                            : <XCircle size={11} />
                                                        }
                                                        {loan.skor_kredit || "N/A"}
                                                    </span>
                                                </td>
                                                <td className="ctr">
                                                    <div className="ad-actions">
                                                        <button
                                                            className="ad-btn-approve"
                                                            disabled={processing}
                                                            onClick={() => handleVerify(loan.id, "approve")}
                                                        >
                                                            <CheckCircle size={12} /> Setujui
                                                        </button>
                                                        <button
                                                            className="ad-btn-reject"
                                                            disabled={processing}
                                                            onClick={() => handleVerify(loan.id, "reject")}
                                                        >
                                                            <XCircle size={12} /> Tolak
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4}>
                                                <div className="ad-empty">
                                                    <ShieldCheck size={36} className="ad-empty-ico" />
                                                    <div className="ad-empty-txt">
                                                        Tidak ada pengajuan yang menunggu verifikasi
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
