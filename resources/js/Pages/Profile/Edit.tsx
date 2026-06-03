import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { ShieldCheck, User, Activity, Smartphone, ChevronRight, AlertTriangle } from 'lucide-react';

type UserType = { name: string; email: string; };
type PageProps = { auth: { user: UserType } };
type EditProps = { mustVerifyEmail: boolean; status?: string; };
type MenuLinkProps = { label: string; value: string; };

export default function Edit({ mustVerifyEmail, status }: EditProps) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    return (
        <AuthenticatedLayout>
            <Head title="Profile — Smart Finance" />
            <style>{`
                /* ── Reset main padding dari AuthLayout ── */
                main { padding-top: 0 !important; }

                .pf-root {
                    font-family: 'DM Sans', sans-serif;
                    background: linear-gradient(165deg, #050a14 0%, #0a111f 48%, #0f1b2e 100%);
                    min-height: calc(100vh - 62px);
                    padding: 74px 24px 64px;
                    position: relative;
                    overflow-x: hidden;
                    color: #c9d6e3;
                    -webkit-font-smoothing: antialiased;
                }

                .pf-root::before {
                    content: '';
                    position: fixed; inset: 0;
                    background: radial-gradient(ellipse 70% 45% at 50% 0%, rgba(77,159,255,0.07) 0%, transparent 55%);
                    pointer-events: none; z-index: 0;
                }

                .pf-content {
                    position: relative; z-index: 1;
                    max-width: 720px; margin: 0 auto;
                }

                /* ── PAGE TITLE ── */
                .pf-title {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(26px, 3vw, 34px);
                    font-weight: 800;
                    color: #ffffff;
                    letter-spacing: -0.035em;
                    line-height: 1.1;
                    margin-bottom: 6px;
                    animation: pfUp 0.4s ease both;
                }
                .pf-title em { color: #f0b429; font-style: normal; }

                .pf-subtitle {
                    font-size: 13.5px; font-weight: 400;
                    color: #ffffff; margin-bottom: 28px;
                    animation: pfUp 0.4s ease 0.05s both;
                }

                /* ── HERO CARD ── */
                .pf-hero {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.09);
                    border-radius: 16px;
                    padding: 24px 28px;
                    display: flex; align-items: center; gap: 18px;
                    margin-bottom: 14px;
                    position: relative; overflow: hidden;
                    animation: pfUp 0.4s ease 0.08s both;
                }

                .pf-hero::before {
                    content: '';
                    position: absolute; top: 0; left: 0; right: 0; height: 2px;
                    background: linear-gradient(90deg, #f0b429, #38bdf8);
                    border-radius: 16px 16px 0 0;
                }

                .pf-avatar {
                    width: 64px; height: 64px;
                    background: #f0b429;
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Syne', sans-serif;
                    font-size: 24px; font-weight: 800;
                    color: #050a14; flex-shrink: 0;
                    text-transform: uppercase;
                    box-shadow: 0 0 20px rgba(240,180,41,0.25);
                }

                .pf-hero-info { flex: 1; }

                .pf-hero-name {
                    font-family: 'Syne', sans-serif;
                    font-size: 20px; font-weight: 800;
                    color: #f0b429; letter-spacing: -0.02em;
                    margin-bottom: 3px;
                }

                .pf-hero-email { font-size: 13.5px; font-weight: 400; color: #ffffff; }

                .pf-verified {
                    display: flex; align-items: center; gap: 6px;
                    background: rgba(74,222,128,0.07);
                    border: 1px solid rgba(74,222,128,0.2);
                    border-radius: 100px;
                    padding: 6px 14px;
                    font-size: 11px; font-weight: 700;
                    color: #4ade80;
                    text-transform: uppercase; letter-spacing: 0.08em;
                    white-space: nowrap; flex-shrink: 0;
                }

                .pf-verified-dot {
                    width: 6px; height: 6px; border-radius: 50%;
                    background: #4ade80; box-shadow: 0 0 6px #4ade80;
                }

                /* ── SECTION CARD ── */
                .pf-section {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 16px;
                    overflow: hidden;
                    margin-bottom: 14px;
                    transition: border-color 0.2s;
                    animation: pfUp 0.4s ease both;
                }

                .pf-section:nth-child(3) { animation-delay: 0.10s; }
                .pf-section:nth-child(4) { animation-delay: 0.14s; }
                .pf-section:nth-child(5) { animation-delay: 0.18s; }
                .pf-section:nth-child(6) { animation-delay: 0.22s; }

                .pf-section:hover { border-color: rgba(240,180,41,0.15); }

                .pf-section-head {
                    display: flex; align-items: center; gap: 12px;
                    padding: 18px 24px;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                }

                .pf-section-icon {
                    width: 34px; height: 34px; border-radius: 9px;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                }

                .pf-section-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 14.5px; font-weight: 700;
                    color: #f0f6fc; letter-spacing: -0.01em;
                }

                .pf-section-body { padding: 22px 24px; }

                /* ── FORM OVERRIDES — match theme ── */
                .pf-section-body input,
                .pf-section-body select,
                .pf-section-body textarea {
                    background: rgba(0,0,0,0.25) !important;
                    border: 1px solid rgba(255,255,255,0.1) !important;
                    color: #f0f6fc !important;
                    border-radius: 10px !important;
                    font-family: 'DM Sans', sans-serif !important;
                    font-size: 14px !important;
                    transition: border-color 0.18s, box-shadow 0.18s !important;
                }

                .pf-section-body input:focus,
                .pf-section-body select:focus,
                .pf-section-body textarea:focus {
                    border-color: #f0b429 !important;
                    background: rgba(0,0,0,0.3) !important;
                    box-shadow: 0 0 0 3px rgba(240,180,41,0.12) !important;
                    outline: none !important;
                }

                .pf-section-body input::placeholder,
                .pf-section-body textarea::placeholder {
                    color: #475569 !important;
                }

                .pf-section-body label {
                    color: #94a3b8 !important;
                    font-size: 11px !important;
                    font-weight: 700 !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.09em !important;
                    font-family: 'DM Sans', sans-serif !important;
                }

                /* Paragraph text inside forms */
                .pf-section-body p {
                    color: #94a3b8 !important;
                    font-size: 13.5px !important;
                    line-height: 1.65 !important;
                }

                /* Save/submit buttons → amber */
                .pf-section-body button[type="submit"] {
                    background: #f0b429 !important;
                    color: #050a14 !important;
                    border: none !important;
                    border-radius: 10px !important;
                    font-family: 'Syne', sans-serif !important;
                    font-weight: 800 !important;
                    font-size: 14px !important;
                    padding: 10px 22px !important;
                    transition: all 0.2s !important;
                    box-shadow: none !important;
                    cursor: pointer !important;
                }
                .pf-section-body button[type="submit"]:hover {
                    background: #f5c842 !important;
                    transform: translateY(-1px) !important;
                    box-shadow: 0 6px 18px rgba(240,180,41,0.28) !important;
                }
                .pf-section-body button[type="submit"]:disabled {
                    opacity: 0.5 !important;
                    cursor: not-allowed !important;
                    transform: none !important;
                }

                /* Success/info text */
                .pf-section-body .text-green-600,
                .pf-section-body .text-green-500 {
                    color: #4ade80 !important;
                }

                /* ── KYC ROW ── */
                .pf-kyc-row {
                    display: flex; justify-content: space-between; align-items: center;
                    cursor: pointer; transition: all 0.18s; padding: 4px 0;
                }
                .pf-kyc-label { font-size: 14px; font-weight: 600; color: #c9d6e3; }
                .pf-kyc-right { display: flex; align-items: center; gap: 10px; }
                .pf-kyc-badge {
                    display: flex; align-items: center; gap: 5px;
                    background: rgba(74,222,128,0.07);
                    border: 1px solid rgba(74,222,128,0.2);
                    border-radius: 100px;
                    padding: 4px 12px;
                    font-size: 10px; font-weight: 700;
                    color: #4ade80;
                    text-transform: uppercase; letter-spacing: 0.08em;
                }
                .pf-kyc-chevron { color: #475569; transition: color 0.18s; }
                .pf-kyc-row:hover .pf-kyc-chevron { color: #f0b429; }

                /* ── MENU LINKS ── */
                .pf-menu-link {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 15px 24px;
                    border-top: 1px solid rgba(255,255,255,0.05);
                    cursor: pointer; transition: background 0.18s;
                }
                .pf-menu-link:first-child { border-top: none; }
                .pf-menu-link:hover { background: rgba(255,255,255,0.02); }
                .pf-menu-label { font-size: 14px; font-weight: 500; color: #94a3b8; transition: color 0.18s; }
                .pf-menu-link:hover .pf-menu-label { color: #c9d6e3; }
                .pf-menu-right { display: flex; align-items: center; gap: 9px; }
                .pf-menu-value { font-size: 13px; font-weight: 500; color: #475569; }
                .pf-menu-chevron { color: #334155; transition: color 0.18s; }
                .pf-menu-link:hover .pf-menu-chevron { color: #f0b429; }

                /* ── DANGER CARD ── */
                .pf-danger {
                    background: rgba(248,113,113,0.04);
                    border: 1px solid rgba(248,113,113,0.15);
                    border-radius: 16px;
                    overflow: hidden;
                    margin-bottom: 14px;
                    animation: pfUp 0.4s ease 0.26s both;
                }

                .pf-danger-head {
                    display: flex; align-items: center; gap: 12px;
                    padding: 18px 24px;
                    border-bottom: 1px solid rgba(248,113,113,0.1);
                }

                .pf-danger-icon {
                    width: 34px; height: 34px;
                    background: rgba(248,113,113,0.1);
                    border-radius: 9px;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }

                .pf-danger-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 14.5px; font-weight: 700;
                    color: #f87171;
                }

                .pf-danger-body { padding: 22px 24px; }

                /* Override danger body text */
                .pf-danger-body p { color: #94a3b8 !important; font-size: 13.5px !important; line-height: 1.65 !important; }
                .pf-danger-body label { color: #94a3b8 !important; font-size: 11px !important; font-weight: 700 !important; text-transform: uppercase !important; letter-spacing: 0.09em !important; }
                .pf-danger-body input {
                    background: rgba(0,0,0,0.25) !important;
                    border: 1px solid rgba(255,255,255,0.1) !important;
                    color: #f0f6fc !important;
                    border-radius: 10px !important;
                    font-family: 'DM Sans', sans-serif !important;
                    font-size: 14px !important;
                }
                .pf-danger-body input:focus {
                    border-color: #f87171 !important;
                    box-shadow: 0 0 0 3px rgba(248,113,113,0.12) !important;
                    outline: none !important;
                }
                .pf-danger-body button[type="submit"] {
                    background: rgba(248,113,113,0.1) !important;
                    border: 1px solid rgba(248,113,113,0.3) !important;
                    color: #f87171 !important;
                    border-radius: 10px !important;
                    font-family: 'Syne', sans-serif !important;
                    font-weight: 700 !important;
                    font-size: 14px !important;
                    padding: 10px 22px !important;
                    transition: all 0.2s !important;
                    cursor: pointer !important;
                }
                .pf-danger-body button[type="submit"]:hover {
                    background: rgba(248,113,113,0.18) !important;
                    border-color: rgba(248,113,113,0.5) !important;
                }

                /* ── MODAL overrides (DeleteUserForm modal) ── */
                .pf-danger-body dialog,
                .pf-danger-body [role="dialog"] {
                    background: #0d1420 !important;
                    border: 1px solid rgba(255,255,255,0.12) !important;
                    border-radius: 16px !important;
                }

                @keyframes pfUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 640px) {
                    .pf-root { padding: 20px 16px 48px; }
                    .pf-hero { flex-direction: column; align-items: flex-start; gap: 14px; }
                    .pf-verified { align-self: flex-start; }
                }
            `}</style>

            <div className="pf-root">
                <div className="pf-content">

                    {/* Title */}
                    <div className="pf-title">
                        Profile &amp; <em>Settings</em>
                    </div>
                    <div className="pf-subtitle">
                        Kelola informasi akun, keamanan, dan preferensi Anda.
                    </div>

                    {/* Hero */}
                    <div className="pf-hero">
                        <div className="pf-avatar">{user.name.charAt(0)}</div>
                        <div className="pf-hero-info">
                            <div className="pf-hero-name">{user.name}</div>
                            <div className="pf-hero-email">{user.email}</div>
                        </div>
                        <div className="pf-verified">
                            <div className="pf-verified-dot" />
                            KYC Verified
                        </div>
                    </div>

                    {/* Informasi Dasar */}
                    <div className="pf-section">
                        <div className="pf-section-head">
                            <div className="pf-section-icon" style={{ background: 'rgba(240,180,41,0.1)', border: '1px solid rgba(240,180,41,0.2)' }}>
                                <User size={16} color="#f0b429" />
                            </div>
                            <div className="pf-section-title">Informasi Dasar</div>
                        </div>
                        <div className="pf-section-body">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                    </div>

                    {/* Keamanan Akun */}
                    <div className="pf-section">
                        <div className="pf-section-head">
                            <div className="pf-section-icon" style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)' }}>
                                <ShieldCheck size={16} color="#38bdf8" />
                            </div>
                            <div className="pf-section-title">Keamanan Akun</div>
                        </div>
                        <div className="pf-section-body">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>

                    {/* Verifikasi Identitas */}
                    <div className="pf-section">
                        <div className="pf-section-head">
                            <div className="pf-section-icon" style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
                                <Activity size={16} color="#4ade80" />
                            </div>
                            <div className="pf-section-title">Verifikasi Identitas</div>
                        </div>
                        <div className="pf-section-body">
                            <div className="pf-kyc-row">
                                <span className="pf-kyc-label">KYC (Know Your Customer)</span>
                                <div className="pf-kyc-right">
                                    <div className="pf-kyc-badge">
                                        <div className="pf-verified-dot" />
                                        Verified
                                    </div>
                                    <ChevronRight size={15} className="pf-kyc-chevron" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pengaturan Aplikasi */}
                    <div className="pf-section">
                        <div className="pf-section-head">
                            <div className="pf-section-icon" style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)' }}>
                                <Smartphone size={16} color="#a78bfa" />
                            </div>
                            <div className="pf-section-title">Pengaturan Aplikasi</div>
                        </div>
                        <MenuLink label="Tema" value="Dark Mode" />
                        <MenuLink label="Bahasa" value="Indonesia" />
                        <MenuLink label="Notifikasi" value="Aktif" />
                    </div>

                    {/* Danger Zone */}
                    <div className="pf-danger">
                        <div className="pf-danger-head">
                            <div className="pf-danger-icon">
                                <AlertTriangle size={16} color="#f87171" />
                            </div>
                            <div className="pf-danger-title">Zona Bahaya</div>
                        </div>
                        <div className="pf-danger-body">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function MenuLink({ label, value }: MenuLinkProps) {
    return (
        <div className="pf-menu-link">
            <span className="pf-menu-label">{label}</span>
            <div className="pf-menu-right">
                <span className="pf-menu-value">{value}</span>
                <ChevronRight size={14} className="pf-menu-chevron" />
            </div>
        </div>
    );
}
