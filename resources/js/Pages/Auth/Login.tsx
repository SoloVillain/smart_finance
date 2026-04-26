import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { Lock, Mail, Eye, EyeOff, Sparkles, TrendingUp, Shield } from "lucide-react";
import { useState } from "react";

type LoginProps = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Log in - Smart Finance" />
            <style>{`
                
                * { box-sizing: border-box; margin: 0; padding: 0; }

                .login-root {
                    font-family: 'DM Sans', sans-serif;
                    background: #020617;
                    min-height: 100vh;
                    display: flex;
                    position: relative;
                    overflow: hidden;
                }

                .sf-display { font-family: 'Syne', sans-serif; }

                /* Background effects */
                .bg-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    pointer-events: none;
                    animation: floatOrb 10s ease-in-out infinite;
                }
                .bg-orb-1 { width: 500px; height: 500px; background: rgba(59,130,246,0.12); top: -150px; left: -100px; animation-delay: 0s; }
                .bg-orb-2 { width: 350px; height: 350px; background: rgba(99,102,241,0.1); bottom: -100px; right: 30%; animation-delay: -5s; }
                .bg-orb-3 { width: 250px; height: 250px; background: rgba(16,185,129,0.07); top: 40%; right: -50px; animation-delay: -3s; }

                @keyframes floatOrb {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(20px, -20px); }
                }

                .grid-pattern {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
                    background-size: 60px 60px;
                    pointer-events: none;
                }

                /* Left panel */
                .left-panel {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 60px;
                    position: relative;
                    z-index: 10;
                }

                .logo-wrap {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 60px;
                    text-decoration: none;
                }

                .logo-icon {
                    width: 38px; height: 38px;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 18px;
                    color: white;
                    font-family: 'Syne', sans-serif;
                    box-shadow: 0 0 20px rgba(59,130,246,0.4);
                }

                .logo-text {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    font-size: 18px;
                    color: white;
                }
                .logo-text span { color: #60a5fa; }

                .left-title {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(36px, 4vw, 52px);
                    font-weight: 800;
                    color: white;
                    line-height: 1.1;
                    margin-bottom: 20px;
                }

                .left-title .accent {
                    background: linear-gradient(135deg, #60a5fa, #818cf8, #34d399);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .left-desc {
                    font-size: 16px;
                    color: #64748b;
                    font-weight: 300;
                    line-height: 1.7;
                    margin-bottom: 48px;
                    max-width: 400px;
                }

                /* Stats */
                .stat-cards {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    max-width: 380px;
                }

                .stat-card {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    background: rgba(15,23,42,0.7);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px;
                    padding: 16px 20px;
                    backdrop-filter: blur(10px);
                    animation: fadeSlideUp 0.5s ease both;
                }

                .stat-card:nth-child(1) { animation-delay: 0.1s; }
                .stat-card:nth-child(2) { animation-delay: 0.2s; }
                .stat-card:nth-child(3) { animation-delay: 0.3s; }

                .stat-icon {
                    width: 40px; height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .stat-info { flex: 1; }
                .stat-val {
                    font-family: 'Syne', sans-serif;
                    font-size: 18px;
                    font-weight: 700;
                    color: white;
                    line-height: 1;
                    margin-bottom: 3px;
                }
                .stat-lbl { font-size: 12px; color: #475569; }

                /* Right panel / Form */
                .right-panel {
                    width: 480px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px;
                    position: relative;
                    z-index: 10;
                }

                .form-card {
                    width: 100%;
                    background: rgba(15,23,42,0.8);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 28px;
                    padding: 40px;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
                    animation: fadeSlideUp 0.6s ease both;
                }

                .form-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 26px;
                    font-weight: 800;
                    color: white;
                    margin-bottom: 6px;
                }

                .form-sub {
                    font-size: 14px;
                    color: #64748b;
                    margin-bottom: 32px;
                }

                .form-sub a {
                    color: #60a5fa;
                    text-decoration: none;
                    font-weight: 500;
                }

                .form-sub a:hover { text-decoration: underline; }

                .field-wrap { margin-bottom: 20px; }

                .field-label {
                    display: block;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #475569;
                    margin-bottom: 8px;
                }

                .field-input-wrap {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .field-icon {
                    position: absolute;
                    left: 14px;
                    color: #334155;
                    pointer-events: none;
                    display: flex;
                }

                .field-input {
                    width: 100%;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    padding: 12px 14px 12px 42px;
                    font-size: 14px;
                    color: white;
                    font-family: 'DM Sans', sans-serif;
                    transition: all 0.2s;
                    outline: none;
                }

                .field-input::placeholder { color: #334155; }

                .field-input:focus {
                    border-color: rgba(59,130,246,0.5);
                    background: rgba(59,130,246,0.05);
                    box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
                }

                .field-eye {
                    position: absolute;
                    right: 14px;
                    background: none;
                    border: none;
                    color: #334155;
                    cursor: pointer;
                    display: flex;
                    padding: 0;
                    transition: color 0.2s;
                }
                .field-eye:hover { color: #94a3b8; }

                .field-error {
                    font-size: 12px;
                    color: #f87171;
                    margin-top: 6px;
                    margin-left: 2px;
                }

                .remember-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 28px;
                }

                .remember-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 13px;
                    color: #64748b;
                    cursor: pointer;
                }

                .remember-label input[type="checkbox"] {
                    width: 16px; height: 16px;
                    accent-color: #3b82f6;
                    cursor: pointer;
                }

                .forgot-link {
                    font-size: 13px;
                    color: #60a5fa;
                    text-decoration: none;
                    font-weight: 500;
                }
                .forgot-link:hover { text-decoration: underline; }

                .submit-btn {
                    width: 100%;
                    padding: 14px;
                    background: linear-gradient(135deg, #3b82f6, #6366f1);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-family: 'Syne', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 8px 25px rgba(59,130,246,0.35);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    letter-spacing: 0.02em;
                }

                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 35px rgba(59,130,246,0.5);
                }

                .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

                .divider {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin: 24px 0;
                }

                .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
                .divider-text { font-size: 12px; color: #334155; }

                .register-row {
                    text-align: center;
                    font-size: 13px;
                    color: #475569;
                }

                .register-row a {
                    color: #60a5fa;
                    font-weight: 600;
                    text-decoration: none;
                }
                .register-row a:hover { text-decoration: underline; }

                .status-msg {
                    background: rgba(52,211,153,0.1);
                    border: 1px solid rgba(52,211,153,0.2);
                    border-radius: 10px;
                    padding: 12px 16px;
                    font-size: 13px;
                    color: #34d399;
                    margin-bottom: 20px;
                }

                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 900px) {
                    .left-panel { display: none; }
                    .right-panel { width: 100%; padding: 24px; }
                    .login-root { justify-content: center; }
                }
            `}</style>

            <div className="login-root">
                <div className="bg-orb bg-orb-1" />
                <div className="bg-orb bg-orb-2" />
                <div className="bg-orb bg-orb-3" />
                <div className="grid-pattern" />

                {/* Left Panel */}
                <div className="left-panel">
                    <Link href="/" className="logo-wrap">
                        <div className="logo-icon">S</div>
                        <span className="logo-text">Smart<span>Finance.</span></span>
                    </Link>

                    <h1 className="left-title">
                        Kelola Keuangan<br />
                        untuk <span className="accent">Masa Depan.</span>
                    </h1>
                    <p className="left-desc">
                        Platform fintech berbasis AI untuk UMKM Indonesia. Pantau progres SDGs Anda secara real-time.
                    </p>

                    <div className="stat-cards">
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'rgba(59,130,246,0.1)' }}>
                                <TrendingUp size={20} color="#60a5fa" />
                            </div>
                            <div className="stat-info">
                                <div className="stat-val">+12.4%</div>
                                <div className="stat-lbl">SDG Impact bulan ini</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'rgba(52,211,153,0.1)' }}>
                                <Shield size={20} color="#34d399" />
                            </div>
                            <div className="stat-info">
                                <div className="stat-val">Rp 2.4B</div>
                                <div className="stat-lbl">Dana UMKM tersalurkan</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'rgba(251,191,36,0.1)' }}>
                                <Sparkles size={20} color="#fbbf24" />
                            </div>
                            <div className="stat-info">
                                <div className="stat-val">4,821</div>
                                <div className="stat-lbl">Pengguna aktif</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="right-panel">
                    <div className="form-card">
                        <div className="form-title">Selamat Datang!</div>
                        <div className="form-sub">
                            Belum punya akun?{" "}
                            <Link href={route("register")}>Daftar gratis</Link>
                        </div>

                        {status && <div className="status-msg">{status}</div>}

                        <form onSubmit={submit}>
                            <div className="field-wrap">
                                <label className="field-label">Email Address</label>
                                <div className="field-input-wrap">
                                    <span className="field-icon"><Mail size={16} /></span>
                                    <input
                                        type="email"
                                        className="field-input"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        placeholder="nama@email.com"
                                        autoComplete="email"
                                    />
                                </div>
                                {errors.email && <div className="field-error">{errors.email}</div>}
                            </div>

                            <div className="field-wrap">
                                <label className="field-label">Password</label>
                                <div className="field-input-wrap">
                                    <span className="field-icon"><Lock size={16} /></span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="field-input"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                        placeholder="Masukkan password..."
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        className="field-eye"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.password && <div className="field-error">{errors.password}</div>}
                            </div>

                            <div className="remember-row">
                                <label className="remember-label">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setData("remember", e.target.checked)
                                        }
                                    />
                                    Ingat saya
                                </label>
                                {canResetPassword && (
                                    <Link href={route("password.request")} className="forgot-link">
                                        Lupa sandi?
                                    </Link>
                                )}
                            </div>

                            <button type="submit" className="submit-btn" disabled={processing}>
                                {processing ? "Memproses..." : "Masuk Sekarang"}
                            </button>
                        </form>

                        <div className="divider">
                            <div className="divider-line" />
                            <span className="divider-text">Verified by Bank Indonesia</span>
                            <div className="divider-line" />
                        </div>

                        <div className="register-row">
                            © 2026 Smart Finance · Kelompok 4
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
