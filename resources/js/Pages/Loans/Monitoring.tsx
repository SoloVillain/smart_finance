import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import {
    History,
    PieChart,
    QrCode,
    CheckCircle,
    X,
    Loader,
    ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";

type LoanItem = {
    id: number;
    program_name: string;
    sdg_type: string;
    amount: number;
    tenor: number;
    status: string;
    payment_status: string; 
    skor_kredit: number;
    ktp_path: string | null;
    created_at: string;
};

type MonitoringProps = {
    loans: LoanItem[];
};

export default function Monitoring({ loans }: MonitoringProps) {
    const [loanRows, setLoanRows] = useState<LoanItem[]>(loans);
    const [payingItem, setPayingItem] = useState<LoanItem | null>(null);
    const [verifying, setVerifying] = useState(false);
    const [paid, setPaid] = useState(false);
    const [ktpModal, setKtpModal] = useState<string | null>(null);

    useEffect(() => {
        setLoanRows(loans);
    }, [loans]);

    const canPay = (item: LoanItem) =>
        item.status === "aktif" && item.payment_status !== "lunas";

    const openPayment = (item: LoanItem) => {
        if (!canPay(item)) return;
        setPayingItem(item);
        setPaid(false);
        setVerifying(false);
    };

    const closePayment = () => {
        setPayingItem(null);
        setPaid(false);
        setVerifying(false);
    };

    const handleVerify = () => {
        if (!payingItem) return;
        if (!canPay(payingItem)) return;

        setVerifying(true);

        router.post(
            route("loans.pay", payingItem.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setLoanRows((prev) =>
                        prev.map((l) =>
                            l.id === payingItem.id
                                ? { ...l, payment_status: "lunas" }
                                : l,
                        ),
                    );
                    setPaid(true);
                },
                onFinish: () => setVerifying(false),
            },
        );
    };

    const statusColor = (s: string) => {
        if (s === "aktif") return "#34d399";
        if (s === "pending") return "#fbbf24";
        return "#f87171";
    };

    const paymentColor = (s: string) => {
        if (s === "lunas") return "#34d399";
        return "#fbbf24";
    };

    const paymentLabel = (s: string) => {
        if (s === "lunas") return "Lunas";
        return "Belum lunas";
    };

    const payButtonLabel = (item: LoanItem) => {
        if (item.payment_status === "lunas") return "Lunas";
        if (item.status !== "aktif") return "Menunggu";
        return "Bayar";
    };

    return (
        <AuthenticatedLayout>
            <Head title="Monitoring SDGs - Smart Finance" />
            <style>{`
                /* Wrapper luar dipaksa menjadi scrollable kontainer */
                .scroll-wrapper {
                    width: 100%;
                    height: calc(100vh - 65px); /* Menyesuaikan sisa tinggi navbar */
                    overflow-y: auto !important; /* Memaksa scrollbar aktif jika data penuh */
                    overflow-x: hidden;
                    background: #020617;
                }

                .mon-root {
                    font-family: 'DM Sans', sans-serif;
                    min-height: 100%;
                    padding: 32px 24px 60px; /* Jarak atas dirapatkan dari 88px ke 32px */
                    position: relative;
                }

                .sf-display { font-family: 'Syne', sans-serif; }

                /* DIUBAH: Menggunakan absolute agar background melar mengikuti panjang data saat di-scroll */
                .mon-bg-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(100px);
                    pointer-events: none;
                    z-index: 0;
                    animation: orbFloat 12s ease-in-out infinite;
                }
                .mon-bg-orb-1 { width: 600px; height: 600px; background: rgba(59,130,246,0.07); top: -100px; left: -100px; }
                .mon-bg-orb-2 { width: 400px; height: 400px; background: rgba(99,102,241,0.06); bottom: 10%; right: -100px; animation-delay: -6s; }

                @keyframes orbFloat {
                    0%, 100% { transform: translate(0,0); }
                    50% { transform: translate(30px,-30px); }
                }

                /* DIUBAH: Menjadi absolute agar grid background menutupi seluruh baris data */
                .mon-grid {
                    position: absolute;
                    inset: 0;
                    background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
                    background-size: 60px 60px;
                    pointer-events: none;
                    z-index: 0;
                }

                .mon-content {
                    position: relative;
                    z-index: 10;
                    max-width: 1280px;
                    margin: 0 auto;
                }

                .page-header { margin-bottom: 24px; animation: fadeUp 0.4s ease both; }

                .page-title {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(24px, 3vw, 36px);
                    font-weight: 800;
                    color: white;
                    margin-bottom: 6px;
                }

                .page-title span {
                    background: linear-gradient(135deg, #f0b429, #f7d070);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                /* DIUBAH: Kontras subtitle atas dinaikkan */
                .page-sub { font-size: 14px; color: #94a3b8; }

                .table-card {
                    background: rgba(15,23,42,0.7);
                    border: 1px solid rgba(255,255,255,0.12); /* Border dibuat lebih tegas */
                    border-radius: 24px;
                    overflow: hidden;
                    backdrop-filter: blur(10px);
                    animation: fadeUp 0.4s ease 0.1s both;
                }

                .table-header {
                    padding: 20px 24px; /* Jarak dalam header dirapatkan sedikit */
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .table-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 17px;
                    font-weight: 700;
                    color: white;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 4px;
                }

                /* DIUBAH: Kontras tulisan sub-tabel dinaikkan */
                .table-sub { font-size: 13px; color: #cbd5e1; }

                table { width: 100%; border-collapse: collapse; }
                thead tr { background: rgba(255,255,255,0.03); }

                /* DIUBAH: Text header tabel dinaikkan ukurannya ke 11px dan warnanya dibuat abu-abu cerah */
                thead th { padding: 14px 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #cbd5e1; text-align: left; white-space: nowrap; }
                tbody tr { border-top: 1px solid rgba(255,255,255,0.06); transition: background 0.2s; }
                tbody tr:hover { background: rgba(59,130,246,0.04); }

                /* DIUBAH: Isi baris tabel teksnya diganti ke warna yang lebih cerah terang */
                tbody td { padding: 14px 20px; font-size: 14px; color: #e2e8f0; vertical-align: middle; }

                .td-program { font-weight: 600; color: white; }
                tbody tr:hover .td-program { color: #60a5fa; }

                .sdg-badge {
                    padding: 4px 12px;
                    background: rgba(240, 180, 41, 0.1);
                    border: 1px solid rgba(240, 180, 41, 0.25);
                    border-radius: 100px;
                    font-size: 11px;
                    font-weight: 700;
                    color: #f0b429;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                }

                .td-amount { font-family: 'Syne', sans-serif; font-weight: 600; color: white; }

                .status-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
                .status-row { display: flex; align-items: center; gap: 8px; }
                .status-text { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-style: italic; }

                /* KTP Thumbnail */
                .ktp-thumb {
                    width: 64px; height: 42px;
                    object-fit: cover;
                    border-radius: 8px;
                    border: 1px solid rgba(255,255,255,0.15);
                    cursor: pointer;
                    transition: all 0.2s;
                    display: block;
                }

                .ktp-thumb:hover {
                    border-color: rgba(59,130,246,0.5);
                    transform: scale(1.05);
                }

                .ktp-doc {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 6px;
                }

                .ktp-view-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                    width: 64px;
                    padding: 5px 0;
                    background: rgba(240, 180, 41, 0.1);
                    border: 1px solid rgba(240, 180, 41, 0.25);
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: 600;
                    color: #f0b429;
                    cursor: pointer;
                    margin-top: 0;
                    font-family: 'Syne', sans-serif;
                    text-decoration: none;
                    transition: all 0.2s;
                }

                .ktp-view-btn:hover { background: rgba(59,130,246,0.2); color: white; }

                /* DIUBAH: Tulisan tidak ada file dibuat abu-abu medium agar kelihatan */
                .ktp-no-file {
                    font-size: 12px;
                    color: #64748b;
                    font-style: italic;
                }

                /* Pay Button */
                .btn-pay {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 7px 16px;
                    background: linear-gradient(135deg, #f0b429, #f7d070);
                    border: none;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 700;
                    color: white;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: 'Syne', sans-serif;
                    box-shadow: 0 4px 12px rgba(240, 180, 41, 0.2);
                    white-space: nowrap;
                }

                .btn-pay:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(59,130,246,0.45); }
                .btn-pay:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

                /* Empty State */
                .empty-state { padding: 60px 24px; text-align: center; }

                /* DIUBAH: Kontras teks tabel kosong dinaikkan */
                .empty-text { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 16px; color: #94a3b8; }

                /* KTP Modal */
                .ktp-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.85);
                    backdrop-filter: blur(12px);
                    z-index: 2000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                    animation: fadeUp 0.2s ease both;
                }

                .ktp-modal-img {
                    max-width: 90vw;
                    max-height: 80vh;
                    border-radius: 16px;
                    border: 1px solid rgba(255,255,255,0.15);
                    box-shadow: 0 40px 80px rgba(0,0,0,0.6);
                }

                .ktp-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: rgba(255,255,255,0.15);
                    border: 1px solid rgba(255,255,255,0.2);
                    border-radius: 10px;
                    padding: 8px;
                    cursor: pointer;
                    color: white;
                    transition: all 0.2s;
                }

                .ktp-close:hover { background: rgba(255,255,255,0.3); }

                /* Payment Modal */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.75);
                    backdrop-filter: blur(12px);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                    animation: fadeUp 0.2s ease both;
                }

                .modal-card {
                    background: #0f172a;
                    border: 1px solid rgba(255,255,255,0.15);
                    border-radius: 28px;
                    padding: 36px;
                    width: 100%;
                    max-width: 420px;
                    box-shadow: 0 40px 80px rgba(0,0,0,0.6);
                    text-align: center;
                    position: relative;
                }

                .modal-close-btn {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: rgba(255,255,255,0.06);
                    border: none;
                    border-radius: 8px;
                    padding: 6px;
                    cursor: pointer;
                    color: #94a3b8; /* Diperterang */
                    transition: all 0.2s;
                }

                .modal-close-btn:hover { color: white; background: rgba(255,255,255,0.1); }
                .modal-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: white; margin-bottom: 6px; }

                /* DIUBAH: Subtitle modal dibuat abu-abu terang */
                .modal-sub { font-size: 13px; color: #cbd5e1; margin-bottom: 16px; }
                .modal-amount { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: #60a5fa; margin-bottom: 24px; }

                /* QRIS */
                .qris-wrap {
                    background: white;
                    border-radius: 16px;
                    padding: 20px;
                    margin: 0 auto 20px;
                    width: fit-content;
                }

                .qris-label {
                    font-family: 'Syne', sans-serif;
                    font-size: 11px;
                    font-weight: 700;
                    color: #1e40af;
                    text-align: center;
                    margin-bottom: 10px;
                    letter-spacing: 0.1em;
                }

                /* DIUBAH: Hint teks dalam modal diperterang */
                .modal-hint {
                    font-size: 12px;
                    color: #cbd5e1;
                    margin-bottom: 20px;
                    line-height: 1.6;
                }

                .modal-hint strong { color: #60a5fa; }
                .modal-actions { display: flex; gap: 10px; }

                .btn-cancel-pay {
                    flex: 1;
                    padding: 12px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.15);
                    border-radius: 12px;
                    font-family: 'Syne', sans-serif;
                    font-size: 14px;
                    font-weight: 600;
                    color: #cbd5e1; /* Diperterang */
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-cancel-pay:hover { color: white; border-color: rgba(255,255,255,0.3); }

                .btn-verify {
                    flex: 2;
                    padding: 12px;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-family: 'Syne', sans-serif;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    box-shadow: 0 6px 20px rgba(59,130,246,0.3);
                }

                .btn-verify:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(59,130,246,0.45); }
                .btn-verify:disabled { opacity: 0.6; cursor: not-allowed; }

                /* Success */
                .success-icon {
                    width: 80px; height: 80px;
                    background: rgba(52,211,153,0.1);
                    border: 2px solid rgba(52,211,153,0.3);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    animation: scaleIn 0.4s ease both;
                }

                .success-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: white; margin-bottom: 8px; }

                /* DIUBAH: Subtitle sukses modal diperterang */
                .success-sub { font-size: 14px; color: #cbd5e1; margin-bottom: 16px; line-height: 1.6; }
                .success-amount { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; color: #34d399; margin-bottom: 24px; }

                .btn-done {
                    width: 100%;
                    padding: 13px;
                    background: linear-gradient(135deg, #34d399, #059669);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-family: 'Syne', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .btn-done:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(52,211,153,0.3); }

                @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes scaleIn { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>

            <div className="mon-root">
                <div className="mon-bg-orb mon-bg-orb-1" />
                <div className="mon-bg-orb mon-bg-orb-2" />
                <div className="mon-grid" />

                <div className="mon-content">
                    <div className="page-header">
                        <div className="page-title sf-display">
                            Monitoring <span>Program SDGs.</span>
                        </div>
                        <div className="page-sub">
                            Laporan real-time riwayat pinjaman dan status
                            kontribusi SDG Anda
                        </div>
                    </div>

                    <div className="table-card">
                        <div className="table-header">
                            <div>
                                <div className="table-title sf-display">
                                    <History size={18} color="#f0b429" />
                                    Riwayat Pinjaman
                                </div>
                                <div className="table-sub">
                                    Total {loanRows.length} pinjaman terdaftar
                                </div>
                            </div>
                        </div>

                        <div style={{ overflowX: "auto" }}>
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
                                        <th>Status Pembayaran</th>
                                        <th>Dokumen KTP</th>
                                        <th>Pembayaran</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loanRows.length > 0 ? (
                                        loanRows.map((item) => (
                                            <tr key={item.id}>
                                                <td
                                                    style={{
                                                        color: "#f0b429",
                                                        fontSize: "12px",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {item.created_at}
                                                </td>
                                                <td className="td-program">
                                                    {item.program_name}
                                                </td>
                                                <td>
                                                    <span className="sdg-badge">
                                                        {item.sdg_type}
                                                    </span>
                                                </td>
                                                <td className="td-amount">
                                                    Rp{" "}
                                                    {Number(
                                                        item.amount,
                                                    ).toLocaleString("id-ID")}
                                                </td>
                                                <td
                                                    style={{ color: "#f0b429" }}
                                                >
                                                    {item.tenor} bln
                                                </td>
                                                <td>
                                                    <span
                                                        style={{
                                                            fontFamily:
                                                                "Syne, sans-serif",
                                                            fontWeight: 700,
                                                            color:
                                                                item.skor_kredit >=
                                                                70
                                                                    ? "#34d399"
                                                                    : "#f87171",
                                                            fontSize: "13px",
                                                        }}
                                                    >
                                                        {item.skor_kredit ||
                                                            "N/A"}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="status-row">
                                                        <div
                                                            className="status-dot"
                                                            style={{
                                                                background:
                                                                    statusColor(
                                                                        item.status,
                                                                    ),
                                                                boxShadow: `0 0 6px ${statusColor(item.status)}`,
                                                            }}
                                                        />
                                                        <span
                                                            className="status-text"
                                                            style={{
                                                                color: statusColor(
                                                                    item.status,
                                                                ),
                                                            }}
                                                        >
                                                            {item.status}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="status-row">
                                                        <div
                                                            className="status-dot"
                                                            style={{
                                                                background:
                                                                    paymentColor(
                                                                        item.payment_status,
                                                                    ),
                                                                boxShadow: `0 0 6px ${paymentColor(item.payment_status)}`,
                                                            }}
                                                        />
                                                        <span
                                                            className="status-text"
                                                            style={{
                                                                color: paymentColor(
                                                                    item.payment_status,
                                                                ),
                                                            }}
                                                        >
                                                            {paymentLabel(
                                                                item.payment_status,
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td>
                                                    {item.ktp_path ? (
                                                        <div className="ktp-doc">
                                                            <img
                                                                src={
                                                                    item.ktp_path
                                                                }
                                                                className="ktp-thumb"
                                                                alt="KTP"
                                                                onClick={() =>
                                                                    setKtpModal(
                                                                        item.ktp_path,
                                                                    )
                                                                }
                                                            />
                                                            <a
                                                                href={
                                                                    item.ktp_path
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="ktp-view-btn"
                                                            >
                                                                <ExternalLink
                                                                    size={10}
                                                                />{" "}
                                                                Lihat
                                                            </a>
                                                        </div>
                                                    ) : (
                                                        <span className="ktp-no-file">
                                                            Tidak ada
                                                        </span>
                                                    )}
                                                </td>

                                                <td>
                                                    <button
                                                        className="btn-pay"
                                                        onClick={() =>
                                                            openPayment(item)
                                                        }
                                                        disabled={!canPay(item)}
                                                        title={
                                                            item.payment_status ===
                                                            "lunas"
                                                                ? "Sudah lunas"
                                                                : item.status !==
                                                                    "aktif"
                                                                  ? "Menunggu persetujuan admin"
                                                                  : undefined
                                                        }
                                                    >
                                                        <QrCode size={13} />{" "}
                                                        {payButtonLabel(item)}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={10}>
                                                <div className="empty-state">
                                                    <PieChart
                                                        size={40}
                                                        color="#1e293b"
                                                        style={{
                                                            margin: "0 auto",
                                                        }}
                                                    />
                                                    <div className="empty-text">
                                                        Belum ada riwayat
                                                        pinjaman
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

            {/* KTP Full View Modal */}
            {ktpModal && (
                <div
                    className="ktp-modal-overlay"
                    onClick={() => setKtpModal(null)}
                >
                    <button
                        className="ktp-close"
                        onClick={(e) => {
                            e.stopPropagation();
                            setKtpModal(null);
                        }}
                    >
                        <X size={20} />
                    </button>
                    <img
                        src={ktpModal}
                        className="ktp-modal-img"
                        alt="KTP Full"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* Payment Modal */}
            {payingItem && (
                <div
                    className="modal-overlay"
                    onClick={!paid ? closePayment : undefined}
                >
                    <div
                        className="modal-card"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="modal-close-btn"
                            onClick={closePayment}
                        >
                            <X size={16} />
                        </button>

                        {!paid ? (
                            <>
                                <div className="modal-title sf-display">
                                    Pembayaran QRIS
                                </div>
                                <div className="modal-sub">
                                    {payingItem.program_name}
                                </div>
                                <div className="modal-amount">
                                    Rp{" "}
                                    {Number(payingItem.amount).toLocaleString(
                                        "id-ID",
                                    )}
                                </div>

                                <div className="qris-wrap">
                                    <div className="qris-label">
                                        ⚡ SCAN UNTUK MEMBAYAR
                                    </div>
                                    <svg
                                        width="200"
                                        height="200"
                                        viewBox="0 0 200 200"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            x="10"
                                            y="10"
                                            width="60"
                                            height="60"
                                            rx="4"
                                            fill="#1e3a5f"
                                        />
                                        <rect
                                            x="18"
                                            y="18"
                                            width="44"
                                            height="44"
                                            rx="2"
                                            fill="white"
                                        />
                                        <rect
                                            x="26"
                                            y="26"
                                            width="28"
                                            height="28"
                                            rx="1"
                                            fill="#1e3a5f"
                                        />
                                        <rect
                                            x="130"
                                            y="10"
                                            width="60"
                                            height="60"
                                            rx="4"
                                            fill="#1e3a5f"
                                        />
                                        <rect
                                            x="138"
                                            y="18"
                                            width="44"
                                            height="44"
                                            rx="2"
                                            fill="white"
                                        />
                                        <rect
                                            x="146"
                                            y="26"
                                            width="28"
                                            height="28"
                                            rx="1"
                                            fill="#1e3a5f"
                                        />
                                        <rect
                                            x="10"
                                            y="130"
                                            width="60"
                                            height="60"
                                            rx="4"
                                            fill="#1e3a5f"
                                        />
                                        <rect
                                            x="18"
                                            y="138"
                                            width="44"
                                            height="44"
                                            rx="2"
                                            fill="white"
                                        />
                                        <rect
                                            x="26"
                                            y="146"
                                            width="28"
                                            height="28"
                                            rx="1"
                                            fill="#1e3a5f"
                                        />
                                        {[80, 90, 100, 110, 120].map((x) =>
                                            [15, 25, 35, 45, 55, 65].map(
                                                (y) => (
                                                    <rect
                                                        key={`a${x}${y}`}
                                                        x={x}
                                                        y={y}
                                                        width="7"
                                                        height="7"
                                                        rx="1"
                                                        fill={
                                                            Math.sin(x * y) > 0
                                                                ? "#1e3a5f"
                                                                : "transparent"
                                                        }
                                                    />
                                                ),
                                            ),
                                        )}
                                        {[
                                            15, 25, 35, 45, 55, 65, 75, 85, 95,
                                            105, 115, 125,
                                        ].map((x) =>
                                            [80, 90, 100, 110, 120].map((y) => (
                                                <rect
                                                    key={`b${x}${y}`}
                                                    x={x}
                                                    y={y}
                                                    width="7"
                                                    height="7"
                                                    rx="1"
                                                    fill={
                                                        Math.cos(x + y) > 0
                                                            ? "#1e3a5f"
                                                            : "transparent"
                                                    }
                                                />
                                            )),
                                        )}
                                        {[130, 140, 150, 160, 170, 180].map(
                                            (x) =>
                                                [
                                                    80, 90, 100, 110, 120, 130,
                                                    140, 150, 160, 170, 180,
                                                ].map((y) => (
                                                    <rect
                                                        key={`c${x}${y}`}
                                                        x={x}
                                                        y={y}
                                                        width="7"
                                                        height="7"
                                                        rx="1"
                                                        fill={
                                                            Math.sin(x - y) >
                                                            0.2
                                                                ? "#1e3a5f"
                                                                : "transparent"
                                                        }
                                                    />
                                                )),
                                        )}
                                        <rect
                                            x="82"
                                            y="82"
                                            width="36"
                                            height="36"
                                            rx="8"
                                            fill="#3b82f6"
                                        />
                                        <text
                                            x="100"
                                            y="106"
                                            textAnchor="middle"
                                            fill="white"
                                            fontSize="18"
                                            fontWeight="bold"
                                            fontFamily="Arial"
                                        >
                                            S
                                        </text>
                                    </svg>
                                    <div
                                        style={{
                                            fontSize: "10px",
                                            color: "#6b7280",
                                            textAlign: "center",
                                            marginTop: "8px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Smart Finance · QRIS
                                    </div>
                                </div>

                                <div className="modal-hint">
                                    Scan kode QRIS menggunakan aplikasi mobile
                                    banking atau e-wallet, lalu klik{" "}
                                    <strong>Verifikasi Pembayaran</strong>{" "}
                                    setelah selesai.
                                </div>

                                <div className="modal-actions">
                                    <button
                                        className="btn-cancel-pay"
                                        onClick={closePayment}
                                    >
                                        Batal
                                    </button>
                                    <button
                                        className="btn-verify"
                                        onClick={handleVerify}
                                        disabled={verifying}
                                    >
                                        {verifying ? (
                                            <>
                                                <Loader
                                                    size={15}
                                                    style={{
                                                        animation:
                                                            "spin 1s linear infinite",
                                                    }}
                                                />{" "}
                                                Memverifikasi...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle size={15} />{" "}
                                                Verifikasi Pembayaran
                                            </>
                                        )}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="success-icon">
                                    <CheckCircle size={40} color="#34d399" />
                                </div>
                                <div className="success-title sf-display">
                                    Pembayaran Berhasil! 🎉
                                </div>
                                <div className="success-sub">
                                    Transaksi untuk{" "}
                                    <strong style={{ color: "white" }}>
                                        {payingItem.program_name}
                                    </strong>{" "}
                                    telah berhasil dikonfirmasi.
                                </div>
                                <div className="success-amount">
                                    Rp{" "}
                                    {Number(payingItem.amount).toLocaleString(
                                        "id-ID",
                                    )}
                                </div>
                                <button
                                    className="btn-done"
                                    onClick={closePayment}
                                >
                                    Selesai ✓
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
