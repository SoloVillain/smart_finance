import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    TrendingUp,
    History,
    LayoutDashboard,
    PieChart
} from 'lucide-react';

export default function Dashboard({ auth, contributions = [], stats = {} }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        amount: '',
        tenor: '',
    });

    const submitLoan = (e) => {
        e.preventDefault();
        post(route('loans.store'), {
            onSuccess: () => {
                reset();
                alert('Pengajuan berhasil dikirim! Skor AI sedang menganalisis data Anda.');
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard - Smart Finance" />

            <div className="py-10 bg-[#f8fafc] min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                        <div className="lg:col-span-2 flex flex-col justify-center">
                            <h1 className="text-3xl font-black text-blue-950 mb-2">
                                Halo, {auth.user.name}! 👋
                            </h1>
                            <p className="text-gray-500 font-medium">
                                Progres kontribusi SDG Anda meningkat <span className="text-green-600 font-bold">12%</span> bulan ini.
                            </p>
                        </div>

                        <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 p-8 rounded-[2.5rem] shadow-2xl text-white overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <div className="flex justify-between items-start mb-10">
                                <Wallet size={32} className="text-blue-200" />
                                <span className="text-[10px] bg-blue-500/30 px-3 py-1 rounded-full uppercase tracking-widest font-bold backdrop-blur-sm">Verified Node</span>
                            </div>
                            <div className="text-xs opacity-70 mb-1 uppercase tracking-tighter font-semibold">Total Digital Asset</div>
                            <div className="text-3xl font-mono font-bold tracking-tighter">
                                Rp {stats.total_asset?.toLocaleString() || '0'}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl mb-10 border border-blue-50">
                        <h3 className="font-black text-xl text-blue-950 mb-6 flex items-center gap-3">
                            <LayoutDashboard className="text-blue-600" size={24} />
                            Ajukan Modal Usaha (SDG 8)
                        </h3>

                        <form onSubmit={submitLoan} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col">
                                <label className="text-xs font-bold text-gray-400 uppercase mb-2 ml-2">Jumlah Pinjaman</label>
                                <input
                                    type="number"
                                    placeholder="Min. Rp 500.000"
                                    className="rounded-2xl border-gray-100 bg-gray-50 p-4 focus:ring-blue-500 focus:border-blue-500 transition"
                                    value={data.amount}
                                    onChange={e => setData('amount', e.target.value)}
                                />
                                {errors.amount && <span className="text-red-500 text-xs mt-1 ml-2">{errors.amount}</span>}
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs font-bold text-gray-400 uppercase mb-2 ml-2">Tenor (Bulan)</label>
                                <input
                                    type="number"
                                    placeholder="Contoh: 12"
                                    className="rounded-2xl border-gray-100 bg-gray-50 p-4 focus:ring-blue-500 focus:border-blue-500 transition"
                                    value={data.tenor}
                                    onChange={e => setData('tenor', e.target.value)}
                                />
                                {errors.tenor && <span className="text-red-500 text-xs mt-1 ml-2">{errors.tenor}</span>}
                            </div>

                            <div className="flex items-end">
                                <button
                                    disabled={processing}
                                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:opacity-50 uppercase tracking-widest text-sm"
                                >
                                    {processing ? 'Menganalisis...' : 'Ajukan Pinjaman'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <StatCard
                            title="Total Donasi SDGs"
                            amount={`+ Rp ${stats.total_donasi?.toLocaleString() || '0'}`}
                            icon={<ArrowDownLeft className="text-green-600"/>}
                            color="bg-green-50"
                        />
                        <StatCard
                            title="Pinjaman Aktif"
                            amount={`${stats.loan_count || 0} Program`}
                            icon={<ArrowUpRight className="text-red-600"/>}
                            color="bg-red-50"
                        />
                        <StatCard
                            title="Target Capaian"
                            amount="85% SDG 8"
                            icon={<TrendingUp className="text-blue-600"/>}
                            color="bg-blue-50"
                        />
                    </div>

                    {/* Table Monitoring */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-100/50 border border-white overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                            <div>
                                <h3 className="font-black text-xl text-blue-950 flex items-center gap-3">
                                    <History size={22} className="text-blue-600" /> Monitoring Program SDGs
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">Laporan real-time pemanfaatan fintech untuk target global.</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-[0.15em] font-black">
                                    <tr>
                                        <th className="px-8 py-5">Nama Program</th>
                                        <th className="px-8 py-5">Kategori</th>
                                        <th className="px-8 py-5">Nilai Kontribusi</th>
                                        <th className="px-8 py-5">Status Verifikasi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {contributions.length > 0 ? contributions.map((item) => (
                                        <tr key={item.id} className="hover:bg-blue-50/30 transition duration-200 group">
                                            <td className="px-8 py-6 font-bold text-blue-950 group-hover:text-blue-600">{item.program_name}</td>
                                            <td className="px-8 py-6">
                                                <span className="px-4 py-1.5 bg-blue-900 text-white rounded-xl text-[10px] font-black uppercase tracking-wider">
                                                    {item.sdg_type}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 font-mono font-bold text-gray-700">Rp {Number(item.amount).toLocaleString()}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full shadow-sm ${
                                                        item.status === 'aktif' ? 'bg-green-500 shadow-green-200' :
                                                        item.status === 'pending' ? 'bg-yellow-500 shadow-yellow-200' : 'bg-red-500 shadow-red-200'
                                                    }`}></span>
                                                    <span className={`font-black italic uppercase text-xs ${
                                                        item.status === 'aktif' ? 'text-green-600' :
                                                        item.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                                                    }`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center opacity-30">
                                                    <PieChart size={48} />
                                                    <p className="mt-4 font-bold uppercase tracking-widest text-xs">Belum ada pengajuan pinjaman</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ title, amount, icon, color }) {
    return (
        <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-lg transition duration-300">
            <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
                <h3 className="text-2xl font-black text-blue-950 tracking-tighter">{amount}</h3>
            </div>
            <div className={`p-4 ${color} rounded-2xl shadow-inner`}>
                {icon}
            </div>
        </div>
    );
}
