import React, { useState, useEffect } from 'react';
import { useAuth } from '@/Contexts/AuthContext';
import LoginModal from './LoginModal';
import axios from 'axios';

const ProtectedRoute = ({ children, users = [] }) => {
    console.log("ProtectedRoute - Initial users:", users);
    
    const { user, loading } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loadedUsers, setLoadedUsers] = useState(users || []);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        // If users prop changes and contains data, update loadedUsers
        if (users && users.length > 0) {
            console.log("ProtectedRoute - Updating users from props:", users);
            setLoadedUsers(users);
        }
    }, [users]);

    useEffect(() => {
        // Once loading is done, if user is not authenticated, show login modal
        if (!loading && !user) {
            console.log("ProtectedRoute - User not authenticated, should show login modal");
            
            // If users were not provided as props, fetch them
            if (loadedUsers.length === 0 && !loadingUsers) {
                console.log("ProtectedRoute - No users loaded, fetching from API");
                setLoadingUsers(true);
                
                // Try direct DB access first
                const dbUsersUrl = `${window.location.origin}/db-users.php`;
                console.log("ProtectedRoute - Trying direct DB access:", dbUsersUrl);
                
                fetch(dbUsersUrl)
                    .then(response => {
                        console.log("ProtectedRoute - Direct DB access response:", response.status);
                        if (!response.ok) {
                            throw new Error(`Server responded with ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log("ProtectedRoute - Direct DB data:", data);
                        if (data && Array.isArray(data) && data.length > 0) {
                            setLoadedUsers(data);
                            console.log("ProtectedRoute - Using real users from DB:", data.length);
                        } else if (data && data.error) {
                            throw new Error(data.message || "Database error");
                        } else {
                            throw new Error("No users returned from database");
                        }
                    })
                    .catch(error => {
                        console.error("ProtectedRoute - Direct DB error:", error);
                        
                        // Fall back to test users if DB access fails
                        const testUsersUrl = `${window.location.origin}/test-api.php`;
                        
                        fetch(testUsersUrl)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`Server responded with ${response.status}`);
                                }
                                return response.json();
                            })
                            .then(testData => {
                                if (testData && Array.isArray(testData) && testData.length > 0) {
                                    setLoadedUsers(testData);
                                    setFetchError("Using test users (could not access database)");
                                } else {
                                    throw new Error("Invalid test data format");
                                }
                            })
                            .catch(testError => {
                                console.error("ProtectedRoute - Test user fallback error:", testError);
                                
                                // Finally fall back to axios API call
                                axiosFetchUsers();
                            });
                    })
                    .finally(() => {
                        setLoadingUsers(false);
                        setShowLoginModal(true);
                    });
            } else {
                console.log("ProtectedRoute - Using existing users:", loadedUsers);
                setShowLoginModal(true);
            }
        } else if (user) {
            console.log("ProtectedRoute - User authenticated:", user);
            setShowLoginModal(false);
        }
    }, [user, loading]);

    // Helper function for the axios fallback
    const axiosFetchUsers = () => {
        axios.get('/api/users')
            .then(response => {
                console.log("ProtectedRoute - API response:", response.data);
                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setLoadedUsers(response.data);
                } else {
                    console.log("ProtectedRoute - API returned no users");
                    setFetchError("No users found in database");
                    setLoadedUsers([]);
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setFetchError(error.message || "Failed to fetch users");
                setLoadedUsers([]);
            });
    };

    if (loading || loadingUsers) {
        return (
            <div className="fixed inset-0 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="mt-2 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Add debug info when in development */}
            {process.env.NODE_ENV !== 'production' && !user && (
                <div className="fixed top-0 left-0 bg-red-100 p-2 text-xs z-50 max-w-xs opacity-80">
                    <div>Auth state: {user ? 'Logged in' : 'Not logged in'}</div>
                    <div>Users available: {loadedUsers.length}</div>
                    {fetchError && <div className="text-red-600">Error: {fetchError}</div>}
                </div>
            )}
            
            {/* Render the login modal if needed */}
            <LoginModal 
                isOpen={showLoginModal} 
                onClose={() => {
                    // Only allow closing if authenticated
                    if (user) {
                        setShowLoginModal(false);
                    }
                }}
                users={loadedUsers}
            />
            
            {/* Render the protected content */}
            {children}
        </>
    );
};

export default ProtectedRoute; 