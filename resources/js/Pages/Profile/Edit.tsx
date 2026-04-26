import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { ShieldCheck, User, Activity, Smartphone, ChevronRight, AlertTriangle } from 'lucide-react';

type UserType = {
    name: string;
    email: string;
};

type PageProps = {
    auth: {
        user: UserType;
    };
};

type EditProps = {
    mustVerifyEmail: boolean;
    status?: string;
};

type MenuLinkProps = {
    label: string;
    value: string;
};

export default function Edit({ mustVerifyEmail, status }: EditProps) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    return (
        <AuthenticatedLayout>
            <Head title="Settings" />
            <style>{`
                
                .profile-root {
                    font-family: 'DM Sans', sans-serif;
                    background: #020617;
                    min-height: 100vh;
                    padding: 88px 24px 60px;
                    position: relative;
                    overflow-x: hidden;
                }

                .sf-display { font-family: 'Syne', sans-serif; }

                .profile-bg-orb {
                    position: fixed;
                    border-radius: 50%;
                    filter: blur(100px);
                    pointer-events: none;
                    z-index: 0;
                }
                .profile-bg-orb-1 { width: 500px; height: 500px; background: rgba(59,130,246,0.07); top: -100px; right: -100px; }
                .profile-bg-orb-2 { width: 400px; height: 400px; background: rgba(99,102,241,0.05); bottom: 0; left: -100px; }

                .profile-grid-pattern {
                    position: fixed;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
                    background-size: 60px 60px;
                    pointer-events: none;
                    z-index: 0;
                }

                .profile-content {
                    position: relative;
                    z-index: 10;
                    max-width: 760px;
                    margin: 0 auto;
                }

                /* Page title */
                .profile-page-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 32px;
                    font-weight: 800;
                    color: white;
                    margin-bottom: 28px;
                    animation: fadeSlideUp 0.4s ease both;
                }

                .profile-page-title span {
                    background: linear-gradient(135deg, #60a5fa, #818cf8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                /* Profile hero card */
                .profile-hero {
                    background: linear-gradient(135deg, #0f172a, #1e293b);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 24px;
                    padding: 28px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 16px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);
                    position: relative;
                    overflow: hidden;
                    animation: fadeSlideUp 0.4s ease 0.05s both;
                }

                .profile-hero::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(59,130,246,0.06) 0%, transparent 60%);
                    pointer-events: none;
                }

                .profile-avatar {
                    width: 72px; height: 72px;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Syne', sans-serif;
                    font-size: 28px;
                    font-weight: 800;
                    color: white;
                    flex-shrink: 0;
                    box-shadow: 0 0 24px rgba(59,130,246,0.35);
                    text-transform: uppercase;
                }

                .profile-info { flex: 1; }

                .profile-name {
                    font-family: 'Syne', sans-serif;
                    font-size: 22px;
                    font-weight: 800;
                    color: white;
                    margin-bottom: 4px;
                }

                .profile-email { font-size: 14px; color: #475569; }

                .profile-badge {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(52,211,153,0.08);
                    border: 1px solid rgba(52,211,153,0.2);
                    border-radius: 100px;
                    padding: 6px 14px;
                    font-size: 11px;
                    font-weight: 700;
                    color: #34d399;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    white-space: nowrap;
                }

                .badge-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #34d399;
                    box-shadow: 0 0 6px #34d399;
                }

                /* Section cards */
                .section-card {
                    background: rgba(15,23,42,0.7);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 20px;
                    overflow: hidden;
                    backdrop-filter: blur(10px);
                    margin-bottom: 16px;
                    animation: fadeSlideUp 0.4s ease both;
                }

                .section-card:nth-child(3) { animation-delay: 0.1s; }
                .section-card:nth-child(4) { animation-delay: 0.15s; }
                .section-card:nth-child(5) { animation-delay: 0.2s; }
                .section-card:nth-child(6) { animation-delay: 0.25s; }

                .section-card:hover {
                    border-color: rgba(59,130,246,0.15);
                }

                .section-card-header {
                    padding: 20px 24px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .section-icon {
                    width: 36px; height: 36px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .section-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    color: white;
                }

                .section-body { padding: 24px; }

                /* Override form styles for dark theme */
                .section-body input,
                .section-body select {
                    background: rgba(255,255,255,0.04) !important;
                    border-color: rgba(255,255,255,0.08) !important;
                    color: white !important;
                    border-radius: 10px !important;
                    font-family: 'DM Sans', sans-serif !important;
                }

                .section-body input:focus,
                .section-body select:focus {
                    border-color: rgba(59,130,246,0.5) !important;
                    background: rgba(59,130,246,0.05) !important;
                    box-shadow: 0 0 0 3px rgba(59,130,246,0.1) !important;
                    outline: none !important;
                }

                .section-body input::placeholder { color: #334155 !important; }

                .section-body label {
                    color: #64748b !important;
                    font-size: 12px !important;
                    font-weight: 600 !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.08em !important;
                }

                .section-body button[type="submit"],
                .section-body button.btn-primary {
                    background: linear-gradient(135deg, #3b82f6, #6366f1) !important;
                    border: none !important;
                    border-radius: 10px !important;
                    font-family: 'Syne', sans-serif !important;
                    font-weight: 700 !important;
                    box-shadow: 0 6px 20px rgba(59,130,246,0.3) !important;
                    transition: all 0.3s !important;
                }

                .section-body button[type="submit"]:hover {
                    transform: translateY(-1px) !important;
                    box-shadow: 0 10px 28px rgba(59,130,246,0.45) !important;
                }

                /* KYC row */
                .kyc-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    padding: 4px 0;
                }

                .kyc-label {
                    font-size: 14px;
                    font-weight: 600;
                    color: #94a3b8;
                }

                .kyc-right { display: flex; align-items: center; gap: 10px; }

                .kyc-badge {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    background: rgba(52,211,153,0.08);
                    border: 1px solid rgba(52,211,153,0.2);
                    border-radius: 100px;
                    padding: 4px 12px;
                    font-size: 10px;
                    font-weight: 700;
                    color: #34d399;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                }

                .kyc-chevron { color: #334155; transition: color 0.2s; }
                .kyc-row:hover .kyc-chevron { color: #60a5fa; }

                /* Menu links */
                .menu-link {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 24px;
                    border-top: 1px solid rgba(255,255,255,0.04);
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .menu-link:first-child { border-top: none; }
                .menu-link:hover { background: rgba(255,255,255,0.02); }

                .menu-link-label {
                    font-size: 14px;
                    font-weight: 500;
                    color: #64748b;
                }

                .menu-link-right { display: flex; align-items: center; gap: 10px; }

                .menu-link-value {
                    font-size: 13px;
                    color: #334155;
                }

                .menu-link-chevron { color: #1e293b; transition: color 0.2s; }
                .menu-link:hover .menu-link-chevron { color: #60a5fa; }
                .menu-link:hover .menu-link-label { color: #94a3b8; }

                /* Danger zone */
                .danger-card {
                    background: rgba(239,68,68,0.05);
                    border: 1px solid rgba(239,68,68,0.15);
                    border-radius: 20px;
                    padding: 24px;
                    margin-bottom: 16px;
                    animation: fadeSlideUp 0.4s ease 0.3s both;
                }

                .danger-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                }

                .danger-icon {
                    width: 36px; height: 36px;
                    background: rgba(239,68,68,0.1);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .danger-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    color: #f87171;
                }

                /* Override danger zone button */
                .danger-card button[type="submit"],
                .danger-card button.btn-danger {
                    background: rgba(239,68,68,0.1) !important;
                    border: 1px solid rgba(239,68,68,0.3) !important;
                    color: #f87171 !important;
                    border-radius: 10px !important;
                    font-family: 'Syne', sans-serif !important;
                    font-weight: 700 !important;
                    transition: all 0.2s !important;
                }

                .danger-card button[type="submit"]:hover {
                    background: rgba(239,68,68,0.15) !important;
                    border-color: rgba(239,68,68,0.5) !important;
                }

                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div className="profile-root">
                <div className="profile-bg-orb profile-bg-orb-1" />
                <div className="profile-bg-orb profile-bg-orb-2" />
                <div className="profile-grid-pattern" />

                <div className="profile-content">
                    <div className="profile-page-title sf-display">
                        Pro<span>file.</span>
                    </div>

                    {/* Hero */}
                    <div className="profile-hero">
                        <div className="profile-avatar">
                            {user.name.charAt(0)}
                        </div>
                        <div className="profile-info">
                            <div className="profile-name">{user.name}</div>
                            <div className="profile-email">{user.email}</div>
                        </div>
                        <div className="profile-badge">
                            <div className="badge-dot" />
                            KYC Verified
                        </div>
                    </div>

                    {/* Keamanan Akun */}
                    <div className="section-card">
                        <div className="section-card-header">
                            <div className="section-icon" style={{ background: 'rgba(59,130,246,0.1)' }}>
                                <ShieldCheck size={18} color="#60a5fa" />
                            </div>
                            <div className="section-title">Keamanan Akun</div>
                        </div>
                        <div className="section-body">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>

                    {/* Verifikasi Identitas */}
                    <div className="section-card">
                        <div className="section-card-header">
                            <div className="section-icon" style={{ background: 'rgba(52,211,153,0.1)' }}>
                                <User size={18} color="#34d399" />
                            </div>
                            <div className="section-title">Verifikasi Identitas</div>
                        </div>
                        <div className="section-body">
                            <div className="kyc-row">
                                <span className="kyc-label">KYC (Know Your Customer)</span>
                                <div className="kyc-right">
                                    <div className="kyc-badge">
                                        <div className="badge-dot" />
                                        Verified
                                    </div>
                                    <ChevronRight size={16} className="kyc-chevron" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Informasi Dasar */}
                    <div className="section-card">
                        <div className="section-card-header">
                            <div className="section-icon" style={{ background: 'rgba(167,139,250,0.1)' }}>
                                <Activity size={18} color="#a78bfa" />
                            </div>
                            <div className="section-title">Informasi Dasar</div>
                        </div>
                        <div className="section-body">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                    </div>

                    {/* Pengaturan Aplikasi */}
                    <div className="section-card">
                        <div className="section-card-header">
                            <div className="section-icon" style={{ background: 'rgba(251,191,36,0.1)' }}>
                                <Smartphone size={18} color="#fbbf24" />
                            </div>
                            <div className="section-title">Pengaturan Aplikasi</div>
                        </div>
                        <MenuLink label="Tema" value="Dark Mode" />
                        <MenuLink label="Bahasa" value="Indonesia" />
                        <MenuLink label="Notifikasi" value="Aktif" />
                    </div>

                    {/* Danger Zone */}
                    <div className="danger-card">
                        <div className="danger-header">
                            <div className="danger-icon">
                                <AlertTriangle size={18} color="#f87171" />
                            </div>
                            <div className="danger-title">Zona Bahaya</div>
                        </div>
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function MenuLink({ label, value }: MenuLinkProps) {
    return (
        <div className="menu-link">
            <span className="menu-link-label">{label}</span>
            <div className="menu-link-right">
                <span className="menu-link-value">{value}</span>
                <ChevronRight size={15} className="menu-link-chevron" />
            </div>
        </div>
    );
}
