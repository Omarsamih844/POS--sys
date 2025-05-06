import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { useAuth } from '@/Contexts/AuthContext';

const LoginModal = ({ isOpen, onClose, users = [] }) => {
    console.log('LoginModal - Received users:', users);
    
    const [localUsers, setLocalUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [loginError, setLoginError] = useState(null);
    
    const { login } = useAuth();
    
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // Fetch users directly if none are provided
    useEffect(() => {
        console.log("LoginModal - isOpen:", isOpen, "users length:", users.length);
        
        // Initialize localUsers with users from props if available
        if (users && users.length > 0) {
            console.log("LoginModal - Using users from props:", users);
            setLocalUsers(users);
            return;
        }
        
        // Fetch users from API if none are in props
        if (isOpen && localUsers.length === 0 && !loading) {
            setLoading(true);
            console.log("LoginModal - Fetching users from API");
            
            // Direct database access using our custom PHP script
            const dbUsersUrl = `${window.location.origin}/db-users.php`;
            console.log("LoginModal - Trying direct DB access:", dbUsersUrl);
            
            fetch(dbUsersUrl)
                .then(response => {
                    console.log("LoginModal - Direct DB access response status:", response.status);
                    if (!response.ok) {
                        throw new Error(`Server responded with ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("LoginModal - Direct DB data:", data);
                    if (data && Array.isArray(data) && data.length > 0) {
                        // Got actual users from the database!
                        setLocalUsers(data);
                        console.log("LoginModal - Using real users from DB:", data.length);
                        setLoading(false);
                    } else if (data && data.error) {
                        // Server returned an error
                        throw new Error(data.message || "Database error");
                    } else {
                        throw new Error("No users returned from database");
                    }
                })
                .catch(error => {
                    console.error("LoginModal - Direct DB error:", error);
                    
                    // Fall back to test users if DB access fails
                    const directTestUrl = `${window.location.origin}/test-api.php`;
                    console.log("LoginModal - Falling back to test users:", directTestUrl);
                    
                    fetch(directTestUrl)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Server responded with ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(testData => {
                            if (testData && Array.isArray(testData) && testData.length > 0) {
                                setLocalUsers(testData);
                                console.log("LoginModal - Fallback: Using test users");
                                setFetchError("Using test users (could not access database)");
                            } else {
                                throw new Error("Invalid test data format");
                            }
                        })
                        .catch(testError => {
                            console.error("LoginModal - Test user fallback error:", testError);
                            tryRegularApiMethods();
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                });
        }
        
        return () => {
            reset("password");
        };
    }, [isOpen, users]);
    
    // Separate function to try regular API methods
    const tryRegularApiMethods = () => {
        // Try the test endpoint with both relative and absolute URL
        const apiUrl = `/api/test-users`;
        const absoluteUrl = `${window.location.origin}/api/test-users`;
        
        console.log("LoginModal - Falling back to regular API methods");
        console.log("- Relative URL:", apiUrl);
        console.log("- Absolute URL:", absoluteUrl);
        
        // Try with axios
        axios.get(apiUrl)
            .then(response => {
                console.log("LoginModal - API test response:", response.data);
                // Check for the success flag and users data in our test response
                if (response.data && response.data.success && Array.isArray(response.data.users)) {
                    setLocalUsers(response.data.users);
                    console.log("LoginModal - Found " + response.data.user_count + " users");
                } else {
                    console.log("LoginModal - No users returned from API or invalid response");
                    setFetchError("No users found or invalid response format");
                    setLocalUsers([]);
                }
            })
            .catch(error => {
                console.error("LoginModal - Error fetching users:", error);
                const errorMessage = error.response 
                    ? `Server error: ${error.response.status} - ${error.response.statusText}`
                    : error.message || "Failed to fetch users";
                setFetchError(errorMessage);
                setLocalUsers([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleUserSelect = (e) => {
        const selectedUserId = parseInt(e.target.value);
        console.log("LoginModal - Selected user ID:", selectedUserId);
        
        const usersToCheck = localUsers.length > 0 ? localUsers : users;
        const selectedUser = usersToCheck.find(user => user.id === selectedUserId);
        
        if (selectedUser) {
            console.log("LoginModal - Selected user:", selectedUser);
            setData("email", selectedUser.email);
        } else {
            console.log("LoginModal - No user found with ID:", selectedUserId);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        
        if (!data.email || !data.password) {
            setLoginError('Email and password are required');
            return;
        }
        
        setLoginError(null);
        setLoading(true);
        
        try {
            console.log("LoginModal - Submitting login for:", data.email);
            const success = await login(data.email, data.password, data.remember);
            
            if (success) {
                reset('password');
                onClose();
            } else {
                setLoginError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error("LoginModal - Login error:", error);
            setLoginError(error.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    // Ensure we have users to render
    const usersToRender = localUsers.length > 0 ? localUsers : users;
    
    console.log("LoginModal - Users to render:", usersToRender);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 flex justify-between items-center">
                    <h2 className="text-white text-xl font-bold text-center w-full">Système de Caisse</h2>
                    {/* <button 
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button> */}
                </div>
                
                <form onSubmit={submit} className="p-6">
                    <div className="mb-6">
                        <img 
                            src="/images/logo-apixel.png" 
                            alt="Logo" 
                            className="mx-auto h-20 mb-4 transform transition-all duration-500 hover:scale-105 drop-shadow-xl bg-white/90 p-3 rounded-xl" 
                            onError={(e) => {
                                // Try backup image if main image fails to load
                                e.target.src = "/images/logo.png";
                                e.target.onerror = () => e.target.style.display = 'none';
                            }}
                        />
                        {/* <h3 className="text-center text-lg font-semibold mb-1">Système de Caisse</h3> */}
                        <p className="text-center text-gray-600 text-sm">Connectez-vous pour accéder au système</p>
                    </div>
                    
                    {/* Add debug info */}
                    <div className="mb-2 p-2 bg-gray-100 rounded text-xs">
                        <div>Debug: {usersToRender.length} users available</div>
                        {fetchError && <div className="text-red-500">Error: {fetchError}</div>}
                        {loginError && <div className="text-red-500 font-bold">Login Error: {loginError}</div>}
                        {usersToRender.length === 0 && <div className="text-red-500">No users to display! Check Console for errors.</div>}
                    </div>
                    
                    <div className="group mb-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform duration-300 group-focus-within:scale-110">
                                <svg 
                                    className="h-5 w-5 text-gray-500 transition-colors duration-300 group-focus-within:text-gray-700"
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
                                className="pl-10 w-full h-11 text-sm border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500 transition-all duration-300 bg-gray-50/50"
                                required
                                disabled={loading}
                            >
                                <option value="">{loading ? 'Loading users...' : 'Select a user'}</option>
                                {usersToRender.map((user) => (
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
                    
                    <div className="group mb-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform duration-300 group-focus-within:scale-110">
                                <svg
                                    className="h-4 w-4 text-gray-500 transition-colors duration-300 group-focus-within:text-gray-700"
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
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                className="pl-10 w-full h-11 text-sm border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500 transition-all duration-300 bg-gray-50/50"
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        <InputError
                            message={errors.password}
                            className="mt-1"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-800 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-4"
                        disabled={processing || loading}
                    >
                        {processing || loading ? "Signing in..." : "Log in"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;