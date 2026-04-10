import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    // Ganti bagian return di Login.jsx
    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-blue-950">
                    Selamat Datang!
                </h2>
                <p className="text-gray-500 text-sm">
                    Masuk untuk memantau progres SDGs Anda.
                </p>
            </div>

            <form onSubmit={submit}>
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        className="mt-1 block w-full border-gray-300 bg-white rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-3 px-4 shadow-sm placeholder-gray-400 text-gray-800 transition-all"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="Masukkan email Anda..."
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                        Password
                    </label>
                    <input
                        type="password"
                        className="mt-1 block w-full border-gray-300 bg-white rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-3 px-4 shadow-sm placeholder-gray-400 text-gray-800 transition-all"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder="Masukkan password Anda..."
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between mt-6">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Ingat saya
                        </span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm text-blue-600 hover:underline font-medium"
                        >
                            Lupa sandi?
                        </Link>
                    )}
                </div>

                <div className="mt-8">
                    <PrimaryButton
                        className="w-full justify-center py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-base font-bold shadow-xl shadow-blue-100 transition-all active:scale-95"
                        disabled={processing}
                    >
                        Masuk Sekarang
                    </PrimaryButton>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Belum punya akun?{" "}
                    <Link
                        href={route("register")}
                        className="text-blue-600 font-bold hover:underline"
                    >
                        Daftar gratis
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
