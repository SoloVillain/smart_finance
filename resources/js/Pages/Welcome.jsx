import { Link, Head } from '@inertiajs/react';
import { ShieldCheck, Zap, Globe, ArrowRight } from 'lucide-react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome - Smart Finance" />
            <div className="min-h-screen bg-white text-gray-900 font-sans">
                {/* Navbar */}
                <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
                            S
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-blue-900">Smart<span className="text-blue-600">Finance.</span></span>
                    </div>
                    <div className="flex gap-4">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="font-semibold text-blue-600 hover:text-blue-800 transition">Dashboard</Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="font-semibold text-gray-600 hover:text-blue-600 transition">Log in</Link>
                                <Link href={route('register')} className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition shadow-md shadow-blue-100">Get Started</Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                            Fintech for SDGs 2026
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-blue-950 leading-[1.1] mb-6">
                            Smart Finance for <span className="text-blue-600">Smart Goals.</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
                            Mendorong inklusi keuangan dan mempercepat pencapaian SDGs melalui teknologi pintar. Solusi digital untuk UMKM dan masyarakat luas.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href={route('register')} className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-xl shadow-blue-200">
                                Mulai Sekarang <ArrowRight size={20} />
                            </Link>
                            <a href="#features" className="px-8 py-4 rounded-2xl font-bold text-gray-700 border border-gray-200 hover:bg-gray-50 transition">
                                Pelajari Fitur
                            </a>
                        </div>
                    </div>

                    {/* Visual Element (Card Mockup) */}
                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                        <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 p-8 rounded-[2rem] shadow-2xl text-white overflow-hidden">
                            <div className="flex justify-between items-start mb-12">
                                <Zap size={40} className="text-blue-300" />
                                <div className="text-right uppercase tracking-widest text-xs opacity-60">Verified by Bank Indonesia</div>
                            </div>
                            <div className="mb-2 text-sm opacity-80">Total SDG Impact Contribution</div>
                            <div className="text-4xl font-mono font-bold mb-8 tracking-tighter">Rp ∞</div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-[10px] uppercase opacity-50 mb-1">Team Kelompok 4</div>
                                    <div className="text-sm font-medium">Akbar, Calvin, Ridhwan</div>
                                </div>
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-blue-800"></div>
                                    <div className="w-8 h-8 rounded-full bg-blue-300 border-2 border-blue-800"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Features Section */}
                <section id="features" className="bg-gray-50 py-24">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-blue-950 mb-4">Pilar Utama Layanan Kami</h2>
                            <p className="text-gray-600">Didesain untuk mendukung SDG 1, 8, dan 9 secara konsisten.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Globe size={24} className="text-blue-600"/>}
                                title="Inklusi Global"
                                desc="Menghubungkan masyarakat terpencil dengan akses layanan keuangan digital."
                            />
                            <FeatureCard
                                icon={<ShieldCheck size={24} className="text-green-600"/>}
                                title="Aman & Terpercaya"
                                desc="Verifikasi data berbasis AI untuk memastikan dana tersalurkan dengan tepat."
                            />
                            <FeatureCard
                                icon={<Zap size={24} className="text-yellow-600"/>}
                                title="Proses Cepat"
                                desc="Pencairan dana pinjaman mikro dalam hitungan menit untuk pelaku UMKM."
                            />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition duration-300">
            <div className="mb-6 w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-3">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}
