import Checkbox from "@/Components/Checkbox";
import { Head, Link, useForm } from "@inertiajs/react";
import { Lock, Mail, Eye, EyeOff, TrendingUp, Shield, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

type LoginProps = { status?: string; canResetPassword: boolean };

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: "", password: "", remember: false,
    });
    const [showPw, setShowPw] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("login"), { onFinish: () => reset("password") });
    };

    return (
        <>
            <Head title="Masuk — Smart Finance" />
            <style>{`
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                html, body { width: 100%; min-height: 100%; overflow-x: hidden; background: #050a14; -webkit-font-smoothing: antialiased; }

                .lg-root {
                    font-family: 'DM Sans', sans-serif;
                    background: linear-gradient(165deg, #050a14 0%, #0a111f 48%, #0f1b2e 100%);
                    color: #c9d6e3;
                    min-height: 100vh;
                    display: flex;
                    position: relative;
                    overflow: hidden;
                }

                .lg-root::before {
                    content: '';
                    position: fixed; inset: 0;
                    background: radial-gradient(ellipse 70% 45% at 50% 0%, rgba(77,159,255,0.07) 0%, transparent 55%);
                    pointer-events: none; z-index: 0;
                }

                /* ── LEFT PANEL ── */
                .lg-left {
                    flex: 1;
                    display: flex; flex-direction: column; justify-content: center;
                    padding: 60px 64px;
                    position: relative; z-index: 1;
                    border-right: 1px solid rgba(255,255,255,0.06);
                }

                .lg-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 60px; text-decoration: none; }
                .lg-logo-mark {
                    width: 34px; height: 34px; background: #f0b429; border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 15px;
                    color: #050a14; line-height: 1;
                }
                .lg-logo-text { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 17px; color: #f0f6fc; letter-spacing: -0.01em; }
                .lg-logo-text em { color: #f0b429; font-style: normal; }

                .lg-h1 {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(32px, 3.5vw, 50px); font-weight: 800;
                    color: #ffffff; letter-spacing: -0.035em; line-height: 1.1;
                    margin-bottom: 16px;
                }
                .lg-h1 .hl { color: #f0b429; }
                .lg-h1 .hl2 { color: #38bdf8; }

                .lg-desc { font-size: 15px; font-weight: 400; color: #94a3b8; line-height: 1.72; margin-bottom: 44px; max-width: 380px; }

                .lg-stats { display: flex; flex-direction: column; gap: 12px; max-width: 360px; }
                .lg-stat-row {
                    display: flex; align-items: center; gap: 14px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 12px; padding: 14px 18px;
                    transition: border-color 0.2s;
                }
                .lg-stat-row:hover { border-color: rgba(255,255,255,0.12); }
                .lg-stat-icon {
                    width: 38px; height: 38px; border-radius: 9px;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                }
                .lg-stat-val { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; color: #f0f6fc; line-height: 1; margin-bottom: 3px; }
                .lg-stat-lbl { font-size: 12px; font-weight: 500; color: #7d8fa8; }

                /* ── RIGHT PANEL ── */
                .lg-right {
                    width: 480px; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    padding: 40px 48px;
                    position: relative; z-index: 1;
                }

                .lg-card {
                    width: 100%;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 18px; padding: 36px;
                    box-shadow: 0 20px 48px rgba(0,0,0,0.4);
                }

                .lg-title { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; margin-bottom: 6px; }
                .lg-sub { font-size: 13.5px; font-weight: 400; color: #94a3b8; margin-bottom: 28px; }
                .lg-sub a { color: #f0b429; text-decoration: none; font-weight: 600; }
                .lg-sub a:hover { text-decoration: underline; }

                .lg-status {
                    background: rgba(74,222,128,0.08); border: 1px solid rgba(74,222,128,0.2);
                    border-radius: 9px; padding: 11px 14px;
                    font-size: 13px; font-weight: 500; color: #4ade80;
                    margin-bottom: 20px;
                }

                /* Fields */
                .lg-field { margin-bottom: 18px; }
                .lg-label {
                    display: block; font-size: 11px; font-weight: 700;
                    text-transform: uppercase; letter-spacing: 0.1em;
                    color: #94a3b8; margin-bottom: 7px;
                }
                .lg-input-wrap { position: relative; display: flex; align-items: center; }
                .lg-ico { position: absolute; left: 13px; color: #64748b; display: flex; pointer-events: none; }

                .lg-input {
                    width: 100%;
                    background: rgba(0,0,0,0.25);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 10px;
                    padding: 12px 13px 12px 40px;
                    font-size: 14px; font-weight: 400;
                    color: #f0f6fc;
                    font-family: 'DM Sans', sans-serif;
                    outline: none; transition: border-color 0.18s, box-shadow 0.18s;
                }
                .lg-input::placeholder { color: #475569; }
                .lg-input:focus { border-color: #f0b429; box-shadow: 0 0 0 3px rgba(240,180,41,0.12); background: rgba(0,0,0,0.3); }

                .lg-eye { position: absolute; right: 12px; background: none; border: none; color: #64748b; cursor: pointer; display: flex; padding: 2px; transition: color 0.15s; }
                .lg-eye:hover { color: #94a3b8; }

                .lg-err { font-size: 12px; font-weight: 500; color: #f87171; margin-top: 5px; }

                .lg-row {
                    display: flex; justify-content: space-between; align-items: center;
                    margin-bottom: 24px;
                }
                .lg-remember { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: #94a3b8; cursor: pointer; }
                .lg-remember input[type=checkbox] { accent-color: #f0b429; width: 15px; height: 15px; cursor: pointer; }
                .lg-forgot { font-size: 13px; font-weight: 600; color: #f0b429; text-decoration: none; }
                .lg-forgot:hover { text-decoration: underline; }

                .lg-submit {
                    width: 100%; padding: 13px;
                    background: #f0b429; color: #050a14;
                    border: none; border-radius: 10px;
                    font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 800;
                    cursor: pointer; transition: all 0.2s;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    letter-spacing: 0.01em;
                }
                .lg-submit:hover:not(:disabled) { background: #f5c842; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(240,180,41,0.28); }
                .lg-submit:disabled { opacity: 0.5; cursor: not-allowed; }

                .lg-divider { display: flex; align-items: center; gap: 12px; margin: 20px 0 0; }
                .lg-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
                .lg-divider-txt { font-size: 11.5px; font-weight: 500; color: #475569; white-space: nowrap; }

                @media (max-width: 900px) {
                    .lg-left { display: none; }
                    .lg-right { width: 100%; padding: 24px; }
                    .lg-root { justify-content: center; }
                }
            `}</style>

            <div className="lg-root">
                {/* Left */}
                <div className="lg-left">
                    <Link href="/" className="lg-logo">
                        <div className="lg-logo-mark">S</div>
                        <span className="lg-logo-text">Smart<em>Finance</em></span>
                    </Link>

                    <h1 className="lg-h1">
                        Kelola <span className="hl">Keuangan</span><br />
                        untuk <span className="hl2">Masa Depan.</span>
                    </h1>
                    <p className="lg-desc">Platform fintech berbasis AI untuk UMKM Indonesia. Pantau progres SDGs Anda secara real-time dengan sistem keuangan digital modern.</p>

                    <div className="lg-stats">
                        {[
                            { icon: <TrendingUp size={17} color="#38bdf8" />, val: '+12.4%', lbl: 'SDG Impact bulan ini' },
                            { icon: <Shield size={17} color="#4ade80" />, val: 'Rp 2.4B', lbl: 'Dana UMKM tersalurkan' },
                            { icon: <Sparkles size={17} color="#f0b429" />, val: '4,821', lbl: 'Pengguna aktif' },
                        ].map(s => (
                            <div className="lg-stat-row" key={s.lbl}>
                                <div className="lg-stat-icon">{s.icon}</div>
                                <div>
                                    <div className="lg-stat-val">{s.val}</div>
                                    <div className="lg-stat-lbl">{s.lbl}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right */}
                <div className="lg-right">
                    <div className="lg-card">
                        <div className="lg-title">Selamat Datang!</div>
                        <div className="lg-sub">Belum punya akun? <Link href={route("register")}>Daftar gratis</Link></div>

                        {status && <div className="lg-status">{status}</div>}

                        <form onSubmit={submit}>
                            <div className="lg-field">
                                <label className="lg-label">Email atau NIK</label>
                                <div className="lg-input-wrap">
                                    <span className="lg-ico"><Mail size={15} /></span>
                                    <input type="text" className="lg-input" value={data.login}
                                        onChange={e => setData("login", e.target.value)}
                                        placeholder="Email atau 16 digit NIK..."
                                        autoComplete="username" autoFocus />
                                </div>
                                {errors.login && <div className="lg-err">{errors.login}</div>}
                            </div>

                            <div className="lg-field">
                                <label className="lg-label">Password</label>
                                <div className="lg-input-wrap">
                                    <span className="lg-ico"><Lock size={15} /></span>
                                    <input type={showPw ? "text" : "password"} className="lg-input"
                                        value={data.password}
                                        onChange={e => setData("password", e.target.value)}
                                        placeholder="Masukkan password..."
                                        autoComplete="current-password" />
                                    <button type="button" className="lg-eye" onClick={() => setShowPw(!showPw)}>
                                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                                {errors.password && <div className="lg-err">{errors.password}</div>}
                            </div>

                            <div className="lg-row">
                                <label className="lg-remember">
                                    <Checkbox name="remember" checked={data.remember}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData("remember", e.target.checked)} />
                                    Ingat saya
                                </label>
                                {canResetPassword && (
                                    <Link href={route("password.request")} className="lg-forgot">Lupa sandi?</Link>
                                )}
                            </div>

                            <button type="submit" className="lg-submit" disabled={processing}>
                                {processing ? "Memproses..." : <><span>Masuk Sekarang</span><ArrowRight size={15} /></>}
                            </button>
                        </form>

                        <div className="lg-divider">
                            <div className="lg-divider-line" />
                            <span className="lg-divider-txt">© 2026 Smart Finance · Kelompok 4</span>
                            <div className="lg-divider-line" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
