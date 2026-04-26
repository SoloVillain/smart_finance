import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Wallet, CheckCircle, XCircle, Pencil, Trash2, X, Save } from "lucide-react";
import { useState } from "react";

type Loan = {
    id: number;
    amount: number;
    tenor: number;
    status: string;
    skor_kredit: number;
    created_at: string;
};

type UserType = {
    id: number;
    name: string;
    email: string;
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
    const { data, setData, put, processing } = useForm({
        amount: '',
        tenor: '',
        status: '',
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
        put(route('admin.loans.update', editingLoan!.id), {
            onSuccess: () => closeEdit(),
        });
    };

    const handleDelete = (loanId: number) => {
        if (confirm('Yakin ingin menghapus pinjaman ini?')) {
            router.delete(route('admin.loans.delete', loanId), {
                preserveScroll: true,
            });
        }
    };

    const statusColor = (s: string) => {
        if (s === 'aktif') return '#34d399';
        if (s === 'pending') return '#fbbf24';
        return '#f87171';
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Detail User - ${user.name}`} />
            <style>{`
                .ud-root { font-family: 'DM Sans', sans-serif; background: #020617; min-height: 100vh; padding: 88px 24px 60px; position: relative; overflow-x: hidden; }
                .sf-display { font-family: 'Syne', sans-serif; }
                .ud-bg-orb { position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; }
                .ud-bg-orb-1 { width: 500px; height: 500px; background: rgba(59,130,246,0.07); top: -100px; right: -100px; }
                .ud-bg-orb-2 { width: 400px; height: 400px; background: rgba(99,102,241,0.06); bottom: 0; left: -100px; }
                .ud-grid-pattern { position: fixed; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; z-index: 0; }
                .ud-content { position: relative; z-index: 10; max-width: 1100px; margin: 0 auto; }

                .back-btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; font-size: 13px; font-weight: 600; color: #64748b; text-decoration: none; transition: all 0.2s; margin-bottom: 24px; font-family: 'Syne', sans-serif; }
                .back-btn:hover { color: white; border-color: rgba(59,130,246,0.3); background: rgba(59,130,246,0.08); }

                .profile-card { background: linear-gradient(135deg, #0f172a, #1e293b); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 28px; display: flex; align-items: center; gap: 20px; margin-bottom: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.4); position: relative; overflow: hidden; animation: fadeUp 0.4s ease both; }
                .profile-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(59,130,246,0.06) 0%, transparent 60%); pointer-events: none; }
                .profile-avatar { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #6366f1); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: white; flex-shrink: 0; box-shadow: 0 0 20px rgba(59,130,246,0.3); }
                .profile-name { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: white; margin-bottom: 4px; }
                .profile-email { font-size: 14px; color: #475569; }
                .profile-joined { font-size: 12px; color: #334155; margin-top: 6px; }

                .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 20px; animation: fadeUp 0.4s ease 0.1s both; }
                .stat-box { background: rgba(15,23,42,0.7); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 18px; backdrop-filter: blur(10px); }
                .stat-box-label { font-size: 11px; color: #475569; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; margin-bottom: 6px; }
                .stat-box-value { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: white; }

                .loans-card { background: rgba(15,23,42,0.7); border: 1px solid rgba(255,255,255,0.06); border-radius: 24px; overflow: hidden; backdrop-filter: blur(10px); animation: fadeUp 0.4s ease 0.2s both; }
                .loans-header { padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .loans-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: white; }

                table { width: 100%; border-collapse: collapse; }
                thead tr { background: rgba(255,255,255,0.02); }
                thead th { padding: 12px 20px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #334155; text-align: left; }
                tbody tr { border-top: 1px solid rgba(255,255,255,0.04); transition: background 0.2s; }
                tbody tr:hover { background: rgba(59,130,246,0.04); }
                tbody td { padding: 16px 20px; font-size: 14px; color: #94a3b8; }

                .amount-val { font-family: 'Syne', sans-serif; font-weight: 600; color: white; }
                .status-pill { display: inline-flex; align-items: center; gap: 5px; padding: 4px 12px; border-radius: 100px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; font-family: 'Syne', sans-serif; }
                .score-val { font-family: 'Syne', sans-serif; font-weight: 700; }

                .action-row { display: flex; gap: 8px; }
                .btn-edit { display: flex; align-items: center; gap: 5px; padding: 6px 12px; background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.2); border-radius: 8px; font-size: 12px; font-weight: 600; color: #60a5fa; cursor: pointer; transition: all 0.2s; font-family: 'Syne', sans-serif; }
                .btn-edit:hover { background: rgba(59,130,246,0.15); transform: translateY(-1px); }
                .btn-delete { display: flex; align-items: center; gap: 5px; padding: 6px 12px; background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.2); border-radius: 8px; font-size: 12px; font-weight: 600; color: #f87171; cursor: pointer; transition: all 0.2s; font-family: 'Syne', sans-serif; }
                .btn-delete:hover { background: rgba(248,113,113,0.15); transform: translateY(-1px); }

                .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeUp 0.2s ease both; }
                .modal-card { background: #0f172a; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 32px; width: 100%; max-width: 480px; box-shadow: 0 40px 80px rgba(0,0,0,0.6); }
                .modal-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: white; margin-bottom: 6px; }
                .modal-sub { font-size: 13px; color: #475569; margin-bottom: 24px; }
                .modal-field { margin-bottom: 16px; }
                .modal-label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #475569; margin-bottom: 7px; }
                .modal-input { width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 11px 14px; font-size: 14px; color: white; font-family: 'DM Sans', sans-serif; outline: none; transition: all 0.2s; }
                .modal-input:focus { border-color: rgba(59,130,246,0.5); background: rgba(59,130,246,0.05); box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
                .modal-input::placeholder { color: #334155; }
                select.modal-input option { background: #0f172a; color: white; }
                .modal-actions { display: flex; gap: 10px; margin-top: 24px; }
                .btn-save { flex: 1; padding: 12px; background: linear-gradient(135deg, #3b82f6, #6366f1); color: white; border: none; border-radius: 12px; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 6px; }
                .btn-save:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(59,130,246,0.4); }
                .btn-save:disabled { opacity: 0.5; cursor: not-allowed; }
                .btn-cancel { padding: 12px 20px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 600; color: #64748b; cursor: pointer; transition: all 0.2s; }
                .btn-cancel:hover { color: white; border-color: rgba(255,255,255,0.15); }

                .empty-state { padding: 60px 24px; text-align: center; }
                .empty-text { font-size: 13px; color: #334155; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 12px; }

                @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
                @media (max-width: 768px) { .stats-grid { grid-template-columns: 1fr 1fr; } }
            `}</style>

            <div className="ud-root">
                <div className="ud-bg-orb ud-bg-orb-1" />
                <div className="ud-bg-orb ud-bg-orb-2" />
                <div className="ud-grid-pattern" />

                <div className="ud-content">
                    <Link href={route('admin.users.index')} className="back-btn">
                        ← Kembali ke Daftar User
                    </Link>

                    {/* Profile */}
                    <div className="profile-card">
                        <div className="profile-avatar">{user.name.charAt(0).toUpperCase()}</div>
                        <div>
                            <div className="profile-name">{user.name}</div>
                            <div className="profile-email">{user.email}</div>
                            <div className="profile-joined">Bergabung sejak {user.created_at}</div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="stats-grid">
                        <div className="stat-box">
                            <div className="stat-box-label">Total Pinjaman</div>
                            <div className="stat-box-value sf-display">{stats.total_pinjaman}</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-box-label">Total Dana</div>
                            <div className="stat-box-value sf-display" style={{ fontSize: '16px' }}>
                                Rp {stats.total_amount?.toLocaleString('id-ID')}
                            </div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-box-label">Pinjaman Aktif</div>
                            <div className="stat-box-value sf-display" style={{ color: '#34d399' }}>{stats.aktif}</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-box-label">Menunggu</div>
                            <div className="stat-box-value sf-display" style={{ color: '#fbbf24' }}>{stats.pending}</div>
                        </div>
                    </div>

                    {/* Loans Table */}
                    <div className="loans-card">
                        <div className="loans-header">
                            <div className="loans-title sf-display">Riwayat Pinjaman</div>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Jumlah</th>
                                        <th>Tenor</th>
                                        <th>Skor AI</th>
                                        <th>Status</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loans.length > 0 ? loans.map(loan => (
                                        <tr key={loan.id}>
                                            <td style={{ color: '#64748b', fontSize: '13px' }}>{loan.created_at}</td>
                                            <td><span className="amount-val">Rp {loan.amount?.toLocaleString('id-ID')}</span></td>
                                            <td style={{ color: '#94a3b8' }}>{loan.tenor} bulan</td>
                                            <td>
                                                <span className="score-val" style={{ color: loan.skor_kredit >= 70 ? '#34d399' : '#f87171', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    {loan.skor_kredit >= 70
                                                        ? <CheckCircle size={13} />
                                                        : <XCircle size={13} />
                                                    }
                                                    {loan.skor_kredit || 'N/A'}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="status-pill" style={{
                                                    background: `${statusColor(loan.status)}18`,
                                                    border: `1px solid ${statusColor(loan.status)}33`,
                                                    color: statusColor(loan.status)
                                                }}>
                                                    {loan.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-row">
                                                    <button className="btn-edit" onClick={() => openEdit(loan)}>
                                                        <Pencil size={12} /> Edit
                                                    </button>
                                                    <button className="btn-delete" onClick={() => handleDelete(loan.id)}>
                                                        <Trash2 size={12} /> Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={6}>
                                                <div className="empty-state">
                                                    <Wallet size={36} color="#1e293b" style={{ margin: '0 auto' }} />
                                                    <div className="empty-text">Belum ada pinjaman</div>
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

            {/* Edit Modal */}
            {editingLoan && (
                <div className="modal-overlay" onClick={closeEdit}>
                    <div className="modal-card" onClick={e => e.stopPropagation()}>
                        <div className="modal-title sf-display">Edit Pinjaman</div>
                        <div className="modal-sub">ID #{editingLoan.id} · {editingLoan.created_at}</div>

                        <form onSubmit={submitEdit}>
                            <div className="modal-field">
                                <label className="modal-label">Jumlah Pinjaman (Rp)</label>
                                <input
                                    type="number"
                                    className="modal-input"
                                    value={data.amount}
                                    onChange={e => setData('amount', e.target.value)}
                                    placeholder="500000"
                                />
                            </div>
                            <div className="modal-field">
                                <label className="modal-label">Tenor (Bulan)</label>
                                <input
                                    type="number"
                                    className="modal-input"
                                    value={data.tenor}
                                    onChange={e => setData('tenor', e.target.value)}
                                    placeholder="12"
                                />
                            </div>
                            <div className="modal-field">
                                <label className="modal-label">Status</label>
                                <select
                                    className="modal-input"
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="aktif">Aktif</option>
                                    <option value="ditolak">Ditolak</option>
                                </select>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={closeEdit}>
                                    <X size={14} /> Batal
                                </button>
                                <button type="submit" className="btn-save" disabled={processing}>
                                    <Save size={14} />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
