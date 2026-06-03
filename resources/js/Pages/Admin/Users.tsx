import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Users,
    TrendingUp,
    Wallet,
    ChevronRight,
    Search,
    ArrowLeft,
} from "lucide-react";
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
    const [search, setSearch] = useState("");

    const filtered = users.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <AuthenticatedLayout>
            <Head title="Manajemen User — Smart Finance" />
            <style>{`
                main { padding-top: 0 !important; }

                .up-root {
                    font-family: 'DM Sans', sans-serif;
                    background: linear-gradient(165deg, #050a14 0%, #0a111f 48%, #0f1b2e 100%);
                    min-height: calc(100vh - 62px);
                    padding: 94px 24px 34px;
                    position: relative;
                    overflow-x: hidden;
                    color: #c9d6e3;
                    -webkit-font-smoothing: antialiased;
                }

                .up-root::before {
                    content: '';
                    position: fixed; inset: 0;
                    background: radial-gradient(ellipse 70% 45% at 50% 0%, rgba(77,159,255,0.07) 0%, transparent 55%);
                    pointer-events: none; z-index: 0;
                }

                .up-content {
                    position: relative; z-index: 1;
                    max-width: 1280px; margin: 0 auto;
                }

                /* ── HEADER ── */
                .up-header {
                    display: flex; justify-content: space-between; align-items: flex-start;
                    margin-bottom: 28px;
                    animation: upFade 0.4s ease both;
                }

                .up-title {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(24px, 3vw, 32px); font-weight: 800;
                    color: #ffffff; letter-spacing: -0.03em; line-height: 1.1;
                    margin-bottom: 5px;
                }
                .up-title em { color: #f0b429; font-style: normal; }

                .up-subtitle { font-size: 13.5px; font-weight: 400; color: #ffffff; }

                .up-back {
                    display: inline-flex; align-items: center; gap: 7px;
                    padding: 8px 16px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.09);
                    border-radius: 9px;
                    font-size: 13px; font-weight: 600;
                    color: #ffffff; text-decoration: none;
                    transition: all 0.18s;
                    font-family: 'DM Sans', sans-serif;
                    white-space: nowrap; flex-shrink: 0;
                }
                .up-back:hover { color: #f0f6fc; border-color: rgba(240,180,41,0.25); background: rgba(240,180,41,0.06); }

                /* ── STAT CARDS ── */
                .up-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px; margin-bottom: 24px;
                    animation: upFade 0.4s ease 0.08s both;
                }

                .up-stat {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px; padding: 22px 24px;
                    position: relative; overflow: hidden;
                    transition: border-color 0.2s, transform 0.2s;
                }

                .up-stat::before {
                    content: '';
                    position: absolute; top: 0; left: 0; right: 0; height: 2px;
                    border-radius: 14px 14px 0 0;
                }

                .up-stat.cyan::before   { background: #38bdf8; }
                .up-stat.green::before  { background: #4ade80; }
                .up-stat.amber::before  { background: #f0b429; }

                .up-stat:hover { border-color: rgba(255,255,255,0.13); transform: translateY(-2px); }

                .up-stat-ico {
                    width: 38px; height: 38px; border-radius: 9px;
                    display: flex; align-items: center; justify-content: center;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                    margin-bottom: 16px;
                }

                .up-stat-lbl {
                    font-size: 10.5px; font-weight: 700;
                    text-transform: uppercase; letter-spacing: 0.12em;
                    color: #ffffff; margin-bottom: 6px;
                }

                .up-stat-val {
                    font-family: 'Syne', sans-serif;
                    font-size: 32px; font-weight: 800;
                    color: #ffffff; letter-spacing: -0.03em; line-height: 1;
                }
                .up-stat-val.sm { font-size: 18px; }

                /* ── TABLE CARD ── */
                .up-table-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 16px; overflow: hidden;
                    animation: upFade 0.4s ease 0.16s both;
                }

                .up-table-top {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 18px 22px;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    gap: 16px; flex-wrap: wrap;
                }

                .up-table-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 15.5px; font-weight: 700;
                    color: #f0f6fc; letter-spacing: -0.01em;
                }

                /* Search */
                .up-search-wrap { position: relative; }
                .up-search-ico { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: #64748b; pointer-events: none; display: flex; }
                .up-search {
                    background: rgba(0,0,0,0.25);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 9px;
                    padding: 9px 13px 9px 34px;
                    font-size: 13px; font-weight: 400;
                    color: #f0f6fc; font-family: 'DM Sans', sans-serif;
                    outline: none; width: 220px;
                    transition: border-color 0.18s, box-shadow 0.18s;
                }
                .up-search::placeholder { color: #ffffff; }
                .up-search:focus { border-color: #f0b429; box-shadow: 0 0 0 3px rgba(240,180,41,0.1); }

                /* Table */
                .up-table-wrap { overflow-x: auto; }

                table { width: 100%; border-collapse: collapse; }

                thead tr { background: rgba(255,255,255,0.02); }
                thead th {
                    padding: 12px 18px;
                    font-size: 10px; font-weight: 700;
                    text-transform: uppercase; letter-spacing: 0.14em;
                    color: #ffffff; text-align: left;
                }

                tbody tr {
                    border-top: 1px solid rgba(255,255,255,0.04);
                    transition: background 0.18s;
                }
                tbody tr:hover { background: rgba(240,180,41,0.03); }

                tbody td { padding: 14px 18px; font-size: 13.5px; color: #94a3b8; vertical-align: middle; }

                /* User cell */
                .up-user-row { display: flex; align-items: center; gap: 11px; }

                .up-avatar {
                    width: 34px; height: 34px; border-radius: 50%;
                    background: #f0b429;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 13px;
                    color: #050a14; flex-shrink: 0;
                }

                .up-user-name {
                    font-family: 'Syne', sans-serif;
                    font-size: 14px; font-weight: 700;
                    color: #f0b429; margin-bottom: 2px;
                }
                .up-user-email { font-size: 12px; font-weight: 400; color: #ffffff; }

                .up-date { font-size: 12.5px; font-weight: 400; color: #ffffff; }

                .up-loan-pill {
                    display: inline-flex; align-items: center;
                    padding: 4px 12px;
                    background: rgba(56,189,248,0.08);
                    border: 1px solid rgba(56,189,248,0.2);
                    border-radius: 100px;
                    font-size: 12px; font-weight: 700;
                    color: #38bdf8;
                    font-family: 'Syne', sans-serif;
                }

                .up-amount {
                    font-family: 'Syne', sans-serif;
                    font-size: 13.5px; font-weight: 700;
                    color: #f0f6fc;
                }

                .up-detail-btn {
                    display: inline-flex; align-items: center; gap: 5px;
                    padding: 6px 13px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.09);
                    border-radius: 8px;
                    font-size: 12px; font-weight: 600;
                    color: #ffffff; text-decoration: none;
                    transition: all 0.18s;
                    font-family: 'Syne', sans-serif;
                }
                .up-detail-btn:hover {
                    color: #f0b429;
                    border-color: rgba(240,180,41,0.3);
                    background: rgba(240,180,41,0.06);
                }

                /* Empty */
                .up-empty { padding: 60px 24px; text-align: center; }
                .up-empty-ico { color: #1e293b; margin: 0 auto 12px; display: block; }
                .up-empty-txt { font-size: 12.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #334155; }

                @keyframes upFade {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 900px) {
                    .up-root { padding: 20px 16px 48px; }
                    .up-stats { grid-template-columns: 1fr; }
                    .up-header { flex-direction: column; gap: 12px; }
                    .up-search { width: 100%; }
                }
            `}</style>

            <div className="up-root">
                <div className="up-content">
                    {/* ── HEADER ── */}
                    <div className="up-header">
                        <div>
                            <div className="up-title">
                                Manajemen <em>User.</em>
                            </div>
                            <div className="up-subtitle">
                                Data seluruh pengguna dan riwayat pinjaman
                                mereka
                            </div>
                        </div>
                        <Link
                            href={route("admin.dashboard")}
                            className="up-back"
                        >
                            <ArrowLeft size={14} /> Kembali ke Dashboard
                        </Link>
                    </div>

                    {/* ── STAT CARDS ── */}
                    <div className="up-stats">
                        <div className="up-stat cyan">
                            <div className="up-stat-ico">
                                <Users size={17} color="#38bdf8" />
                            </div>
                            <div className="up-stat-lbl">Total User</div>
                            <div className="up-stat-val">
                                {stats.total_users}
                            </div>
                        </div>

                        <div className="up-stat green">
                            <div className="up-stat-ico">
                                <TrendingUp size={17} color="#4ade80" />
                            </div>
                            <div className="up-stat-lbl">Pinjaman Aktif</div>
                            <div className="up-stat-val">
                                {stats.active_loans}
                            </div>
                        </div>

                        <div className="up-stat amber">
                            <div className="up-stat-ico">
                                <Wallet size={17} color="#f0b429" />
                            </div>
                            <div className="up-stat-lbl">Total Dana Aktif</div>
                            <div className="up-stat-val sm">
                                <div className="ud-stat-val sm">
                                    Rp{" "}
                                    {Number(stats.total_dana).toLocaleString(
                                        "id-ID",
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── TABLE ── */}
                    <div className="up-table-card">
                        <div className="up-table-top">
                            <div className="up-table-title">
                                Daftar Pengguna
                            </div>
                            <div className="up-search-wrap">
                                <span className="up-search-ico">
                                    <Search size={13} />
                                </span>
                                <input
                                    type="text"
                                    className="up-search"
                                    placeholder="Cari nama atau email..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="up-table-wrap">
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
                                    {filtered.length > 0 ? (
                                        filtered.map((user) => (
                                            <tr key={user.id}>
                                                <td>
                                                    <div className="up-user-row">
                                                        <div className="up-avatar">
                                                            {user.name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className="up-user-name">
                                                                {user.name}
                                                            </div>
                                                            <div className="up-user-email">
                                                                {user.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="up-date">
                                                        {user.created_at}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="up-loan-pill">
                                                        {user.loans_count}{" "}
                                                        Pinjaman
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="up-amount">
                                                        Rp{" "}
                                                        {user.total_pinjaman?.toLocaleString(
                                                            "id-ID",
                                                        )}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Link
                                                        href={route(
                                                            "admin.users.show",
                                                            user.id,
                                                        )}
                                                        className="up-detail-btn"
                                                    >
                                                        Detail{" "}
                                                        <ChevronRight
                                                            size={12}
                                                        />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5}>
                                                <div className="up-empty">
                                                    <Users
                                                        size={34}
                                                        className="up-empty-ico"
                                                    />
                                                    <div className="up-empty-txt">
                                                        Tidak ada user ditemukan
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
