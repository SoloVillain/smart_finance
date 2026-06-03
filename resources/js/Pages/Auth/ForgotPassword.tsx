import { Head, useForm } from '@inertiajs/react';
import { Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from '@inertiajs/react';

type ForgotPasswordProps = { status?: string };

export default function ForgotPassword({ status }: ForgotPasswordProps) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Lupa Password — Smart Finance" />
            <style>{`
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                html, body { width: 100%; min-height: 100%; overflow-x: hidden; background: #050a14; -webkit-font-smoothing: antialiased; }

                .fp-root {
                    font-family: 'DM Sans', sans-serif;
                    background: linear-gradient(165deg, #050a14 0%, #0a111f 48%, #0f1b2e 100%);
                    color: #c9d6e3;
                    min-height: 100vh;
                    display: flex;
                    position: relative;
                    overflow: hidden;
                }

                .fp-root::before {
                    content: '';
                    position: fixed; inset: 0;
                    background: radial-gradient(ellipse 70% 45% at 50% 0%, rgba(77,159,255,0.07) 0%, transparent 55%);
                    pointer-events: none; z-index: 0;
                }

                /* ── LEFT ── */
                .fp-left {
                    flex: 1;
                    display: flex; flex-direction: column; justify-content: center;
                    padding: 60px 64px;
                    position: relative; z-index: 1;
                    border-right: 1px solid rgba(255,255,255,0.06);
                }

                .fp-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 60px; text-decoration: none; }
                .fp-logo-mark {
                    width: 34px; height: 34px; background: #f0b429; border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 15px;
                    color: #050a14; line-height: 1;
                }
                .fp-logo-text { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 17px; color: #f0f6fc; letter-spacing: -0.01em; }
                .fp-logo-text em { color: #f0b429; font-style: normal; }

                .fp-h1 {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(32px, 3.5vw, 50px); font-weight: 800;
                    color: #ffffff; letter-spacing: -0.035em; line-height: 1.1;
                    margin-bottom: 16px;
                }
                .fp-h1 .hl  { color: #f0b429; }
                .fp-h1 .hl2 { color: #38bdf8; }

                .fp-desc { font-size: 15px; font-weight: 400; color: #94a3b8; line-height: 1.72; margin-bottom: 44px; max-width: 380px; }

                .fp-cards { display: flex; flex-direction: column; gap: 12px; max-width: 360px; }
                .fp-card {
                    display: flex; align-items: flex-start; gap: 14px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 12px; padding: 16px 18px;
                    transition: border-color 0.2s;
                }
                .fp-card:hover { border-color: rgba(255,255,255,0.12); }
                .fp-card-ico {
                    width: 38px; height: 38px; border-radius: 9px; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                }
                .fp-card-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #f0f6fc; margin-bottom: 3px; }
                .fp-card-desc { font-size: 12.5px; font-weight: 400; color: #7d8fa8; line-height: 1.55; }

                /* ── RIGHT ── */
                .fp-right {
                    width: 480px; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    padding: 40px 48px;
                    position: relative; z-index: 1;
                }

                .fp-form-card {
                    width: 100%;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 18px; padding: 36px;
                    box-shadow: 0 20px 48px rgba(0,0,0,0.4);
                }

                /* Icon di atas form */
                .fp-form-ico {
                    width: 52px; height: 52px;
                    background: rgba(240,180,41,0.1);
                    border: 1px solid rgba(240,180,41,0.25);
                    border-radius: 14px;
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 22px;
                }

                .fp-form-title { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; margin-bottom: 8px; }
                .fp-form-sub { font-size: 13.5px; font-weight: 400; color: #94a3b8; line-height: 1.65; margin-bottom: 28px; }

                /* Status sukses */
                .fp-status {
                    background: rgba(74,222,128,0.08);
                    border: 1px solid rgba(74,222,128,0.2);
                    border-radius: 10px; padding: 12px 15px;
                    font-size: 13px; font-weight: 500;
                    color: #4ade80;
                    display: flex; align-items: flex-start; gap: 9px;
                    margin-bottom: 20px; line-height: 1.55;
                }

                /* Field */
                .fp-field { margin-bottom: 20px; }
                .fp-label {
                    display: block; font-size: 11px; font-weight: 700;
                    text-transform: uppercase; letter-spacing: 0.1em;
                    color: #94a3b8; margin-bottom: 7px;
                }
                .fp-input-wrap { position: relative; display: flex; align-items: center; }
                .fp-ico { position: absolute; left: 13px; color: #64748b; display: flex; pointer-events: none; }

                .fp-input {
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
                .fp-input::placeholder { color: #475569; }
                .fp-input:focus { border-color: #f0b429; box-shadow: 0 0 0 3px rgba(240,180,41,0.12); background: rgba(0,0,0,0.3); }

                .fp-err { font-size: 12px; font-weight: 500; color: #f87171; margin-top: 5px; }

                /* Submit */
                .fp-submit {
                    width: 100%; padding: 13px;
                    background: #f0b429; color: #050a14;
                    border: none; border-radius: 10px;
                    font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 800;
                    cursor: pointer; transition: all 0.2s;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    letter-spacing: 0.01em; margin-top: 8px;
                }
                .fp-submit:hover:not(:disabled) { background: #f5c842; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(240,180,41,0.28); }
                .fp-submit:disabled { opacity: 0.5; cursor: not-allowed; }
                .fp-submit svg { transition: transform 0.2s; }
                .fp-submit:hover:not(:disabled) svg { transform: translateX(3px); }

                /* Back link */
                .fp-back {
                    display: flex; align-items: center; justify-content: center; gap: 6px;
                    margin-top: 18px;
                    font-size: 13px; font-weight: 500;
                    color: #7d8fa8; text-decoration: none;
                    transition: color 0.18s;
                }
                .fp-back:hover { color: #f0b429; }

                /* Divider */
                .fp-divider { display: flex; align-items: center; gap: 12px; margin-top: 20px; }
                .fp-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
                .fp-divider-txt { font-size: 11.5px; font-weight: 500; color: #475569; white-space: nowrap; }

                @media (max-width: 900px) {
                    .fp-left { display: none; }
                    .fp-right { width: 100%; padding: 24px; }
                    .fp-root { justify-content: center; }
                }
            `}</style>

            <div className="fp-root">
                {/* ── LEFT ── */}
                <div className="fp-left">
                    <Link href="/" className="fp-logo">
                        <div className="fp-logo-mark">S</div>
                        <span className="fp-logo-text">Smart<em>Finance</em></span>
                    </Link>

                    <h1 className="fp-h1">
                        Lupa <span className="hl">Password</span>?<br />
                        <span className="hl2">Kami Bantu.</span>
                    </h1>
                    <p className="fp-desc">
                        Masukkan email yang terdaftar dan kami akan mengirimkan tautan untuk mengatur ulang password Anda dengan aman.
                    </p>

                    <div className="fp-cards">
                        {[
                            {
                                icon: <Mail size={17} color="#38bdf8" />,
                                title: 'Cek Inbox Email',
                                desc: 'Link reset password akan dikirim ke email terdaftar dalam beberapa menit.',
                            },
                            {
                                icon: <ShieldCheck size={17} color="#4ade80" />,
                                title: 'Aman & Terenkripsi',
                                desc: 'Link reset hanya berlaku 60 menit untuk menjaga keamanan akun Anda.',
                            },
                            {
                                icon: <Sparkles size={17} color="#f0b429" />,
                                title: 'Proses Otomatis',
                                desc: 'Sistem AI kami memverifikasi identitas Anda sebelum mengirimkan link.',
                            },
                        ].map(c => (
                            <div className="fp-card" key={c.title}>
                                <div className="fp-card-ico">{c.icon}</div>
                                <div>
                                    <div className="fp-card-title">{c.title}</div>
                                    <div className="fp-card-desc">{c.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT ── */}
                <div className="fp-right">
                    <div className="fp-form-card">
                        <div className="fp-form-ico">
                            <Sparkles size={22} color="#f0b429" />
                        </div>

                        <div className="fp-form-title">Reset Password</div>
                        <div className="fp-form-sub">
                            Masukkan alamat email Anda dan kami akan mengirimkan tautan untuk mengatur ulang password.
                        </div>

                        {status && (
                            <div className="fp-status">
                                <ShieldCheck size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="fp-field">
                                <label className="fp-label">Alamat Email</label>
                                <div className="fp-input-wrap">
                                    <span className="fp-ico"><Mail size={15} /></span>
                                    <input
                                        type="email"
                                        className="fp-input"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="nama@email.com"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                </div>
                                {errors.email && <div className="fp-err">{errors.email}</div>}
                            </div>

                            <button type="submit" className="fp-submit" disabled={processing}>
                                {processing ? 'Mengirim...' : <><span>Kirim Link Reset</span><ArrowRight size={15} /></>}
                            </button>
                        </form>

                        <Link href={route('login')} className="fp-back">
                            ← Kembali ke halaman Login
                        </Link>

                        <div className="fp-divider">
                            <div className="fp-divider-line" />
                            <span className="fp-divider-txt">© 2026 Smart Finance · Kelompok 4</span>
                            <div className="fp-divider-line" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
