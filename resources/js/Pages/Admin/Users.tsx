import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Users, TrendingUp, Wallet, ChevronRight, Search } from "lucide-react";
import { useState } from "react";

type UserItem = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    loans_count: number;
    total_pinjaman: number;
};

type Stats = {
    total_users: number;
    active_loans: number;
    total_dana: number;
};

type UsersProps = {
    users: UserItem[];
    stats: Stats;
};

export default function UsersPage({ users, stats }: UsersProps) {
    const [search, setSearch] = useState('');

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <Head title="Manajemen User" />
            <style>{`
                .users-root {
                    font-family: 'DM Sans', sans-serif;
                    background: #020617;
                    min-height: 100vh;
                    padding: 88px 24px 60px;
                    position: relative;
                    overflow-x: hidden;
                }
                .sf-display { font-family: 'Syne', sans-serif; }
                .users-bg-orb { position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; }
                .users-bg-orb-1 { width: 500px; height: 500px; background: rgba(59,130,246,0.07); top: -100px; left: -100px; }
                .users-bg-orb-2 { width: 400px; height: 400px; background: rgba(99,102,241,0.06); bottom: 0; right: -100px; }
                .users-grid-pattern { position: fixed; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; z-index: 0; }
                .users-content { position: relative; z-index: 10; max-width: 1280px; margin: 0 auto; }

                .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; animation: fadeUp 0.4s ease both; }
                .page-title { font-family: 'Syne', sans-serif; font-size: clamp(24px, 3vw, 32px); font-weight: 800; color: white; margin-bottom: 4px; }
                .page-title span { background: linear-gradient(135deg, #60a5fa, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
                .page-subtitle { font-size: 13px; color: #475569; }

                .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; animation: fadeUp 0.4s ease 0.1s both; }
                .stat-box { background: rgba(15,23,42,0.7); border: 1px solid rgba(255,255,255,0.06); border-radius: 18px; padding: 22px; backdrop-filter: blur(10px); transition: all 0.3s; }
                .stat-box:hover { transform: translateY(-2px); border-color: rgba(59,130,246,0.2); }
                .stat-box-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
                .stat-box-label { font-size: 11px; color: #475569; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; margin-bottom: 5px; }
                .stat-box-value { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: white; letter-spacing: -0.02em; }

                .table-card { background: rgba(15,23,42,0.7); border: 1px solid rgba(255,255,255,0.06); border-radius: 24px; overflow: hidden; backdrop-filter: blur(10px); animation: fadeUp 0.4s ease 0.2s both; }
                .table-top { padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
                .table-top-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: white; }

                .search-wrap { position: relative; }
                .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #334155; pointer-events: none; }
                .search-input { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 9px 14px 9px 36px; font-size: 13px; color: white; font-family: 'DM Sans', sans-serif; outline: none; width: 220px; transition: all 0.2s; }
                .search-input::placeholder { color: #334155; }
                .search-input:focus { border-color: rgba(59,130,246,0.4); background: rgba(59,130,246,0.05); }

                table { width: 100%; border-collapse: collapse; }
                thead tr { background: rgba(255,255,255,0.02); }
                thead th { padding: 12px 20px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #334155; text-align: left; }
                tbody tr { border-top: 1px solid rgba(255,255,255,0.04); transition: background 0.2s; }
                tbody tr:hover { background: rgba(59,130,246,0.05); }
                tbody td { padding: 16px 20px; font-size: 14px; color: #94a3b8; }

                .user-name { font-weight: 600; color: white; margin-bottom: 2px; }
                .user-email { font-size: 12px; color: #475569; }
                .user-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #6366f1); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; color: white; flex-shrink: 0; }
                .user-row { display: flex; align-items: center; gap: 12px; }

                .loan-count { display: inline-flex; align-items: center; padding: 3px 10px; background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2); border-radius: 100px; font-size: 12px; font-weight: 700; color: #60a5fa; font-family: 'Syne', sans-serif; }
                .amount-val { font-family: 'Syne', sans-serif; font-weight: 600; color: white; font-size: 13px; }
                .detail-btn { display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; font-size: 12px; font-weight: 600; color: #64748b; text-decoration: none; transition: all 0.2s; font-family: 'Syne', sans-serif; }
                .detail-btn:hover { color: white; border-color: rgba(59,130,246,0.3); background: rgba(59,130,246,0.08); }

                .back-btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; font-size: 13px; font-weight: 600; color: #64748b; text-decoration: none; transition: all 0.2s; font-family: 'Syne', sans-serif; }
                .back-btn:hover { color: white; border-color: rgba(59,130,246,0.3); background: rgba(59,130,246,0.08); }

                .empty-state { padding: 60px 24px; text-align: center; }
                .empty-text { font-size: 13px; color: #334155; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 12px; }

                @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
                @media (max-width: 768px) { .stats-row { grid-template-columns: 1fr; } .page-header { flex-direction: column; gap: 12px; } }
            `}</style>

            <div className="users-root">
                <div className="users-bg-orb users-bg-orb-1" />
                <div className="users-bg-orb users-bg-orb-2" />
                <div className="users-grid-pattern" />

                <div className="users-content">
                    <div className="page-header">
                        <div>
                            <div className="page-title sf-display">Manajemen <span>User.</span></div>
                            <div className="page-subtitle">Data seluruh pengguna dan riwayat pinjaman mereka</div>
                        </div>
                        <Link href={route('admin.dashboard')} className="back-btn">
                            ← Kembali ke Dashboard
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="stats-row">
                        <div className="stat-box">
                            <div className="stat-box-icon" style={{ background: 'rgba(59,130,246,0.1)' }}>
                                <Users size={20} color="#60a5fa" />
                            </div>
                            <div className="stat-box-label">Total User</div>
                            <div className="stat-box-value sf-display">{stats.total_users}</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-box-icon" style={{ background: 'rgba(52,211,153,0.1)' }}>
                                <TrendingUp size={20} color="#34d399" />
                            </div>
                            <div className="stat-box-label">Pinjaman Aktif</div>
                            <div className="stat-box-value sf-display">{stats.active_loans}</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-box-icon" style={{ background: 'rgba(251,191,36,0.1)' }}>
                                <Wallet size={20} color="#fbbf24" />
                            </div>
                            <div className="stat-box-label">Total Dana Aktif</div>
                            <div className="stat-box-value sf-display" style={{ fontSize: '18px' }}>
                                Rp {stats.total_dana?.toLocaleString('id-ID')}
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="table-card">
                        <div className="table-top">
                            <div className="table-top-title sf-display">Daftar Pengguna</div>
                            <div className="search-wrap">
                                <Search size={14} className="search-icon" />
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Cari nama atau email..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Pengguna</th>
                                        <th>Bergabung</th>
                                        <th>Total Pinjaman</th>
                                        <th>Total Dana</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.length > 0 ? filtered.map(user => (
                                        <tr key={user.id}>
                                            <td>
                                                <div className="user-row">
                                                    <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
                                                    <div>
                                                        <div className="user-name">{user.name}</div>
                                                        <div className="user-email">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ color: '#64748b', fontSize: '13px' }}>{user.created_at}</td>
                                            <td><span className="loan-count">{user.loans_count} Pinjaman</span></td>
                                            <td><span className="amount-val">Rp {user.total_pinjaman?.toLocaleString('id-ID')}</span></td>
                                            <td>
                                                <Link href={route('admin.users.show', user.id)} className="detail-btn">
                                                    Detail <ChevronRight size={13} />
                                                </Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5}>
                                                <div className="empty-state">
                                                    <Users size={36} color="#1e293b" style={{ margin: '0 auto' }} />
                                                    <div className="empty-text">Tidak ada user ditemukan</div>
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
