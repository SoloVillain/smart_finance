import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8fafc] relative overflow-hidden">
            {/* Dekorasi Background */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60 translate-x-1/4 translate-y-1/4"></div>

            <div className="z-10 w-full sm:max-w-md mt-6 px-10 py-12 bg-white/80 backdrop-blur-md shadow-2xl shadow-blue-100 border border-white sm:rounded-[2.5rem]">
                <div className="flex justify-center mb-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            S
                        </div>
                        <span className="text-xl font-extrabold text-blue-950">Smart<span className="text-blue-600">Finance.</span></span>
                    </Link>
                </div>
                {children}
            </div>

            <p className="z-10 mt-8 text-sm text-gray-400">
                &copy; 2026 Kelompok 4 IMK - Smart Goals
            </p>
        </div>
    );
}
