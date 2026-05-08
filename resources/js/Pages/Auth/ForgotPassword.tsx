import { Head, useForm } from '@inertiajs/react';
import { Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from '@inertiajs/react';

type ForgotPasswordProps = {
    status?: string;
};

export default function ForgotPassword({ status }: ForgotPasswordProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password - Smart Finance" />
            <style>{`
                * { box-sizing: border-box; margin: 0; padding: 0; }

                .fp-root {
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

                /* Left Panel */
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
                    font-size: clamp(32px, 4vw, 48px);
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

                .info-cards {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    max-width: 380px;
                }

                .info-card {
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                    background: rgba(15,23,42,0.7);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px;
                    padding: 16px 20px;
                    backdrop-filter: blur(10px);
                    animation: fadeSlideUp 0.5s ease both;
                }

                .info-card:nth-child(1) { animation-delay: 0.1s; }
                .info-card:nth-child(2) { animation-delay: 0.2s; }

                .info-icon {
                    width: 40px; height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .info-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 14px;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 3px;
                }

                .info-desc {
                    font-size: 12px;
                    color: #475569;
                    line-height: 1.5;
                }

                /* Right Panel */
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

                .form-icon {
                    width: 56px; height: 56px;
                    background: rgba(59,130,246,0.1);
                    border: 1px solid rgba(59,130,246,0.2);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 24px;
                }

                .form-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 24px;
                    font-weight: 800;
                    color: white;
                    margin-bottom: 8px;
                }

                .form-sub {
                    font-size: 14px;
                    color: #64748b;
                    line-height: 1.6;
                    margin-bottom: 32px;
                }

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

                .field-error {
                    font-size: 12px;
                    color: #f87171;
                    margin-top: 6px;
                    margin-left: 2px;
                }

                .status-msg {
                    background: rgba(52,211,153,0.1);
                    border: 1px solid rgba(52,211,153,0.2);
                    border-radius: 10px;
                    padding: 12px 16px;
                    font-size: 13px;
                    color: #34d399;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .submit-btn {
                    width: 100%;
                    padding: 13px;
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
                    margin-top: 8px;
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

                .back-link {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    margin-top: 20px;
                    font-size: 13px;
                    color: #475569;
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .back-link:hover { color: #60a5fa; }

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
                    .fp-root { justify-content: center; }
                }
            `}</style>

            <div className="fp-root">
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
                        Lupa Password?<br />
                        <span className="accent">Kami Bantu.</span>
                    </h1>
                    <p className="left-desc">
                        Masukkan email yang terdaftar dan kami akan mengirimkan tautan untuk mengatur ulang password Anda.
                    </p>

                    <div className="info-cards">
                        <div className="info-card">
                            <div className="info-icon" style={{ background: 'rgba(59,130,246,0.1)' }}>
                                <Mail size={20} color="#60a5fa" />
                            </div>
                            <div>
                                <div className="info-title">Cek Inbox Email</div>
                                <div className="info-desc">Link reset password akan dikirim ke email yang terdaftar dalam beberapa menit.</div>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon" style={{ background: 'rgba(52,211,153,0.1)' }}>
                                <ShieldCheck size={20} color="#34d399" />
                            </div>
                            <div>
                                <div className="info-title">Aman & Terenkripsi</div>
                                <div className="info-desc">Link reset password hanya berlaku selama 60 menit untuk keamanan akun Anda.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="right-panel">
                    <div className="form-card">
                        <div className="form-icon">
                            <Sparkles size={24} color="#60a5fa" />
                        </div>

                        <div className="form-title">Reset Password</div>
                        <div className="form-sub">
                            Masukkan alamat email Anda dan kami akan mengirimkan tautan untuk mengatur ulang password.
                        </div>

                        {status && (
                            <div className="status-msg">
                                <ShieldCheck size={16} />
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="field-wrap">
                                <label className="field-label">Alamat Email</label>
                                <div className="field-input-wrap">
                                    <span className="field-icon"><Mail size={16} /></span>
                                    <input
                                        id="email"
                                        type="email"
                                        className="field-input"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="nama@email.com"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                </div>
                                {errors.email && <div className="field-error">{errors.email}</div>}
                            </div>

                            <button type="submit" className="submit-btn" disabled={processing}>
                                {processing ? 'Mengirim...' : (
                                    <>
                                        Kirim Link Reset <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </form>

                        <Link href={route('login')} className="back-link">
                            ← Kembali ke halaman Login
                        </Link>

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
