import { Head, Link, useForm } from "@inertiajs/react";
import { User, Mail, Lock, Eye, EyeOff, Sparkles, Globe, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Register - Smart Finance" />
            <style>{`
                
                * { box-sizing: border-box; margin: 0; padding: 0; }

                .reg-root {
                    font-family: 'DM Sans', sans-serif;
                    background: #020617;
                    min-height: 100vh;
                    display: flex;
                    position: relative;
                    overflow: hidden;
                }

                .bg-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    pointer-events: none;
                    animation: floatOrb 10s ease-in-out infinite;
                }
                .bg-orb-1 { width: 500px; height: 500px; background: rgba(99,102,241,0.12); top: -150px; left: -100px; animation-delay: 0s; }
                .bg-orb-2 { width: 350px; height: 350px; background: rgba(59,130,246,0.1); bottom: -100px; right: 30%; animation-delay: -5s; }
                .bg-orb-3 { width: 250px; height: 250px; background: rgba(52,211,153,0.07); top: 40%; right: -50px; animation-delay: -3s; }

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

                /* Left Panel - Branding */
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
                    background: linear-gradient(135deg, #6366f1, #3b82f6);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 18px;
                    color: white;
                    font-family: 'Syne', sans-serif;
                    box-shadow: 0 0 20px rgba(99,102,241,0.4);
                }

                .logo-text {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    font-size: 18px;
                    color: white;
                }
                .logo-text span { color: #818cf8; }

                .left-title {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(36px, 4vw, 52px);
                    font-weight: 800;
                    color: white;
                    line-height: 1.1;
                    margin-bottom: 20px;
                }

                .left-title .accent {
                    background: linear-gradient(135deg, #818cf8, #60a5fa, #34d399);
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

                .benefit-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    max-width: 380px;
                }

                .benefit-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                    animation: fadeSlideUp 0.5s ease both;
                }

                .benefit-item:nth-child(1) { animation-delay: 0.1s; }
                .benefit-item:nth-child(2) { animation-delay: 0.2s; }
                .benefit-item:nth-child(3) { animation-delay: 0.3s; }

                .benefit-icon {
                    width: 40px; height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    margin-top: 2px;
                }

                .benefit-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 3px;
                }

                .benefit-desc {
                    font-size: 13px;
                    color: #475569;
                    line-height: 1.5;
                }

                .sdg-bar-wrap { margin-top: 48px; max-width: 380px; }

                .sdg-bar-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    color: #475569;
                    margin-bottom: 6px;
                }

                .sdg-bar {
                    height: 4px;
                    background: rgba(255,255,255,0.05);
                    border-radius: 100px;
                    overflow: hidden;
                    margin-bottom: 10px;
                }

                .sdg-bar-fill {
                    height: 100%;
                    border-radius: 100px;
                    animation: barGrow 1.5s ease both;
                }

                @keyframes barGrow {
                    from { width: 0%; }
                }

                /* Right Panel - Form */
                .right-panel {
                    width: 520px;
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

                .form-logo-wrap {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 28px;
                    text-decoration: none;
                }

                .form-logo-icon {
                    width: 36px; height: 36px;
                    background: linear-gradient(135deg, #6366f1, #3b82f6);
                    border-radius: 9px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 16px;
                    color: white;
                    font-family: 'Syne', sans-serif;
                    box-shadow: 0 0 16px rgba(99,102,241,0.4);
                }

                .form-logo-text {
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    font-size: 17px;
                    color: white;
                }
                .form-logo-text span { color: #818cf8; }

                .form-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 24px;
                    font-weight: 800;
                    color: white;
                    margin-bottom: 6px;
                }

                .form-sub {
                    font-size: 13px;
                    color: #64748b;
                    margin-bottom: 28px;
                }

                .form-sub a {
                    color: #818cf8;
                    text-decoration: none;
                    font-weight: 500;
                }
                .form-sub a:hover { text-decoration: underline; }

                .field-wrap { margin-bottom: 16px; }

                .field-label {
                    display: block;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #475569;
                    margin-bottom: 7px;
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
                    padding: 11px 14px 11px 42px;
                    font-size: 14px;
                    color: white;
                    font-family: 'DM Sans', sans-serif;
                    transition: all 0.2s;
                    outline: none;
                }

                .field-input::placeholder { color: #334155; }

                .field-input:focus {
                    border-color: rgba(99,102,241,0.5);
                    background: rgba(99,102,241,0.05);
                    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
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
                    margin-top: 5px;
                    margin-left: 2px;
                }

                .grid-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .submit-btn {
                    width: 100%;
                    padding: 13px;
                    background: linear-gradient(135deg, #6366f1, #3b82f6);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-family: 'Syne', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 8px 25px rgba(99,102,241,0.35);
                    margin-top: 20px;
                    letter-spacing: 0.02em;
                }

                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 35px rgba(99,102,241,0.5);
                }

                .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

                .divider {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin: 20px 0 0;
                }

                .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
                .divider-text { font-size: 12px; color: #334155; white-space: nowrap; }

                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 900px) {
                    .left-panel { display: none; }
                    .right-panel { width: 100%; padding: 24px; }
                    .reg-root { justify-content: center; }
                }
            `}</style>

            <div className="reg-root">
                <div className="bg-orb bg-orb-1" />
                <div className="bg-orb bg-orb-2" />
                <div className="bg-orb bg-orb-3" />
                <div className="grid-pattern" />

                {/* Left Panel - Branding */}
                <div className="left-panel">
                    <Link href="/" className="logo-wrap">
                        <div className="logo-icon">S</div>
                        <span className="logo-text">Smart<span>Finance.</span></span>
                    </Link>

                    <h1 className="left-title">
                        Bergabung &<br />
                        Buat <span className="accent">Dampak Nyata.</span>
                    </h1>
                    <p className="left-desc">
                        Daftarkan diri Anda dan mulai perjalanan menuju keuangan yang lebih inklusif bersama ribuan pelaku UMKM Indonesia.
                    </p>

                    <div className="benefit-list">
                        <div className="benefit-item">
                            <div className="benefit-icon" style={{ background: 'rgba(99,102,241,0.1)' }}>
                                <Sparkles size={20} color="#818cf8" />
                            </div>
                            <div>
                                <div className="benefit-title">AI Credit Scoring</div>
                                <div className="benefit-desc">Penilaian kredit otomatis berbasis machine learning yang adil dan transparan.</div>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <div className="benefit-icon" style={{ background: 'rgba(52,211,153,0.1)' }}>
                                <ShieldCheck size={20} color="#34d399" />
                            </div>
                            <div>
                                <div className="benefit-title">Keamanan Terjamin</div>
                                <div className="benefit-desc">Enkripsi end-to-end dan verifikasi KYC untuk melindungi aset digital Anda.</div>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <div className="benefit-icon" style={{ background: 'rgba(59,130,246,0.1)' }}>
                                <Globe size={20} color="#60a5fa" />
                            </div>
                            <div>
                                <div className="benefit-title">SDG Impact Tracking</div>
                                <div className="benefit-desc">Pantau kontribusi nyata Anda terhadap tujuan pembangunan berkelanjutan global.</div>
                            </div>
                        </div>
                    </div>

                    <div className="sdg-bar-wrap">
                        <div className="sdg-bar-label"><span>SDG 1 — Tanpa Kemiskinan</span><span style={{color:'#34d399'}}>74%</span></div>
                        <div className="sdg-bar"><div className="sdg-bar-fill" style={{ width: '74%', background: 'linear-gradient(90deg, #34d399, #059669)', animationDelay: '0.3s' }} /></div>

                        <div className="sdg-bar-label"><span>SDG 8 — Pekerjaan Layak</span><span style={{color:'#60a5fa'}}>88%</span></div>
                        <div className="sdg-bar"><div className="sdg-bar-fill" style={{ width: '88%', background: 'linear-gradient(90deg, #60a5fa, #3b82f6)', animationDelay: '0.5s' }} /></div>

                        <div className="sdg-bar-label"><span>SDG 9 — Industri & Inovasi</span><span style={{color:'#818cf8'}}>61%</span></div>
                        <div className="sdg-bar"><div className="sdg-bar-fill" style={{ width: '61%', background: 'linear-gradient(90deg, #818cf8, #6366f1)', animationDelay: '0.7s' }} /></div>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="right-panel">
                    <div className="form-card">
                        <Link href="/" className="form-logo-wrap">
                            <div className="form-logo-icon">S</div>
                            <span className="form-logo-text">Smart<span>Finance.</span></span>
                        </Link>

                        <div className="form-title">Buat Akun Baru</div>
                        <div className="form-sub">
                            Sudah punya akun?{" "}
                            <Link href={route("login")}>Masuk sekarang</Link>
                        </div>

                        <form onSubmit={submit}>
                            <div className="field-wrap">
                                <label className="field-label">Nama Lengkap</label>
                                <div className="field-input-wrap">
                                    <span className="field-icon"><User size={16} /></span>
                                    <input
                                        type="text"
                                        className="field-input"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        placeholder="Masukkan nama lengkap..."
                                        autoComplete="name"
                                        required
                                    />
                                </div>
                                {errors.name && <div className="field-error">{errors.name}</div>}
                            </div>

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
                                        required
                                    />
                                </div>
                                {errors.email && <div className="field-error">{errors.email}</div>}
                            </div>

                            <div className="grid-2">
                                <div className="field-wrap">
                                    <label className="field-label">Password</label>
                                    <div className="field-input-wrap">
                                        <span className="field-icon"><Lock size={16} /></span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="field-input"
                                            value={data.password}
                                            onChange={(e) => setData("password", e.target.value)}
                                            placeholder="Min. 8 karakter"
                                            autoComplete="new-password"
                                            required
                                        />
                                        <button type="button" className="field-eye" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                        </button>
                                    </div>
                                    {errors.password && <div className="field-error">{errors.password}</div>}
                                </div>

                                <div className="field-wrap">
                                    <label className="field-label">Konfirmasi</label>
                                    <div className="field-input-wrap">
                                        <span className="field-icon"><Lock size={16} /></span>
                                        <input
                                            type={showConfirm ? "text" : "password"}
                                            className="field-input"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData("password_confirmation", e.target.value)}
                                            placeholder="Ulangi password"
                                            autoComplete="new-password"
                                            required
                                        />
                                        <button type="button" className="field-eye" onClick={() => setShowConfirm(!showConfirm)}>
                                            {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                                        </button>
                                    </div>
                                    {errors.password_confirmation && <div className="field-error">{errors.password_confirmation}</div>}
                                </div>
                            </div>

                            <button type="submit" className="submit-btn" disabled={processing}>
                                {processing ? "Memproses..." : "Daftar Sekarang"}
                            </button>
                        </form>

                        <div className="divider">
                            <div className="divider-line" />
                            <span className="divider-text">© 2026 Smart Finance · Kelompok 4</span>
                            <div className="divider-line" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
