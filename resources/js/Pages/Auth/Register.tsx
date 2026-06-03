import { Head, Link, useForm } from "@inertiajs/react";
import { User, Mail, Lock, Eye, EyeOff, Sparkles, Globe, ShieldCheck, CreditCard, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "", nik: "", email: "", password: "", password_confirmation: "",
    });
    const [showPw, setShowPw] = useState(false);
    const [showCf, setShowCf] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("register"), { onFinish: () => reset("password", "password_confirmation") });
    };

    return (
        <>
            <Head title="Daftar — Smart Finance" />
            <style>{`
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                html, body {
                    width: 100%;
                    /* Biarkan body scroll normal — hanya panel kanan yang fixed */
                    overflow-x: hidden;
                    background: #050a14;
                    -webkit-font-smoothing: antialiased;
                }

                .rg-root {
                    font-family: 'DM Sans', sans-serif;
                    background: linear-gradient(165deg, #050a14 0%, #0a111f 48%, #0f1b2e 100%);
                    color: #c9d6e3;
                    min-height: 100vh;
                    display: flex;
                    position: relative;
                }

                .rg-root::before {
                    content: '';
                    position: fixed; inset: 0;
                    background: radial-gradient(ellipse 70% 45% at 50% 0%, rgba(77,159,255,0.07) 0%, transparent 55%);
                    pointer-events: none; z-index: 0;
                }

                /* ── LEFT PANEL — scroll bebas ── */
                .rg-left {
                    flex: 1;
                    display: flex; flex-direction: column; justify-content: center;
                    padding: 48px 56px;
                    position: relative; z-index: 1;
                    border-right: 1px solid rgba(255,255,255,0.06);
                    /* Kiri bisa scroll jika layar pendek */
                    overflow-y: auto;
                }

                .rg-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 40px; text-decoration: none; }
                .rg-logo-mark {
                    width: 34px; height: 34px; background: #f0b429; border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 15px;
                    color: #050a14; line-height: 1; flex-shrink: 0;
                }
                .rg-logo-text { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 17px; color: #f0f6fc; letter-spacing: -0.01em; }
                .rg-logo-text em { color: #f0b429; font-style: normal; }

                .rg-h1 {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(28px, 3vw, 44px); font-weight: 800;
                    color: #ffffff; letter-spacing: -0.035em; line-height: 1.1;
                    margin-bottom: 12px;
                }
                .rg-h1 .hl  { color: #f0b429; }
                .rg-h1 .hl2 { color: #38bdf8; }

                .rg-desc { font-size: 14.5px; font-weight: 400; color: #94a3b8; line-height: 1.7; margin-bottom: 28px; max-width: 380px; }

                .rg-benefits { display: flex; flex-direction: column; gap: 10px; max-width: 380px; margin-bottom: 28px; }
                .rg-benefit {
                    display: flex; align-items: flex-start; gap: 12px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 11px; padding: 13px 16px;
                    transition: border-color 0.2s;
                }
                .rg-benefit:hover { border-color: rgba(255,255,255,0.12); }
                .rg-benefit-ico {
                    width: 34px; height: 34px; border-radius: 8px; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                    margin-top: 1px;
                }
                .rg-benefit-title { font-family: 'Syne', sans-serif; font-size: 13.5px; font-weight: 700; color: #f0f6fc; margin-bottom: 2px; }
                .rg-benefit-desc { font-size: 12px; font-weight: 400; color: #7d8fa8; line-height: 1.5; }

                .rg-bars { max-width: 380px; }
                .rg-bar-row { display: flex; justify-content: space-between; font-size: 11.5px; color: #94a3b8; margin-bottom: 4px; }
                .rg-bar-track { height: 3px; background: rgba(255,255,255,0.06); border-radius: 100px; overflow: hidden; margin-bottom: 10px; }
                .rg-bar-fill { height: 100%; border-radius: 100px; animation: rgBarFill 1.4s ease both; }
                @keyframes rgBarFill { from { width: 0%; } }

                /* ── RIGHT PANEL — STICKY/FIXED, tidak ikut scroll ── */
                .rg-right {
                    width: 480px;
                    flex-shrink: 0;
                    /* sticky agar tidak scroll bersama konten kiri */
                    position: sticky;
                    top: 0;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px 44px;
                    z-index: 1;
                    overflow: hidden;
                }

                .rg-card {
                    width: 100%;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 18px; padding: 28px 32px;
                    box-shadow: 0 20px 48px rgba(0,0,0,0.4);
                }

                .rg-card-logo { display: flex; align-items: center; gap: 9px; margin-bottom: 18px; text-decoration: none; }
                .rg-card-logo-mark {
                    width: 28px; height: 28px; background: #f0b429; border-radius: 6px;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 12px;
                    color: #050a14; line-height: 1;
                }
                .rg-card-logo-text { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; color: #f0f6fc; }
                .rg-card-logo-text em { color: #f0b429; font-style: normal; }

                .rg-title { font-family: 'Syne', sans-serif; font-size: 21px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; margin-bottom: 4px; }
                .rg-sub { font-size: 12.5px; font-weight: 400; color: #94a3b8; margin-bottom: 18px; }
                .rg-sub a { color: #f0b429; text-decoration: none; font-weight: 600; }
                .rg-sub a:hover { text-decoration: underline; }

                .rg-field { margin-bottom: 11px; }
                .rg-label {
                    display: block; font-size: 10.5px; font-weight: 700;
                    text-transform: uppercase; letter-spacing: 0.1em;
                    color: #94a3b8; margin-bottom: 5px;
                }
                .rg-input-wrap { position: relative; display: flex; align-items: center; }
                .rg-ico { position: absolute; left: 12px; color: #64748b; display: flex; pointer-events: none; }

                .rg-input {
                    width: 100%;
                    background: rgba(0,0,0,0.25);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 9px;
                    padding: 10px 12px 10px 37px;
                    font-size: 13.5px; font-weight: 400;
                    color: #f0f6fc;
                    font-family: 'DM Sans', sans-serif;
                    outline: none; transition: border-color 0.18s, box-shadow 0.18s;
                }
                .rg-input::placeholder { color: #475569; }
                .rg-input:focus { border-color: #f0b429; box-shadow: 0 0 0 3px rgba(240,180,41,0.12); background: rgba(0,0,0,0.3); }

                .rg-eye { position: absolute; right: 10px; background: none; border: none; color: #64748b; cursor: pointer; display: flex; padding: 2px; transition: color 0.15s; }
                .rg-eye:hover { color: #94a3b8; }

                .rg-err { font-size: 11.5px; font-weight: 500; color: #f87171; margin-top: 3px; }

                .rg-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

                .rg-submit {
                    width: 100%; padding: 12px;
                    background: #f0b429; color: #050a14;
                    border: none; border-radius: 9px;
                    font-family: 'Syne', sans-serif; font-size: 14.5px; font-weight: 800;
                    cursor: pointer; transition: all 0.2s;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    letter-spacing: 0.01em; margin-top: 14px;
                }
                .rg-submit:hover:not(:disabled) { background: #f5c842; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(240,180,41,0.28); }
                .rg-submit:disabled { opacity: 0.5; cursor: not-allowed; }

                .rg-divider { display: flex; align-items: center; gap: 12px; margin-top: 14px; }
                .rg-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
                .rg-divider-txt { font-size: 11px; font-weight: 500; color: #475569; white-space: nowrap; }

                @media (max-width: 900px) {
                    .rg-left { display: none; }
                    .rg-right {
                        width: 100%; padding: 24px;
                        position: relative; height: auto; overflow: visible;
                    }
                    .rg-root { min-height: 100vh; }
                }
            `}</style>

            <div className="rg-root">
                {/* ── LEFT ── */}
                <div className="rg-left">
                    <Link href="/" className="rg-logo">
                        <div className="rg-logo-mark">S</div>
                        <span className="rg-logo-text">Smart<em>Finance</em></span>
                    </Link>

                    <h1 className="rg-h1">
                        Bergabung &<br />
                        Buat <span className="hl">Dampak</span><br />
                        <span className="hl2">Nyata.</span>
                    </h1>
                    <p className="rg-desc">Daftarkan diri dan mulai perjalanan menuju keuangan inklusif bersama ribuan pelaku UMKM Indonesia.</p>

                    <div className="rg-benefits">
                        {[
                            { icon: <Sparkles size={15} color="#a78bfa" />, title: 'AI Credit Scoring', desc: 'Penilaian kredit otomatis berbasis machine learning yang adil dan transparan.' },
                            { icon: <ShieldCheck size={15} color="#4ade80" />, title: 'Keamanan Terjamin', desc: 'Enkripsi end-to-end dan verifikasi KYC untuk melindungi aset digital Anda.' },
                            { icon: <Globe size={15} color="#38bdf8" />, title: 'SDG Impact Tracking', desc: 'Pantau kontribusi nyata Anda terhadap tujuan pembangunan berkelanjutan global.' },
                        ].map(b => (
                            <div className="rg-benefit" key={b.title}>
                                <div className="rg-benefit-ico">{b.icon}</div>
                                <div>
                                    <div className="rg-benefit-title">{b.title}</div>
                                    <div className="rg-benefit-desc">{b.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT — sticky, tidak ikut scroll ── */}
                <div className="rg-right">
                    <div className="rg-card">
                        <Link href="/" className="rg-card-logo">
                            <div className="rg-card-logo-mark">S</div>
                            <span className="rg-card-logo-text">Smart<em>Finance</em></span>
                        </Link>

                        <div className="rg-title">Buat Akun Baru</div>
                        <div className="rg-sub">Sudah punya akun? <Link href={route("login")}>Masuk sekarang</Link></div>

                        <form onSubmit={submit}>
                            <div className="rg-field">
                                <label className="rg-label">Nama Lengkap</label>
                                <div className="rg-input-wrap">
                                    <span className="rg-ico"><User size={13} /></span>
                                    <input type="text" className="rg-input" value={data.name}
                                        onChange={e => setData("name", e.target.value)}
                                        placeholder="Masukkan nama lengkap..."
                                        autoComplete="name" required />
                                </div>
                                {errors.name && <div className="rg-err">{errors.name}</div>}
                            </div>

                            <div className="rg-field">
                                <label className="rg-label">NIK (16 Digit)</label>
                                <div className="rg-input-wrap">
                                    <span className="rg-ico"><CreditCard size={13} /></span>
                                    <input type="text" className="rg-input" value={data.nik}
                                        onChange={e => setData("nik", e.target.value.replace(/\D/g, '').slice(0, 16))}
                                        placeholder="Masukkan 16 digit NIK..."
                                        maxLength={16} required />
                                </div>
                                {errors.nik && <div className="rg-err">{errors.nik}</div>}
                                {data.nik && data.nik.length < 16 && data.nik.length > 0 && (
                                    <div className="rg-err">NIK harus 16 digit ({data.nik.length}/16)</div>
                                )}
                            </div>

                            <div className="rg-field">
                                <label className="rg-label">Email Address</label>
                                <div className="rg-input-wrap">
                                    <span className="rg-ico"><Mail size={13} /></span>
                                    <input type="email" className="rg-input" value={data.email}
                                        onChange={e => setData("email", e.target.value)}
                                        placeholder="nama@email.com"
                                        autoComplete="email" required />
                                </div>
                                {errors.email && <div className="rg-err">{errors.email}</div>}
                            </div>

                            <div className="rg-grid2">
                                <div className="rg-field">
                                    <label className="rg-label">Password</label>
                                    <div className="rg-input-wrap">
                                        <span className="rg-ico"><Lock size={13} /></span>
                                        <input type={showPw ? "text" : "password"} className="rg-input"
                                            value={data.password}
                                            onChange={e => setData("password", e.target.value)}
                                            placeholder="Min. 8 karakter"
                                            autoComplete="new-password" required />
                                        <button type="button" className="rg-eye" onClick={() => setShowPw(!showPw)}>
                                            {showPw ? <EyeOff size={13} /> : <Eye size={13} />}
                                        </button>
                                    </div>
                                    {errors.password && <div className="rg-err">{errors.password}</div>}
                                </div>

                                <div className="rg-field">
                                    <label className="rg-label">Konfirmasi</label>
                                    <div className="rg-input-wrap">
                                        <span className="rg-ico"><Lock size={13} /></span>
                                        <input type={showCf ? "text" : "password"} className="rg-input"
                                            value={data.password_confirmation}
                                            onChange={e => setData("password_confirmation", e.target.value)}
                                            placeholder="Ulangi password"
                                            autoComplete="new-password" required />
                                        <button type="button" className="rg-eye" onClick={() => setShowCf(!showCf)}>
                                            {showCf ? <EyeOff size={13} /> : <Eye size={13} />}
                                        </button>
                                    </div>
                                    {errors.password_confirmation && <div className="rg-err">{errors.password_confirmation}</div>}
                                </div>
                            </div>

                            <button type="submit" className="rg-submit" disabled={processing}>
                                {processing ? "Memproses..." : <><span>Daftar Sekarang</span><ArrowRight size={14} /></>}
                            </button>
                        </form>

                        <div className="rg-divider">
                            <div className="rg-divider-line" />
                            <span className="rg-divider-txt">© 2026 Smart Finance · Kelompok 4</span>
                            <div className="rg-divider-line" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
