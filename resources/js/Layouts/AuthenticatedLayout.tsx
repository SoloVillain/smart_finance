import Dropdown from "@/Components/Dropdown";
import { Link, usePage } from "@inertiajs/react";
import { useState, ReactNode } from "react";
import {
    LayoutDashboard,
    User,
    Users,
    LogOut,
    ChevronDown,
    Menu,
    X,
    History,
} from "lucide-react";

type UserType = { id: number; name: string; email: string; role?: string };
type PageProps = { auth: { user: UserType } };
type AuthenticatedLayoutProps = { header?: ReactNode; children: ReactNode };

export default function AuthenticatedLayout({
    header,
    children,
}: AuthenticatedLayoutProps) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;
    const isAdmin = user.role === "admin";
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <style>{`
                /* ── BASE (Scroll Unlocked) ── */
                html, body {
                    min-height: 100vh;
                    overflow-y: auto !important;
                    overflow-x: hidden !important;
                    background: #050a14;
                }

                .auth-layout {
                    font-family: 'DM Sans', sans-serif;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    background: linear-gradient(165deg, #050a14 0%, #0a111f 48%, #0f1b2e 100%);
                    -webkit-font-smoothing: antialiased;
                }

                /* Mengizinkan scrollbar halus */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: #050a14;
                }
                ::-webkit-scrollbar-thumb {
                    background: #1e293b;
                    border-radius: 100px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #334155;
                }

                /* ── NAVBAR ── */
                .auth-nav {
                    position: fixed;
                    top: 0; left: 0; right: 0;
                    z-index: 200;
                    height: 62px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 40px;
                    background: rgba(5,10,20,0.9);
                    backdrop-filter: blur(18px);
                    -webkit-backdrop-filter: blur(18px);
                    border-bottom: 1px solid rgba(255,255,255,0.07);
                }

                /* Logo */
                .auth-nav-logo {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    text-decoration: none;
                    flex-shrink: 0;
                }

                .auth-nav-logo-mark {
                    width: 32px; height: 32px;
                    background: #f0b429;
                    border-radius: 7px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    font-size: 15px;
                    color: #050a14;
                    flex-shrink: 0;
                    line-height: 1;
                }

                .auth-nav-logo-text {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    font-size: 16px;
                    color: #f0f6fc;
                    letter-spacing: -0.01em;
                }
                .auth-nav-logo-text em { color: #f0b429; font-style: normal; }

                /* Center links */
                .auth-nav-links {
                    display: flex;
                    align-items: center;
                    gap: 2px;
                }

                .auth-nav-link {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 13px;
                    border-radius: 7px;
                    font-size: 13px;
                    font-weight: 500;
                    color: #7d8fa8;
                    text-decoration: none;
                    transition: all 0.18s;
                    border: 1px solid transparent;
                    font-family: 'DM Sans', sans-serif;
                    white-space: nowrap;
                    line-height: 1;
                }

                .auth-nav-link:hover {
                    color: #f0f6fc;
                    background: rgba(255,255,255,0.06);
                }

                .auth-nav-link.active {
                    color: #f0b429;
                    background: rgba(240,180,41,0.08);
                    border-color: rgba(240,180,41,0.2);
                    font-weight: 600;
                }

                /* Right section */
                .auth-nav-right {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-shrink: 0;
                }

                /* User button */
                .auth-user-btn {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    padding: 5px 12px 5px 6px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 100px;
                    cursor: pointer;
                    transition: all 0.18s;
                    font-family: 'DM Sans', sans-serif;
                }

                .auth-user-btn:hover {
                    background: rgba(255,255,255,0.08);
                    border-color: rgba(240,180,41,0.3);
                }

                .auth-user-avatar {
                    width: 28px; height: 28px;
                    background: #f0b429;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Syne', sans-serif;
                    font-size: 12px;
                    font-weight: 800;
                    color: #050a14;
                    flex-shrink: 0;
                    line-height: 1;
                }

                .auth-user-name {
                    font-size: 13px;
                    font-weight: 600;
                    color: #c9d6e3;
                    max-width: 120px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                /* ── DROPDOWN & FIX SILAU ── */
                .auth-dd-menu {
                    position: absolute;
                    top: calc(100% + 10px);
                    right: 0;
                    min-width: 220px;
                    background: #0d1420 !important;
                    border: 1px solid rgba(255,255,255,0.13) !important;
                    border-radius: 14px !important;
                    padding: 6px !important;
                    box-shadow: 0 24px 56px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05) !important;
                    z-index: 9999 !important;
                    animation: authDdIn 0.15s ease both;
                    color: #c9d6e3 !important;
                }

                @keyframes authDdIn {
                    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }

                .auth-dd-header {
                    padding: 10px 12px 12px;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    margin-bottom: 4px;
                    background: transparent;
                    pointer-events: none; /* Menghindari trigger hover tak sengaja */
                }

                .auth-dd-name {
                    font-family: 'Syne', sans-serif;
                    font-size: 14px;
                    font-weight: 700;
                    color: #f0f6fc !important;
                    margin-bottom: 2px;
                    display: block;
                }

                .auth-dd-email {
                    font-size: 12px;
                    font-weight: 400;
                    color: #7d8fa8 !important;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    display: block;
                }

                /* Netralkan class pembungkus bawaan Laravel Dropdown.Link agar tidak putih silau */
                .auth-dd-menu a,
                .auth-dd-menu button {
                    background-color: transparent !important;
                    padding: 0 !important;
                }

                .auth-dd-item {
                    display: flex !important;
                    align-items: center !important;
                    gap: 10px !important;
                    padding: 9px 12px !important;
                    border-radius: 9px !important;
                    font-size: 13.5px !important;
                    font-weight: 500 !important;
                    color: #c9d6e3 !important;
                    text-decoration: none !important;
                    transition: all 0.15s ease !important;
                    cursor: pointer !important;
                    width: 100% !important;
                    background: transparent !important;
                    border: none !important;
                    font-family: 'DM Sans', sans-serif !important;
                    text-align: left !important;
                    line-height: 1.4 !important;
                    -webkit-font-smoothing: antialiased !important;
                }

                /* Efek hover baru: Latar belakang gelap transparan & teks emas */
                .auth-dd-menu a:hover .auth-dd-item,
                .auth-dd-menu button:hover .auth-dd-item {
                    color: #fbbf24 !important; /* Warna teks emas */
                    background: rgba(255, 255, 255, 0.05) !important; /* Latar abu-abu transparan tipis */
                }

                .auth-dd-item.is-danger {
                    color: #fca5a5 !important;
                }

                /* Efek hover tombol Logout (is-danger) */
                .auth-dd-menu button:hover .auth-dd-item.is-danger {
                    color: #f87171 !important;
                    background: rgba(248, 113, 113, 0.08) !important;
                }

                .auth-dd-divider {
                    height: 1px;
                    background: rgba(255,255,255,0.08);
                    margin: 4px 0;
                }

                /* ── MOBILE BUTTON ── */
                .auth-mobile-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: #7d8fa8;
                    cursor: pointer;
                    padding: 6px;
                    border-radius: 8px;
                    transition: all 0.18s;
                }
                .auth-mobile-btn:hover { color: #f0f6fc; background: rgba(255,255,255,0.06); }

                /* ── MOBILE MENU ── */
                .auth-mobile-menu {
                    position: fixed;
                    top: 62px; left: 0; right: 0;
                    background: rgba(5,10,20,0.97);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255,255,255,0.07);
                    padding: 16px 20px;
                    z-index: 199;
                    animation: authSlideDown 0.2s ease both;
                }

                @keyframes authSlideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .auth-mobile-user {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px 0 14px;
                    border-bottom: 1px solid rgba(255,255,255,0.07);
                    margin-bottom: 10px;
                }

                .auth-mobile-user-name {
                    font-family: 'Syne', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    color: #f0f6fc;
                }

                .auth-mobile-user-email {
                    font-size: 12px;
                    color: #7d8fa8;
                    margin-top: 1px;
                }

                .auth-mobile-link {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 12px;
                    border-radius: 9px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #8b949e;
                    text-decoration: none;
                    transition: all 0.18s;
                    margin-bottom: 3px;
                    cursor: pointer;
                    width: 100%;
                    background: none;
                    border: none;
                    font-family: 'DM Sans', sans-serif;
                    text-align: left;
                    -webkit-font-smoothing: antialiased;
                }

                .auth-mobile-link:hover { color: #f0f6fc; background: rgba(255,255,255,0.06); }
                .auth-mobile-link.active { color: #f0b429; background: rgba(240,180,41,0.08); font-weight: 600; }
                .auth-mobile-link.is-danger { color: #fca5a5; }
                .auth-mobile-link.is-danger:hover { color: #f87171; background: rgba(248,113,113,0.08); }

                .auth-mobile-sep {
                    height: 1px;
                    background: rgba(255,255,255,0.07);
                    margin: 8px 0;
                }

                /* ── MAIN CONTAINER ── */
                main {
                    padding-top: 62px;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    min-height: 0;
                    overflow-y: visible !important;
                }

                /* ── RESPONSIVE ── */
                @media (max-width: 768px) {
                    .auth-nav-links { display: none; }
                    .auth-mobile-btn { display: flex; }
                    .auth-user-name { display: none; }
                    .auth-nav { padding: 0 16px; }
                }
            `}</style>

            <div className="auth-layout">
                <nav className="auth-nav">
                    {/* Logo */}
                    <Link href="/" className="auth-nav-logo">
                        <div className="auth-nav-logo-mark">S</div>
                        <span className="auth-nav-logo-text">
                            Smart<em>Finance</em>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="auth-nav-links">
                        <Link
                            href={route("dashboard")}
                            className={`auth-nav-link ${route().current("dashboard") ? "active" : ""}`}
                        >
                            <LayoutDashboard size={14} /> Dashboard
                        </Link>

                        {!isAdmin && (
                            <Link
                                href={route("loans.create")}
                                className={`auth-nav-link ${route().current("loans.create") ? "active" : ""}`}
                            >
                                <LayoutDashboard size={14} /> Ajukan Pinjaman
                            </Link>
                        )}

                        {!isAdmin && (
                            <Link
                                href={route("loans.monitoring")}
                                className={`auth-nav-link ${route().current("loans.monitoring") ? "active" : ""}`}
                            >
                                <History size={14} /> Monitoring
                            </Link>
                        )}

                        {isAdmin && route().has("admin.users.index") && (
                            <Link
                                href={route("admin.users.index")}
                                className={`auth-nav-link ${route().current("admin.users.*") ? "active" : ""}`}
                            >
                                <Users size={14} /> Users
                            </Link>
                        )}
                    </div>

                    {/* Right Auth Menu */}
                    <div className="auth-nav-right">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="auth-user-btn">
                                    <div className="auth-user-avatar">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="auth-user-name">
                                        {user.name}
                                    </span>
                                    <ChevronDown size={13} color="#7d8fa8" />
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content
                                align="right"
                                contentClasses="py-0 bg-transparent border-0 shadow-none"
                            >
                                <div className="auth-dd-menu">
                                    {/* Header */}
                                    <div className="auth-dd-header">
                                        <span className="auth-dd-name">
                                            {user.name}
                                        </span>
                                        <span className="auth-dd-email">
                                            {user.email}
                                        </span>
                                    </div>

                                    {/* Profile */}
                                    <Dropdown.Link href={route("profile.edit")}>
                                        <span className="auth-dd-item">
                                            <User size={14} color="#7d8fa8" />
                                            Profile &amp; Settings
                                        </span>
                                    </Dropdown.Link>

                                    <div className="auth-dd-divider" />

                                    {/* Logout */}
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        <span className="auth-dd-item is-danger">
                                            <LogOut size={14} color="#f87171" />
                                            Log Out
                                        </span>
                                    </Dropdown.Link>
                                </div>
                            </Dropdown.Content>
                        </Dropdown>

                        <button
                            className="auth-mobile-btn"
                            onClick={() => setMobileOpen((p) => !p)}
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </nav>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="auth-mobile-menu">
                        <div className="auth-mobile-user">
                            <div
                                className="auth-user-avatar"
                                style={{ width: 38, height: 38, fontSize: 15 }}
                            >
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="auth-mobile-user-name">
                                    {user.name}
                                </div>
                                <div className="auth-mobile-user-email">
                                    {user.email}
                                </div>
                            </div>
                        </div>

                        <Link
                            href={route("dashboard")}
                            className={`auth-mobile-link ${route().current("dashboard") ? "active" : ""}`}
                        >
                            <LayoutDashboard size={15} /> Dashboard
                        </Link>

                        {!isAdmin && (
                            <Link
                                href={route("loans.create")}
                                className={`auth-mobile-link ${route().current("loans.create") ? "active" : ""}`}
                            >
                                <LayoutDashboard size={15} /> Ajukan Pinjaman
                            </Link>
                        )}

                        {!isAdmin && (
                            <Link
                                href={route("loans.monitoring")}
                                className={`auth-mobile-link ${route().current("loans.monitoring") ? "active" : ""}`}
                            >
                                <History size={15} /> Monitoring
                            </Link>
                        )}

                        {isAdmin && (
                            <Link
                                href={route("admin.users.index")}
                                className="auth-mobile-link"
                            >
                                <Users size={15} /> Users
                            </Link>
                        )}

                        <Link
                            href={route("profile.edit")}
                            className="auth-mobile-link"
                        >
                            <User size={15} /> Profile &amp; Settings
                        </Link>

                        <div className="auth-mobile-sep" />

                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="auth-mobile-link is-danger"
                        >
                            <LogOut size={15} /> Log Out
                        </Link>
                    </div>
                )}

                {/* Header sub-menu (if exists) */}
                {header && <div style={{ paddingTop: "62px" }}>{header}</div>}

                {/* Main Content Render Area */}
                <main>{children}</main>
            </div>
        </>
    );
}
