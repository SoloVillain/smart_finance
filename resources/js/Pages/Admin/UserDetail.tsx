import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import {
    Wallet,
    CheckCircle,
    XCircle,
    Pencil,
    Trash2,
    X,
    Save,
    ExternalLink,
    ArrowLeft,
} from "lucide-react";
import { useState } from "react";

type Loan = {
    id: number;
    program_name: string;
    sdg_type: string;
    amount: number;
    tenor: number;
    bunga: number;
    skor_kredit: number;
    status: string;
    payment_status: string;
    ktp_path: string | null;
    created_at: string;
};

type UserType = {
    id: number;
    name: string;
    email: string;
    nik?: string;
    role?: string;
    created_at: string;
};

type Stats = {
    total_pinjaman: number;
    total_amount: number;
    aktif: number;
    pending: number;
};

type UserDetailProps = {
    user: UserType;
    loans: Loan[];
    stats: Stats;
};

export default function UserDetail({ user, loans, stats }: UserDetailProps) {
    const [editingLoan, setEditingLoan] = useState<Loan | null>(null);
    const [ktpModal, setKtpModal] = useState<string | null>(null);
    const { data, setData, put, processing } = useForm({
        amount: "",
        tenor: "",
        status: "",
    });

    const openEdit = (loan: Loan) => {
        setEditingLoan(loan);
        setData({
            amount: String(loan.amount),
            tenor: String(loan.tenor),
            status: loan.status,
        });
    };
    const closeEdit = () => setEditingLoan(null);

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("admin.loans.update", editingLoan!.id), {
            onSuccess: closeEdit,
        });
    };

    const handleDelete = (loanId: number) => {
        if (confirm("Yakin ingin menghapus pinjaman ini?")) {
            router.delete(route("admin.loans.delete", loanId), {
                preserveScroll: true,
            });
        }
    };

    const statusColor = (s: string) => {
        if (s === "aktif")
            return {
                bg: "rgba(74,222,128,0.08)",
                border: "rgba(74,222,128,0.22)",
                text: "#4ade80",
            };
        if (s === "pending")
            return {
                bg: "rgba(240,180,41,0.08)",
                border: "rgba(240,180,41,0.22)",
                text: "#f0b429",
            };
        return {
            bg: "rgba(248,113,113,0.08)",
            border: "rgba(248,113,113,0.22)",
            text: "#f87171",
        };
    };

    const payBadge = (ps: string) =>
        ps === "lunas"
            ? {
                  bg: "rgba(74,222,128,0.08)",
                  border: "rgba(74,222,128,0.22)",
                  text: "#4ade80",
                  label: "✓ Lunas",
              }
            : {
                  bg: "rgba(240,180,41,0.08)",
                  border: "rgba(240,180,41,0.22)",
                  text: "#f0b429",
                  label: "⏳ Belum Lunas",
              };

    return (
        <AuthenticatedLayout>
            <Head title={`Detail User — ${user.name}`} />
            <style>{`
                main { padding-top: 0 !important; }

                .ud-root {
                    font-family: 'DM Sans', sans-serif;
                    background: linear-gradient(165deg, #050a14 0%, #0a111f 48%, #0f1b2e 100%);
                    min-height: calc(100vh - 62px);
                    padding: 94px 40px 64px;
                    position: relative; overflow-x: hidden;
                    color: #c9d6e3; -webkit-font-smoothing: antialiased;
                }

                .ud-root::before {
                    content: ''; position: fixed; inset: 0;
                    background: radial-gradient(ellipse 70% 45% at 50% 0%, rgba(77,159,255,0.07) 0%, transparent 55%);
                    pointer-events: none; z-index: 0;
                }

                .ud-content { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; }

                /* ── BACK ── */
                .ud-back {
                    display: inline-flex; align-items: center; gap: 7px;
                    padding: 8px 16px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.09);
                    border-radius: 9px;
                    font-size: 13px; font-weight: 600;
                    color: #ffffff; text-decoration: none;
                    transition: all 0.18s; margin-bottom: 24px;
                    font-family: 'DM Sans', sans-serif;
                    animation: udUp 0.4s ease both;
                }
                .ud-back:hover { color: #f0f6fc; border-color: rgba(240,180,41,0.25); background: rgba(240,180,41,0.06); }

                /* ── PROFILE HERO ── */
                .ud-hero {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.09);
                    border-radius: 16px; padding: 24px 28px;
                    display: flex; align-items: center; gap: 18px;
                    margin-bottom: 16px; position: relative; overflow: hidden;
                    animation: udUp 0.4s ease 0.04s both;
                }
                .ud-hero::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
                    background: linear-gradient(90deg, #f0b429, #38bdf8);
                    border-radius: 16px 16px 0 0;
                }

                .ud-avatar {
                    width: 60px; height: 60px; border-radius: 50%;
                    background: #f0b429;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800;
                    color: #050a14; flex-shrink: 0;
                    box-shadow: 0 0 18px rgba(240,180,41,0.22);
                }

                .ud-hero-name {
                    font-family: 'Syne', sans-serif;
                    font-size: 20px; font-weight: 800;
                    color: #f0b429; margin-bottom: 3px; letter-spacing: -0.02em;
                }
                .ud-hero-email { font-size: 13.5px; font-weight: 400; color: #ffffff; margin-bottom: 2px; }
                .ud-hero-nik   { font-size: 12px; font-weight: 500; color: #ffffff; margin-bottom: 4px; }
                .ud-hero-join  { font-size: 12px; font-weight: 400; color: #ffffff; margin-bottom: 6px; }

                .ud-role-pill {
                    display: inline-flex; padding: 3px 11px; border-radius: 100px;
                    font-size: 11px; font-weight: 700;
                    font-family: 'Syne', sans-serif;
                }

                /* ── STAT CARDS ── */
                .ud-stats {
                    display: grid; grid-template-columns: repeat(4, 1fr);
                    gap: 14px; margin-bottom: 20px;
                    animation: udUp 0.4s ease 0.08s both;
                }

                .ud-stat {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 13px; padding: 18px 20px;
                    transition: border-color 0.2s;
                }
                .ud-stat:hover { border-color: rgba(255,255,255,0.12); }

                .ud-stat-lbl {
                    font-size: 10.5px; font-weight: 700;
                    text-transform: uppercase; letter-spacing: 0.12em;
                    color: #ffffff; margin-bottom: 6px;
                }

                .ud-stat-val {
                    font-family: 'Syne', sans-serif;
                    font-size: 24px; font-weight: 800;
                    color: #ffffff; letter-spacing: -0.025em; line-height: 1;
                }
                .ud-stat-val.sm { font-size: 15px; }

                /* ── LOANS TABLE ── */
                .ud-loans-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 16px; overflow: hidden;
                    animation: udUp 0.4s ease 0.14s both;
                }

                .ud-loans-head {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 18px 22px;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                }

                .ud-loans-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 15.5px; font-weight: 700;
                    color: #f0f6fc; letter-spacing: -0.01em; margin-bottom: 3px;
                }
                .ud-loans-count { font-size: 12.5px; font-weight: 400; color: #7d8fa8; }

                .ud-count-pill {
                    padding: 4px 12px;
                    background: rgba(56,189,248,0.08);
                    border: 1px solid rgba(56,189,248,0.2);
                    border-radius: 100px;
                    font-size: 12px; font-weight: 700;
                    color: #38bdf8; font-family: 'Syne', sans-serif;
                    white-space: nowrap;
                }

                .ud-table-wrap { overflow-x: auto; }

                table { width: 100%; border-collapse: collapse; }
                thead tr { background: rgba(255,255,255,0.02); }
                thead th {
                    padding: 11px 14px;
                    font-size: 10px; font-weight: 700;
                    text-transform: uppercase; letter-spacing: 0.14em;
                    color: #ffffff; text-align: left; white-space: nowrap;
                }
                tbody tr {
                    border-top: 1px solid rgba(255,255,255,0.04);
                    transition: background 0.18s;
                }
                tbody tr:hover { background: rgba(240,180,41,0.03); }
                tbody td { padding: 13px 14px; font-size: 13px; color: #94a3b8; vertical-align: middle; }

                .td-date   { font-size: 11.5px; color: #ffffff; white-space: nowrap; }
                .td-prog   { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: #f0f6fc; }
                .td-sdg    { display: inline-flex; padding: 3px 10px; background: rgba(56,189,248,0.08); border: 1px solid rgba(56,189,248,0.18); border-radius: 100px; font-size: 10px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.06em; }
                .td-amount { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: #f0f6fc; }
                .td-tenor  { font-size: 12.5px; color: #ffffff; white-space: nowrap; }

                .td-score  { display: inline-flex; align-items: center; gap: 4px; font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; }

                .td-status { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 100px; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; font-family: 'Syne', sans-serif; border: 1px solid; white-space: nowrap; }

                .td-ktp-img { width: 52px; height: 35px; object-fit: cover; border-radius: 5px; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; display: block; transition: all 0.2s; }
                .td-ktp-img:hover { border-color: rgba(240,180,41,0.4); transform: scale(1.06); }
                .td-ktp-link { display: flex; align-items: center; gap: 3px; padding: 3px 7px; background: rgba(240,180,41,0.08); border: 1px solid rgba(240,180,41,0.2); border-radius: 5px; font-size: 10px; font-weight: 600; color: #f0b429; text-decoration: none; margin-top: 4px; transition: all 0.18s; font-family: 'Syne', sans-serif; white-space: nowrap; }
                .td-ktp-link:hover { background: rgba(240,180,41,0.14); }
                .td-ktp-none { font-size: 11px; color: #334155; font-style: italic; }

                .ud-btn-edit {
                    display: inline-flex; align-items: center; gap: 4px;
                    padding: 5px 10px;
                    background: rgba(56,189,248,0.07); border: 1px solid rgba(56,189,248,0.18);
                    border-radius: 7px; font-size: 11px; font-weight: 600;
                    color: #38bdf8; cursor: pointer; transition: all 0.18s;
                    font-family: 'Syne', sans-serif;
                }
                .ud-btn-edit:hover { background: rgba(56,189,248,0.14); transform: translateY(-1px); }

                .ud-btn-del {
                    display: inline-flex; align-items: center; gap: 4px;
                    padding: 5px 10px;
                    background: rgba(248,113,113,0.07); border: 1px solid rgba(248,113,113,0.18);
                    border-radius: 7px; font-size: 11px; font-weight: 600;
                    color: #f87171; cursor: pointer; transition: all 0.18s;
                    font-family: 'Syne', sans-serif;
                }
                .ud-btn-del:hover { background: rgba(248,113,113,0.14); transform: translateY(-1px); }

                .ud-action-row { display: flex; gap: 6px; }

                /* Empty */
                .ud-empty { padding: 56px 24px; text-align: center; }
                .ud-empty-ico { color: #1e293b; margin: 0 auto 12px; display: block; }
                .ud-empty-txt { font-size: 12.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #334155; }

                /* ── KTP MODAL ── */
                .ktp-overlay {
                    position: fixed; inset: 0;
                    background: rgba(0,0,0,0.88); backdrop-filter: blur(14px);
                    z-index: 2000; display: flex; align-items: center; justify-content: center;
                    padding: 24px; animation: udUp 0.2s ease both;
                }
                .ktp-modal-img { max-width: 90vw; max-height: 82vh; border-radius: 14px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 40px 80px rgba(0,0,0,0.6); }
                .ktp-close-btn { position: absolute; top: 18px; right: 18px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.12); border-radius: 9px; padding: 8px; cursor: pointer; color: white; transition: all 0.18s; }
                .ktp-close-btn:hover { background: rgba(255,255,255,0.18); }

                /* ── EDIT MODAL ── */
                .edit-overlay {
                    position: fixed; inset: 0;
                    background: rgba(0,0,0,0.75); backdrop-filter: blur(10px);
                    z-index: 1000; display: flex; align-items: center; justify-content: center;
                    padding: 24px; animation: udUp 0.2s ease both;
                }

                .edit-card {
                    background: #0d1420;
                    border: 1px solid rgba(255,255,255,0.12);
                    border-radius: 18px; padding: 32px;
                    width: 100%; max-width: 460px;
                    box-shadow: 0 40px 80px rgba(0,0,0,0.6);
                }

                .edit-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; margin-bottom: 4px; }
                .edit-sub { font-size: 13px; font-weight: 400; color: #7d8fa8; margin-bottom: 24px; }

                .edit-field { margin-bottom: 15px; }
                .edit-label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 6px; }

                .edit-input {
                    width: 100%;
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 10px; padding: 11px 13px;
                    font-size: 14px; color: #f0f6fc;
                    font-family: 'DM Sans', sans-serif;
                    outline: none; transition: border-color 0.18s, box-shadow 0.18s;
                }
                .edit-input:focus { border-color: #f0b429; box-shadow: 0 0 0 3px rgba(240,180,41,0.12); }
                .edit-input::placeholder { color: #475569; }
                select.edit-input option { background: #0d1420; color: #f0f6fc; }

                .edit-actions { display: flex; gap: 10px; margin-top: 22px; }

                .edit-btn-save {
                    flex: 1; padding: 12px;
                    background: #f0b429; color: #050a14;
                    border: none; border-radius: 10px;
                    font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 800;
                    cursor: pointer; transition: all 0.2s;
                    display: flex; align-items: center; justify-content: center; gap: 6px;
                }
                .edit-btn-save:hover:not(:disabled) { background: #f5c842; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(240,180,41,0.28); }
                .edit-btn-save:disabled { opacity: 0.5; cursor: not-allowed; }

                .edit-btn-cancel {
                    padding: 12px 20px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.09);
                    border-radius: 10px;
                    font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 600;
                    color: #94a3b8; cursor: pointer; transition: all 0.18s;
                }
                .edit-btn-cancel:hover { color: #f0f6fc; border-color: rgba(255,255,255,0.18); }

                @keyframes udUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 900px) {
                    .ud-root { padding: 20px 16px 48px; }
                    .ud-stats { grid-template-columns: 1fr 1fr; }
                    .ud-hero { flex-direction: column; align-items: flex-start; gap: 14px; }
                }
            `}</style>

            <div className="ud-root">
                <div className="ud-content">
                    {/* Back */}
                    <Link href={route("admin.users.index")} className="ud-back">
                        <ArrowLeft size={14} /> Kembali ke Daftar User
                    </Link>

                    {/* ── HERO ── */}
                    <div className="ud-hero">
                        <div className="ud-avatar">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className="ud-hero-name">{user.name}</div>
                            <div className="ud-hero-email">{user.email}</div>
                            {user.nik && (
                                <div className="ud-hero-nik">
                                    NIK: {user.nik}
                                </div>
                            )}
                            <div className="ud-hero-join">
                                Bergabung sejak {user.created_at}
                            </div>
                            <span
                                className="ud-role-pill"
                                style={{
                                    background:
                                        user.role === "admin"
                                            ? "rgba(248,113,113,0.09)"
                                            : "rgba(74,222,128,0.09)",
                                    border: `1px solid ${user.role === "admin" ? "rgba(248,113,113,0.25)" : "rgba(74,222,128,0.25)"}`,
                                    color:
                                        user.role === "admin"
                                            ? "#f87171"
                                            : "#4ade80",
                                }}
                            >
                                {user.role === "admin" ? "👑 Admin" : "👤 User"}
                            </span>
                        </div>
                    </div>

                    {/* ── STATS ── */}
                    <div className="ud-stats">
                        <div className="ud-stat">
                            <div className="ud-stat-lbl">Total Pinjaman</div>
                            <div className="ud-stat-val">
                                {stats.total_pinjaman}
                            </div>
                        </div>
                        <div className="ud-stat">
                            <div className="ud-stat-lbl">Total Dana</div>
                            <div className="ud-stat-val sm">
                                Rp{" "}
                                {Number(stats.total_amount).toLocaleString(
                                    "id-ID",
                                )}
                            </div>
                        </div>
                        <div className="ud-stat">
                            <div className="ud-stat-lbl">Pinjaman Aktif</div>
                            <div
                                className="ud-stat-val"
                                style={{ color: "#4ade80" }}
                            >
                                {stats.aktif}
                            </div>
                        </div>
                        <div className="ud-stat">
                            <div className="ud-stat-lbl">Menunggu</div>
                            <div
                                className="ud-stat-val"
                                style={{ color: "#f0b429" }}
                            >
                                {stats.pending}
                            </div>
                        </div>
                    </div>

                    {/* ── TABLE ── */}
                    <div className="ud-loans-card">
                        <div className="ud-loans-head">
                            <div>
                                <div className="ud-loans-title">
                                    Riwayat Pinjaman
                                </div>
                                <div className="ud-loans-count">
                                    Total {loans.length} pinjaman
                                </div>
                            </div>
                            <div className="ud-count-pill">
                                {loans.length} Data
                            </div>
                        </div>

                        <div className="ud-table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Program</th>
                                        <th>Kategori</th>
                                        <th>Jumlah</th>
                                        <th>Tenor</th>
                                        <th>Skor AI</th>
                                        <th>Status</th>
                                        <th>Status Bayar</th>
                                        <th>Dok. KTP</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loans.length > 0 ? (
                                        loans.map((loan) => {
                                            const sc = statusColor(loan.status);
                                            const pb = payBadge(
                                                loan.payment_status,
                                            );
                                            return (
                                                <tr key={loan.id}>
                                                    <td>
                                                        <span className="td-date">
                                                            {loan.created_at}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="td-prog">
                                                            {loan.program_name}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="td-sdg">
                                                            {loan.sdg_type}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="td-amount">
                                                            Rp{" "}
                                                            {Number(
                                                                loan.amount,
                                                            ).toLocaleString(
                                                                "id-ID",
                                                            )}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="td-tenor">
                                                            {loan.tenor} bln
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span
                                                            className="td-score"
                                                            style={{
                                                                color:
                                                                    loan.skor_kredit >=
                                                                    70
                                                                        ? "#4ade80"
                                                                        : "#f87171",
                                                            }}
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
                                                    <td>
                                                        <span
                                                            className="td-status"
                                                            style={{
                                                                background:
                                                                    sc.bg,
                                                                borderColor:
                                                                    sc.border,
                                                                color: sc.text,
                                                            }}
                                                        >
                                                            {loan.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span
                                                            className="td-status"
                                                            style={{
                                                                background:
                                                                    pb.bg,
                                                                borderColor:
                                                                    pb.border,
                                                                color: pb.text,
                                                            }}
                                                        >
                                                            {pb.label}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {loan.ktp_path ? (
                                                            <div>
                                                                <img
                                                                    src={
                                                                        loan.ktp_path
                                                                    }
                                                                    className="td-ktp-img"
                                                                    alt="KTP"
                                                                    onClick={() =>
                                                                        setKtpModal(
                                                                            loan.ktp_path,
                                                                        )
                                                                    }
                                                                />
                                                                <a
                                                                    href={
                                                                        loan.ktp_path
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="td-ktp-link"
                                                                >
                                                                    <ExternalLink
                                                                        size={9}
                                                                    />{" "}
                                                                    Lihat
                                                                </a>
                                                            </div>
                                                        ) : (
                                                            <span className="td-ktp-none">
                                                                Tidak ada
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="ud-action-row">
                                                            <button
                                                                className="ud-btn-edit"
                                                                onClick={() =>
                                                                    openEdit(
                                                                        loan,
                                                                    )
                                                                }
                                                            >
                                                                <Pencil
                                                                    size={11}
                                                                />{" "}
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="ud-btn-del"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        loan.id,
                                                                    )
                                                                }
                                                            >
                                                                <Trash2
                                                                    size={11}
                                                                />{" "}
                                                                Hapus
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={10}>
                                                <div className="ud-empty">
                                                    <Wallet
                                                        size={34}
                                                        className="ud-empty-ico"
                                                    />
                                                    <div className="ud-empty-txt">
                                                        Belum ada pinjaman
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

            {/* ── KTP MODAL ── */}
            {ktpModal && (
                <div className="ktp-overlay" onClick={() => setKtpModal(null)}>
                    <button
                        className="ktp-close-btn"
                        onClick={() => setKtpModal(null)}
                    >
                        <X size={18} />
                    </button>
                    <img
                        src={ktpModal}
                        className="ktp-modal-img"
                        alt="KTP Full"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* ── EDIT MODAL ── */}
            {editingLoan && (
                <div className="edit-overlay" onClick={closeEdit}>
                    <div
                        className="edit-card"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="edit-title">Edit Pinjaman</div>
                        <div className="edit-sub">
                            ID #{editingLoan.id} · {editingLoan.created_at}
                        </div>

                        <form onSubmit={submitEdit}>
                            <div className="edit-field">
                                <label className="edit-label">
                                    Jumlah Pinjaman (Rp)
                                </label>
                                <input
                                    type="text"
                                    className="edit-input"
                                    value={
                                        data.amount
                                            ? `Rp ${Number(data.amount).toLocaleString("id-ID")}`
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "amount",
                                            e.target.value.replace(
                                                /[^\d]/g,
                                                "",
                                            ),
                                        )
                                    }
                                />
                            </div>
                            <div className="edit-field">
                                <label className="edit-label">
                                    Tenor (Bulan)
                                </label>
                                <input
                                    type="number"
                                    className="edit-input"
                                    value={data.tenor}
                                    onChange={(e) =>
                                        setData("tenor", e.target.value)
                                    }
                                    placeholder="12"
                                />
                            </div>
                            <div className="edit-field">
                                <label className="edit-label">Status</label>
                                <select
                                    className="edit-input"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option value="pending">Pending</option>
                                    <option value="aktif">Aktif</option>
                                    <option value="ditolak">Ditolak</option>
                                </select>
                            </div>
                            <div className="edit-actions">
                                <button
                                    type="button"
                                    className="edit-btn-cancel"
                                    onClick={closeEdit}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="edit-btn-save"
                                    disabled={processing}
                                >
                                    <Save size={13} />
                                    {processing
                                        ? "Menyimpan..."
                                        : "Simpan Perubahan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
