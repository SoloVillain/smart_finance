import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { ShieldCheck, User, Activity, Smartphone, ChevronRight } from 'lucide-react';

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-3xl font-black text-blue-950 tracking-tighter">
                    Set<span className="text-blue-600">ting.</span>
                </h2>
            }
        >
            <Head title="Settings" />

            <div className="py-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-20">

                {/* --- HEADER PROFILE CARD (Sesuai Prototype) --- */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-100/50 border border-white flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-blue-50 uppercase">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-blue-950">{user.name}</h3>
                        <p className="text-gray-500 font-medium">{user.email}</p>
                    </div>
                </div>

                {/* --- SEKSI 1: KEAMANAN AKUN --- */}
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-100/50 border border-white overflow-hidden">
                    <div className="p-8 border-b border-gray-50">
                        <h4 className="flex items-center gap-3 text-lg font-black text-blue-950">
                            <ShieldCheck className="text-blue-600" size={20} /> Keamanan Akun
                        </h4>
                    </div>
                    <div className="p-8 space-y-10">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>

                {/* --- SEKSI 2: VERIFIKASI IDENTITAS (Placeholder sesuai Prototype) --- */}
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-100/50 border border-white overflow-hidden">
                    <div className="p-8 border-b border-gray-50">
                        <h4 className="flex items-center gap-3 text-lg font-black text-blue-950">
                            <User className="text-blue-600" size={20} /> Verifikasi Identitas
                        </h4>
                    </div>
                    <div className="p-8">
                         <div className="flex justify-between items-center group cursor-pointer">
                            <span className="font-bold text-gray-700">KYC (Know Your Customer)</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-black uppercase italic">Verified</span>
                                <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
                            </div>
                         </div>
                    </div>
                </div>

                {/* --- SEKSI 3: INFORMASI PROFIL --- */}
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-100/50 border border-white overflow-hidden">
                    <div className="p-8 border-b border-gray-50">
                        <h4 className="flex items-center gap-3 text-lg font-black text-blue-950">
                            <Activity className="text-blue-600" size={20} /> Informasi Dasar
                        </h4>
                    </div>
                    <div className="p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>
                </div>

                {/* --- SEKSI 4: PENGATURAN APLIKASI (Visual Only) --- */}
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-100/50 border border-white overflow-hidden">
                    <div className="p-8 border-b border-gray-50">
                        <h4 className="flex items-center gap-3 text-lg font-black text-blue-950">
                            <Smartphone className="text-blue-600" size={20} /> Pengaturan Aplikasi
                        </h4>
                    </div>
                    <div className="divide-y divide-gray-50">
                        <MenuLink label="Tema" value="Light Mode" />
                        <MenuLink label="Bahasa" value="Indonesia" />
                        <MenuLink label="Notifikasi" value="Aktif" />
                    </div>
                </div>

                {/* --- DANGER ZONE --- */}
                <div className="bg-red-50 rounded-[2.5rem] p-8 border border-red-100">
                    <h4 className="text-lg font-black text-red-600 mb-4">Zona Bahaya</h4>
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Sub-component untuk baris menu simpel
function MenuLink({ label, value }) {
    return (
        <div className="px-8 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer group">
            <span className="font-bold text-gray-700">{label}</span>
            <div className="flex items-center gap-3 text-gray-400">
                <span className="text-sm font-medium">{value}</span>
                <ChevronRight size={18} className="group-hover:text-blue-600 transition-colors" />
            </div>
        </div>
    );
}
