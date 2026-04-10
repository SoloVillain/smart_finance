import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import { Head, useForm } from "@inertiajs/react";

export default function Dashboard({ auth, pendingLoans, stats }) {
    // 1. Inisialisasi useForm dengan benar (tambahkan const)
    const { post, processing, setData } = useForm({
        action: "", // inisialisasi awal
    });

    const handleVerify = (loanId, actionType) => {
        const message = actionType === "approve" ? "menyetujui" : "menolak";

        if (confirm(`Apakah Anda yakin ingin ${message} pinjaman ini?`)) {
            // CARA TERAMAN: Gunakan router langsung dari @inertiajs/react
            // jika useForm terasa ribet untuk pengiriman data dinamis


            router.post(
                route("admin.loans.verify", { loan: loanId }),
                {
                    action: actionType, // Data dikirim di sini
                },
                {
                    preserveScroll: true,
                    onSuccess: () => alert("Berhasil memperbarui status!"),
                    onError: (errors) => alert("Gagal: " + errors.action),
                },
            );
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Admin Dashboard - Manajemen Pinjaman
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Ringkasan Statistik */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-400">
                            <p className="text-sm text-gray-500 uppercase font-bold text-yellow-600">
                                Menunggu Verifikasi
                            </p>
                            <p className="text-2xl font-semibold">
                                {stats?.total_pending || 0}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-400">
                            <p className="text-sm text-gray-500 uppercase font-bold text-green-600">
                                Pinjaman Aktif
                            </p>
                            <p className="text-2xl font-semibold">
                                {stats?.total_aktif || 0}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-400">
                            <p className="text-sm text-gray-500 uppercase font-bold text-blue-600">
                                Total Dampak SDG 8
                            </p>
                            <p className="text-2xl font-semibold text-blue-600">
                                Rp{" "}
                                {stats?.total_sdg_impact?.toLocaleString(
                                    "id-ID",
                                ) || 0}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4 text-gray-700 border-b pb-2">
                            Daftar Pengajuan Pinjaman Mikro (Status: Pending)
                        </h3>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b">
                                        <th className="p-4 font-semibold text-gray-600">
                                            Peminjam
                                        </th>
                                        <th className="p-4 font-semibold text-gray-600">
                                            Jumlah Pinjaman
                                        </th>
                                        <th className="p-4 font-semibold text-gray-600 text-center">
                                            Skor AI
                                        </th>
                                        <th className="p-4 font-semibold text-gray-600 text-center">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingLoans && pendingLoans.length > 0 ? (
                                        pendingLoans.map((loan) => (
                                            <tr
                                                key={loan.id}
                                                className="border-b hover:bg-gray-50 transition"
                                            >
                                                <td className="p-4">
                                                    <div className="font-medium text-gray-900">
                                                        {loan.user?.name ||
                                                            "Unknown"}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {loan.user?.email}
                                                    </div>
                                                </td>
                                                <td className="p-4 font-semibold text-gray-700">
                                                    Rp{" "}
                                                    {loan.amount?.toLocaleString(
                                                        "id-ID",
                                                    )}
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                            loan.skor_kredit >=
                                                            70
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-red-100 text-red-700"
                                                        }`}
                                                    >
                                                        {loan.skor_kredit ||
                                                            "N/A"}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex justify-center space-x-2">
                                                        <button
                                                            onClick={() =>
                                                                handleVerify(
                                                                    loan.id,
                                                                    "approve",
                                                                )
                                                            }
                                                            disabled={
                                                                processing
                                                            }
                                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-xs font-bold shadow-sm transition disabled:opacity-50"
                                                        >
                                                            Setujui
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleVerify(
                                                                    loan.id,
                                                                    "reject",
                                                                )
                                                            }
                                                            disabled={
                                                                processing
                                                            }
                                                            className="bg-white border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-md text-xs font-bold transition disabled:opacity-50"
                                                        >
                                                            Tolak
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="p-10 text-center text-gray-500 italic"
                                            >
                                                Tidak ada pengajuan pinjaman
                                                yang menunggu verifikasi.
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
