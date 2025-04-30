import { useEffect } from "react";
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword, users }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const handleUserSelect = (e) => {
        const selectedUser = users.find(user => user.id === parseInt(e.target.value));
        if (selectedUser) {
            setData("email", selectedUser.email);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div 
            className="min-h-screen flex flex-col justify-center sm:px-6 lg:px-8 pb-10"
            style={{
                backgroundImage: 'url("/images/76473660_l.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm"></div>
            <div className="relative z-10">
                <Head title="Login" />

                <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
                    <div className="flex justify-center mb-6 relative">
                        <img
                            src="/images/logo-apixel.png"
                            alt="Logo"
                            className="h-28 w-auto transform transition-all duration-500 hover:scale-105"
                        />
                        <div className="absolute -bottom-1 w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transform origin-left transition-all duration-500 hover:scale-x-110"></div>
                    </div>
                    <h2 className="text-sm text-center text-white font-medium">
                        Point of Sale Management System
                    </h2>
                </div>

                <div className="flex justify-center">
                    <div className="w-full max-w-md bg-white/85 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-blue-500/30">
                        <div className="p-8">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 text-center">
                                    Welcome Back
                                </h2>
                                <p className="text-sm text-gray-600 mt-2 text-center">
                                    Please sign in to your account
                                </p>
                            </div>

                            {status && (
                                <div className="mb-4 font-medium text-sm text-green-600">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div className="group">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform duration-300 group-focus-within:scale-110">
                                            <svg 
                                                className="h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-blue-500"
                                                xmlns="http://www.w3.org/2000/svg" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                strokeWidth={1.5} 
                                                stroke="currentColor"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" 
                                                />
                                            </svg>
                                        </div>
                                        <select
                                            onChange={handleUserSelect}
                                            className="pl-10 w-full h-10 text-sm border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                            required
                                        >
                                            <option value="">Select a user</option>
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.first_name} {user.last_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <InputError
                                        message={errors.email}
                                        className="mt-1"
                                    />
                                </div>

                                <div className="group">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform duration-300 group-focus-within:scale-110">
                                            <svg
                                                className="h-4 w-4 text-gray-400 transition-colors duration-300 group-focus-within:text-blue-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={data.password}
                                            className="pl-10 w-full h-10 text-sm border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                            autoComplete="current-password"
                                            onChange={(e) =>
                                                setData("password", e.target.value)
                                            }
                                        />
                                    </div>
                                    <InputError
                                        message={errors.password}
                                        className="mt-1"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center group">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked
                                                )
                                            }
                                            className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                                        />
                                        <span className="ml-2 text-xs text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                                            Keep me logged in
                                        </span>
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-xs text-blue-600 hover:text-blue-700 transition-colors duration-300"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>

                                <div>
                                    <PrimaryButton
                                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                        disabled={processing}
                                    >
                                        {processing ? "Signing in..." : "Log in"}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
