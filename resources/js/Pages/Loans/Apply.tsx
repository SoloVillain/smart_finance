import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { LayoutDashboard, Upload, FileText, CheckCircle, AlertCircle, X } from "lucide-react";
import { useState, useRef } from "react";

export default function Apply() {
    const { data, setData, post, processing, reset, errors } = useForm({
        amount: "",
        tenor: "",
        ktp: null as File | null,
    });

    const [displayAmount, setDisplayAmount] = useState('');
    const [ktpPreview, setKtpPreview] = useState<string | null>(null);
    const [ktpName, setKtpName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isAmountValid = data.amount !== '' && Number(data.amount) >= 500000;
    const isKtpUploaded = data.ktp !== null;
    const isFormValid = isAmountValid && isKtpUploaded;

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, '');
        if (Number(raw) > 100000000) {
            alert('Jumlah pinjaman maksimal adalah Rp 100.000.000');
            return;
        }
        const formatted = raw ? Number(raw).toLocaleString('id-ID') : '';
        setDisplayAmount(formatted);
        setData("amount", raw);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setData('ktp', file);
        setKtpName(file.name);
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (ev) => setKtpPreview(ev.target?.result as string);
            reader.readAsDataURL(file);
        } else {
            setKtpPreview(null);
        }
    };

    const removeFile = () => {
        setData('ktp', null);
        setKtpPreview(null);
        setKtpName(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;
        post(route('loans.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setDisplayAmount('');
                setKtpPreview(null);
                setKtpName(null);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Ajukan Pinjaman - Smart Finance" />
            <style>{`
                .apply-root {
                    font-family: 'DM Sans', sans-serif;
                    background: #020617;
                    min-height: 100vh;
                    padding: 88px 24px 60px;
                    position: relative;
                    overflow-x: hidden;
                }

                .sf-display { font-family: 'Syne', sans-serif; }

                .apply-bg-orb {
                    position: fixed;
                    border-radius: 50%;
                    filter: blur(100px);
                    pointer-events: none;
                    z-index: 0;
                    animation: orbFloat 12s ease-in-out infinite;
                }
                .apply-bg-orb-1 { width: 600px; height: 600px; background: rgba(59,130,246,0.07); top: -200px; left: -100px; }
                .apply-bg-orb-2 { width: 400px; height: 400px; background: rgba(99,102,241,0.06); bottom: 0; right: -100px; animation-delay: -6s; }

                @keyframes orbFloat {
                    0%, 100% { transform: translate(0,0); }
                    50% { transform: translate(30px,-30px); }
                }

                .apply-grid {
                    position: fixed;
                    inset: 0;
                    background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
                    background-size: 60px 60px;
                    pointer-events: none;
                    z-index: 0;
                }

                .apply-content {
                    position: relative;
                    z-index: 10;
                    max-width: 900px;
                    margin: 0 auto;
                }

                .page-header { margin-bottom: 32px; animation: fadeUp 0.4s ease both; }

                .page-title {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(24px, 3vw, 36px);
                    font-weight: 800;
                    color: white;
                    margin-bottom: 6px;
                }

                .page-title span {
                    background: linear-gradient(135deg, #60a5fa, #818cf8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .page-sub { font-size: 14px; color: #475569; }

                .form-card {
                    background: rgba(15,23,42,0.7);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 24px;
                    padding: 32px;
                    backdrop-filter: blur(10px);
                    animation: fadeUp 0.4s ease 0.1s both;
                    margin-bottom: 20px;
                }

                .section-label {
                    font-family: 'Syne', sans-serif;
                    font-size: 16px;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .section-icon {
                    width: 36px; height: 36px;
                    background: rgba(59,130,246,0.1);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

                .field-label {
                    display: block;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #475569;
                    margin-bottom: 8px;
                }

                .field-input-wrap { position: relative; display: flex; align-items: center; }

                .field-prefix {
                    position: absolute;
                    left: 14px;
                    font-size: 13px;
                    font-weight: 600;
                    color: #475569;
                    pointer-events: none;
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
                    outline: none;
                    transition: all 0.2s;
                }

                .field-input.no-prefix { padding-left: 14px; }
                .field-input::placeholder { color: #334155; }

                .field-input:focus {
                    border-color: rgba(59,130,246,0.5);
                    background: rgba(59,130,246,0.05);
                    box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
                }

                .field-error { font-size: 12px; color: #f87171; margin-top: 5px; }

                /* Upload Zone */
                .upload-zone {
                    border: 2px dashed rgba(255,255,255,0.1);
                    border-radius: 16px;
                    padding: 36px 32px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    background: rgba(255,255,255,0.02);
                }

                .upload-zone:hover {
                    border-color: rgba(59,130,246,0.4);
                    background: rgba(59,130,246,0.04);
                }

                .upload-zone.has-file {
                    border-color: rgba(52,211,153,0.4);
                    background: rgba(52,211,153,0.04);
                    border-style: solid;
                    cursor: default;
                }

                .upload-icon {
                    width: 60px; height: 60px;
                    background: rgba(59,130,246,0.1);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 16px;
                }

                .upload-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 6px;
                }

                .upload-sub { font-size: 13px; color: #475569; line-height: 1.5; }
                .upload-sub span { color: #60a5fa; font-weight: 600; }

                .upload-formats {
                    display: flex;
                    gap: 8px;
                    justify-content: center;
                    margin-top: 14px;
                    flex-wrap: wrap;
                }

                .format-badge {
                    padding: 4px 12px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 100px;
                    font-size: 11px;
                    color: #64748b;
                    font-weight: 600;
                }

                .file-preview { display: flex; align-items: center; gap: 16px; text-align: left; }

                .file-thumb {
                    width: 90px; height: 60px;
                    border-radius: 10px;
                    object-fit: cover;
                    border: 1px solid rgba(255,255,255,0.1);
                    flex-shrink: 0;
                }

                .file-pdf-icon {
                    width: 90px; height: 60px;
                    border-radius: 10px;
                    background: rgba(248,113,113,0.1);
                    border: 1px solid rgba(248,113,113,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .file-info { flex: 1; }
                .file-name { font-weight: 600; color: white; font-size: 14px; margin-bottom: 5px; word-break: break-all; }
                .file-status { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #34d399; font-weight: 600; }

                .file-remove {
                    background: rgba(248,113,113,0.08);
                    border: 1px solid rgba(248,113,113,0.2);
                    border-radius: 8px;
                    padding: 7px 14px;
                    font-size: 12px;
                    color: #f87171;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-family: 'Syne', sans-serif;
                    font-weight: 600;
                    flex-shrink: 0;
                }

                .file-remove:hover { background: rgba(248,113,113,0.15); }

                /* Info Box */
                .info-box {
                    background: rgba(59,130,246,0.06);
                    border: 1px solid rgba(59,130,246,0.15);
                    border-radius: 16px;
                    padding: 20px 24px;
                    margin-bottom: 20px;
                    animation: fadeUp 0.4s ease 0.05s both;
                }

                .info-box-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 14px;
                    font-weight: 700;
                    color: #60a5fa;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .info-list { display: flex; flex-direction: column; gap: 8px; }

                .info-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    font-size: 13px;
                    color: #64748b;
                    line-height: 1.5;
                }

                .info-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #3b82f6;
                    flex-shrink: 0;
                    margin-top: 5px;
                }

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
                    margin-top: 8px;
                }

                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 35px rgba(59,130,246,0.5);
                }

                .submit-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    transform: none;
                    box-shadow: none;
                    background: rgba(59,130,246,0.3);
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 640px) { .form-grid-2 { grid-template-columns: 1fr; } }
            `}</style>

            <div className="apply-root">
                <div className="apply-bg-orb apply-bg-orb-1" />
                <div className="apply-bg-orb apply-bg-orb-2" />
                <div className="apply-grid" />

                <div className="apply-content">
                    <div className="page-header">
                        <div className="page-title sf-display">Ajukan <span>Modal Usaha.</span></div>
                        <div className="page-sub">Pinjaman mikro untuk mendukung SDG 8 — Pekerjaan Layak & Pertumbuhan Ekonomi</div>
                    </div>

                    {/* Info Box */}
                    <div className="info-box">
                        <div className="info-box-title">
                            <AlertCircle size={16} />
                            Syarat & Ketentuan Pengajuan
                        </div>
                        <div className="info-list">
                            <div className="info-item"><div className="info-dot" />Jumlah pinjaman minimum Rp 500.000 dan maksimum Rp 100.000.000</div>
                            <div className="info-item"><div className="info-dot" />Upload KTP sebagai dokumen jaminan identitas (wajib)</div>
                            <div className="info-item"><div className="info-dot" />Skor kredit akan dianalisis otomatis oleh sistem AI kami</div>
                            <div className="info-item"><div className="info-dot" />Hasil analisis dan status persetujuan akan muncul di monitoring dalam 1x24 jam</div>
                        </div>
                    </div>

                    <form onSubmit={submit}>
                        {/* Detail Pinjaman */}
                        <div className="form-card">
                            <div className="section-label sf-display">
                                <div className="section-icon">
                                    <LayoutDashboard size={18} color="#60a5fa" />
                                </div>
                                Detail Pinjaman
                            </div>

                            <div className="form-grid-2">
                                <div>
                                    <label className="field-label">Jumlah Pinjaman</label>
                                    <div className="field-input-wrap">
                                        <span className="field-prefix">Rp</span>
                                        <input
                                            type="text"
                                            className="field-input"
                                            placeholder="500.000"
                                            value={displayAmount}
                                            onChange={handleAmountChange}
                                        />
                                    </div>
                                    {errors.amount && <div className="field-error">{errors.amount}</div>}
                                    {data.amount !== '' && Number(data.amount) < 500000 && (
                                        <div className="field-error">Minimum pinjaman Rp 500.000</div>
                                    )}
                                </div>

                                <div>
                                    <label className="field-label">Tenor (Bulan)</label>
                                    <div className="field-input-wrap">
                                        <input
                                            type="text"
                                            className="field-input no-prefix"
                                            placeholder="Contoh: 12"
                                            value={data.tenor}
                                            onChange={(e) => {
                                                const raw = e.target.value.replace(/\D/g, '');
                                                setData("tenor", raw);
                                            }}
                                        />
                                    </div>
                                    {errors.tenor && <div className="field-error">{errors.tenor}</div>}
                                </div>
                            </div>
                        </div>

                        {/* Upload KTP */}
                        <div className="form-card">
                            <div className="section-label sf-display">
                                <div className="section-icon">
                                    <FileText size={18} color="#60a5fa" />
                                </div>
                                Upload Dokumen KTP
                                <span style={{ fontSize: '11px', color: '#f87171', fontWeight: 600 }}>* Wajib</span>
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                accept=".jpg,.jpeg,.png,.pdf"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />

                            {!ktpName ? (
                                <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
                                    <div className="upload-icon">
                                        <Upload size={26} color="#60a5fa" />
                                    </div>
                                    <div className="upload-title">Klik untuk upload KTP Anda</div>
                                    <div className="upload-sub">
                                        atau <span>drag & drop</span> file ke sini
                                    </div>
                                    <div className="upload-formats">
                                        <span className="format-badge">JPG</span>
                                        <span className="format-badge">PNG</span>
                                        <span className="format-badge">PDF</span>
                                        <span className="format-badge">Max 2MB</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="upload-zone has-file">
                                    <div className="file-preview">
                                        {ktpPreview ? (
                                            <img src={ktpPreview} className="file-thumb" alt="Preview KTP" />
                                        ) : (
                                            <div className="file-pdf-icon">
                                                <FileText size={28} color="#f87171" />
                                            </div>
                                        )}
                                        <div className="file-info">
                                            <div className="file-name">{ktpName}</div>
                                            <div className="file-status">
                                                <CheckCircle size={13} />
                                                File siap diupload
                                            </div>
                                        </div>
                                        <button type="button" className="file-remove" onClick={removeFile}>
                                            <X size={13} /> Hapus
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="submit-btn" disabled={processing || !isFormValid}>
                            {processing
                                ? "⏳ Menganalisis & Mengunggah..."
                                : !isKtpUploaded
                                ? "📎 Upload KTP Terlebih Dahulu"
                                : !isAmountValid
                                ? "💰 Masukkan Jumlah Pinjaman (Min. Rp 500.000)"
                                : "🚀 Ajukan Pinjaman Sekarang"
                            }
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
