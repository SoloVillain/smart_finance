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
} from "lucide-react";

type UserType = {
    id: number;
    name: string;
    email: string;
    role?: string;
};

type PageProps = {
    auth: {
        user: UserType;
    };
};

type AuthenticatedLayoutProps = {
    header?: ReactNode;
    children: ReactNode;
};

export default function AuthenticatedLayout({
    header,
    children,
}: AuthenticatedLayoutProps) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <>
            <style>{`
                .auth-layout {
                    font-family: 'DM Sans', sans-serif;
                    min-height: 100vh;
                    background: #020617;
                }

                .sf-display { font-family: 'Syne', sans-serif; }

                .auth-nav {
                    position: fixed;
                    top: 0; left: 0; right: 0;
                    z-index: 100;
                    padding: 0 32px;
                    height: 64px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(2,6,23,0.8);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                }

                .nav-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                }

                .nav-logo-icon {
                    width: 36px; height: 36px;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    border-radius: 9px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 16px;
                    color: white;
                    font-family: 'Syne', sans-serif;
                    box-shadow: 0 0 16px rgba(59,130,246,0.35);
                }

                .nav-logo-text {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    font-size: 17px;
                    color: white;
                }
                .nav-logo-text span { color: #60a5fa; }

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    padding: 7px 14px;
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 500;
                    color: #64748b;
                    text-decoration: none;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                }

                .nav-link:hover {
                    color: white;
                    background: rgba(255,255,255,0.05);
                }

                .nav-link.active {
                    color: #60a5fa;
                    background: rgba(59,130,246,0.08);
                    border-color: rgba(59,130,246,0.15);
                }

                .nav-right {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .user-btn {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 6px 14px 6px 8px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 100px;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: 'DM Sans', sans-serif;
                }

                .user-btn:hover {
                    background: rgba(255,255,255,0.07);
                    border-color: rgba(255,255,255,0.12);
                }

                .user-avatar {
                    width: 30px; height: 30px;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Syne', sans-serif;
                    font-size: 13px;
                    font-weight: 700;
                    color: white;
                    flex-shrink: 0;
                }

                .user-name {
                    font-size: 13px;
                    font-weight: 500;
                    color: #e2e8f0;
                    max-width: 120px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .user-chevron { color: #475569; transition: transform 0.2s; }

                .dropdown-menu {
                    position: absolute;
                    top: calc(100% + 8px);
                    right: 0;
                    background: #0f172a;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 16px;
                    padding: 8px;
                    min-width: 200px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                    z-index: 200;
                    animation: dropIn 0.15s ease both;
                }

                @keyframes dropIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .dropdown-user-info {
                    padding: 10px 12px 12px;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    margin-bottom: 6px;
                }

                .dropdown-user-name {
                    font-family: 'Syne', sans-serif;
                    font-size: 14px;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 2px;
                }

                .dropdown-user-email {
                    font-size: 12px;
                    color: #475569;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .dropdown-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 9px 12px;
                    border-radius: 10px;
                    font-size: 13px;
                    font-weight: 500;
                    color: #64748b;
                    text-decoration: none;
                    transition: all 0.15s;
                    cursor: pointer;
                    width: 100%;
                    background: none;
                    border: none;
                    font-family: 'DM Sans', sans-serif;
                    text-align: left;
                }

                .dropdown-item:hover {
                    color: white;
                    background: rgba(255,255,255,0.05);
                }

                .dropdown-item.danger:hover {
                    color: #f87171;
                    background: rgba(248,113,113,0.08);
                }

                .dropdown-divider {
                    height: 1px;
                    background: rgba(255,255,255,0.06);
                    margin: 6px 0;
                }

                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: #64748b;
                    cursor: pointer;
                    padding: 6px;
                    border-radius: 8px;
                    transition: all 0.2s;
                }

                .mobile-menu-btn:hover { color: white; background: rgba(255,255,255,0.05); }

                .mobile-menu {
                    position: fixed;
                    top: 64px;
                    left: 0; right: 0;
                    background: rgba(2,6,23,0.95);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    padding: 16px 24px;
                    z-index: 99;
                    animation: slideDown 0.2s ease both;
                }

                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .mobile-user-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    margin-bottom: 12px;
                }

                .mobile-user-details .mobile-user-name {
                    font-family: 'Syne', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    color: white;
                }

                .mobile-user-details .mobile-user-email {
                    font-size: 12px;
                    color: #475569;
                }

                .mobile-nav-link {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 12px;
                    border-radius: 10px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #64748b;
                    text-decoration: none;
                    transition: all 0.2s;
                    margin-bottom: 4px;
                    cursor: pointer;
                    width: 100%;
                    background: none;
                    border: none;
                    font-family: 'DM Sans', sans-serif;
                    text-align: left;
                }

                .mobile-nav-link:hover { color: white; background: rgba(255,255,255,0.05); }
                .mobile-nav-link.active { color: #60a5fa; background: rgba(59,130,246,0.08); }
                .mobile-nav-link.danger:hover { color: #f87171; }

                .auth-header-bar {
                    padding: 16px 32px;
                    background: rgba(15,23,42,0.5);
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                    backdrop-filter: blur(10px);
                }

                .auth-main { padding-top: 64px; }

                .dropdown-wrapper { position: relative; }

                @media (max-width: 768px) {
                    .nav-links { display: none; }
                    .mobile-menu-btn { display: flex; }
                    .user-btn .user-name { display: none; }
                    .auth-nav { padding: 0 16px; }
                }
            `}</style>

            <div className="auth-layout">
                <nav className="auth-nav">
                    <Link href="/" className="nav-logo">
                        <div className="nav-logo-icon">S</div>
                        <span className="nav-logo-text sf-display">
                            Smart<span>Finance.</span>
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="nav-links">
                        <Link
                            href={route("dashboard")}
                            className={`nav-link ${route().current("dashboard") ? "active" : ""}`}
                        >
                            <LayoutDashboard size={15} />
                            Dashboard
                        </Link>

                        {user.role === "admin" && (
                            <Link
                                href={route("admin.users.index")}
                                className={`nav-link ${route().current("admin.users.*") ? "active" : ""}`}
                            >
                                <Users size={15} />
                                Users
                            </Link>
                        )}
                    </div>

                    <div className="nav-right">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    className="user-btn"
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="user-avatar">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="user-name">
                                        {user.name}
                                    </span>
                                    <ChevronDown
                                        size={14}
                                        className="user-chevron"
                                    />
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content
                                align="right"
                                contentClasses="py-0 bg-transparent"
                            >
                                <div className="dropdown-menu">
                                    <div className="dropdown-user-info">
                                        <div className="dropdown-user-name">
                                            {user.name}
                                        </div>
                                        <div className="dropdown-user-email">
                                            {user.email}
                                        </div>
                                    </div>

                                    <Dropdown.Link href={route("profile.edit")}>
                                        <span className="dropdown-item">
                                            <User size={14} />
                                            Profile & Settings
                                        </span>
                                    </Dropdown.Link>

                                    <div className="dropdown-divider" />

                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        <span className="dropdown-item danger">
                                            <LogOut size={14} />
                                            Log Out
                                        </span>
                                    </Dropdown.Link>
                                </div>
                            </Dropdown.Content>
                        </Dropdown>

                        <button
                            className="mobile-menu-btn"
                            onClick={() =>
                                setShowingNavigationDropdown((prev) => !prev)
                            }
                        >
                            {showingNavigationDropdown ? (
                                <X size={20} />
                            ) : (
                                <Menu size={20} />
                            )}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {showingNavigationDropdown && (
                    <div className="mobile-menu">
                        <div className="mobile-user-info">
                            <div
                                className="user-avatar"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    fontSize: "16px",
                                }}
                            >
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="mobile-user-details">
                                <div className="mobile-user-name">
                                    {user.name}
                                </div>
                                <div className="mobile-user-email">
                                    {user.email}
                                </div>
                            </div>
                        </div>

                        <Link
                            href={route("dashboard")}
                            className={`mobile-nav-link ${route().current("dashboard") ? "active" : ""}`}
                        >
                            <LayoutDashboard size={16} /> Dashboard
                        </Link>

                        {user.role === "admin" && (
                            <Link
                                href={route("admin.users.index")}
                                className={`mobile-nav-link ${route().current("admin.users.*") ? "active" : ""}`}
                            >
                                <Users size={16} /> Users
                            </Link>
                        )}

                        <Link
                            href={route("profile.edit")}
                            className="mobile-nav-link"
                        >
                            <User size={16} /> Profile & Settings
                        </Link>

                        <div
                            style={{
                                height: "1px",
                                background: "rgba(255,255,255,0.06)",
                                margin: "8px 0",
                            }}
                        />

                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="mobile-nav-link danger"
                        >
                            <LogOut size={16} /> Log Out
                        </Link>
                    </div>
                )}

                {header && (
                    <div className="auth-main">
                        <div className="auth-header-bar">{header}</div>
                    </div>
                )}

                <main className={header ? "" : "auth-main"}>{children}</main>
            </div>
        </>
    );
}
