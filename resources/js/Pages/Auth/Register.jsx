import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-blue-950">Buat Akun</h2>
                <p className="text-gray-500 text-sm">
                    Bergabung dalam ekosistem Smart Finance.
                </p>
            </div>

            <form onSubmit={submit}>
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full border-gray-300 bg-white rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-3 px-4 shadow-sm placeholder-gray-400 text-gray-800 transition-all"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        placeholder="Masukkan nama Anda..."
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-5 text-left">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                        Email
                    </label>
                    <input
                        type="email"
                        className="mt-1 block w-full border-gray-300 bg-white rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-3 px-4 shadow-sm placeholder-gray-400 text-gray-800 transition-all"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        placeholder="Masukkan email Anda..."
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="mt-1 block w-full border-gray-300 bg-white rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-3 px-4 shadow-sm placeholder-gray-400 text-gray-800 transition-all"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                            placeholder="Masukkan password Anda..."
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                            Confirm
                        </label>
                        <input
                            type="password"
                            className="mt-1 block w-full border-gray-300 bg-white rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-3 px-4 shadow-sm placeholder-gray-400 text-gray-800 transition-all"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                            placeholder="Konfirmasi password"
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <PrimaryButton
                        className="w-full justify-center py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-base font-bold shadow-xl shadow-blue-100 transition-all active:scale-95"
                        disabled={processing}
                    >
                        Daftar Akun
                    </PrimaryButton>
                </div>
                <div className="mt-6 text-center text-sm text-gray-500">
                    Sudah punya akun?{" "}
                    <Link
                        href={route("login")}
                        className="text-blue-600 font-bold hover:underline"
                    >
                        Login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
