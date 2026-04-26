import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Landmark, Info, CheckCircle } from 'lucide-react';

type Loan = {
    id: number;
    program_name: string;
    amount: number;
    status: string;
};

type LoansProps = {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
    active_loans: Loan[];
};

export default function Loans({ auth, active_loans }: LoansProps) {
    const { data, setData, post, processing, errors } = useForm({
        program_name: '',
        amount: '',
        sdg_type: 'SDG 8',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('loans.apply'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Pinjaman Mikro SDGs" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                                    <Landmark size={24} />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Form Pengajuan Pinjaman Mikro</h2>
                            </div>

                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nama Usaha / Program UMKM</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        onChange={e => setData('program_name', e.target.value)}
                                        placeholder="Contoh: Toko Kelontong Berkah"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Jumlah Pinjaman (IDR)</label>
                                        <input
                                            type="number"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            onChange={e => setData('amount', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Kategori SDG</label>
                                        <select
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            onChange={e => setData('sdg_type', e.target.value)}
                                        >
                                            <option value="SDG 1">SDG 1 - Tanpa Kemiskinan</option>
                                            <option value="SDG 8">SDG 8 - Pekerjaan Layak</option>
                                            <option value="SDG 9">SDG 9 - Industri & Inovasi</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    disabled={processing}
                                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                                >
                                    {processing ? 'Memproses...' : 'Ajukan Pinjaman Sekarang'}
                                </button>
                            </form>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-xl">
                                <h3 className="font-bold flex items-center gap-2 mb-4">
                                    <Info size={18} /> Syarat & Ketentuan
                                </h3>
                                <ul className="text-sm space-y-3 text-blue-100">
                                    <li className="flex gap-2"><CheckCircle size={14} className="shrink-0" /> Terdaftar sebagai anggota Smart Finance.</li>
                                    <li className="flex gap-2"><CheckCircle size={14} className="shrink-0" /> Memiliki usaha yang mendukung SDGs.</li>
                                    <li className="flex gap-2"><CheckCircle size={14} className="shrink-0" /> Lolos verifikasi Big Data/AI.</li>
                                </ul>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-4">Status Pengajuan Anda</h3>
                                {active_loans.length > 0 ? (
                                    <div className="space-y-3">
                                        {active_loans.map((loan) => (
                                            <div key={loan.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                <p className="text-sm font-bold">{loan.program_name}</p>
                                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                    <span>{loan.status}</span>
                                                    <span>Rp {Number(loan.amount).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-400 italic">Belum ada pengajuan aktif.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
