import React from 'react';
import { Head } from '@inertiajs/react';

export default function SmartFinance({ data, team }) {
    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <Head title="Smart Finance - SDGs" />

            <header className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-blue-900 mb-2">{team.theme}</h1>
                <p className="text-gray-600 italic">Disusun oleh: {team.members.join(' & ')}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {['SDG 1', 'SDG 8', 'SDG 9'].map((sdg) => (
                    <div key={sdg} className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
                        <h3 className="text-sm font-bold text-gray-500 uppercase">{sdg}</h3>
                        <p className="text-2xl font-bold text-gray-800">
                            {data.filter(item => item.sdg_type === sdg).length} Program Aktif
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 bg-blue-900">
                    <h2 className="text-white font-semibold text-lg">Monitoring Pembiayaan Fintech</h2>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Nama Program</th>
                            <th className="px-6 py-4">Kategori SDG</th>
                            <th className="px-6 py-4">Jumlah (IDR)</th>
                            <th className="px-6 py-4">Status Verifikasi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.length > 0 ? data.map((item) => (
                            <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                                <td className="px-6 py-4 font-medium">{item.program_name}</td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                                        {item.sdg_type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-mono">Rp {Number(item.amount).toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className="text-green-600 flex items-center gap-1">
                                        ✔ {item.status}
                                    </span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-gray-400">
                                    Belum ada data pembiayaan. Silakan tambahkan via Database/Admin Dashboard.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
