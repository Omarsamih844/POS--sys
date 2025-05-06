import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is already authenticated on mount
    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                // Check Inertia props first (if user is already authenticated server-side)
                const page = window.Inertia?.page;
                if (page?.props?.auth?.user) {
                    setUser(page.props.auth.user);
                    setLoading(false);
                    return;
                }

                // Try to fetch the user data - will only succeed if authenticated
                const response = await axios.get('/api/user', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                setUser(response.data);
            } catch (err) {
                // If error, user is not authenticated - that's okay
                console.log('User not authenticated yet:', err);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password, remember = false) => {
        setLoading(true);
        setError(null);
        
        try {
            console.log("AuthContext - Attempting login with email:", email);
            
            // First try direct password verification
            const directLoginUrl = `${window.location.origin}/check-password.php`;
            console.log("AuthContext - Using direct password verification:", directLoginUrl);
            
            const directResponse = await fetch(directLoginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const directData = await directResponse.json();
            console.log("AuthContext - Direct verification response:", directResponse.status, directData);
            
            if (directResponse.ok && directData.success) {
                // Direct verification succeeded
                console.log("AuthContext - Direct verification successful");
                
                // Set user from direct verification
                setUser(directData.user);
                
                // Try to also authenticate with Laravel to set session cookies
                try {
                    await axios.get('/sanctum/csrf-cookie');
                    await axios.post('/login', { email, password, remember }, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    });
                    
                    console.log("AuthContext - Laravel session also established");
                } catch (sessionError) {
                    // We'll still proceed even if Laravel session fails
                    console.warn("AuthContext - Could not establish Laravel session, but proceeding with login:", sessionError);
                }
                
                return true;
            } else {
                // Direct verification failed
                console.error("AuthContext - Direct verification failed:", directData.message || "Unknown error");
                setError(directData.message || "Invalid login credentials");
                
                // Still try regular Laravel authentication as fallback
                return tryRegularLogin(email, password, remember);
            }
        } catch (err) {
            console.error("AuthContext - Error in direct verification:", err);
            
            // Try regular Laravel authentication as fallback
            return tryRegularLogin(email, password, remember);
        } finally {
            setLoading(false);
        }
    };
    
    // Helper method for regular Laravel login
    const tryRegularLogin = async (email, password, remember = false) => {
        try {
            console.log("AuthContext - Falling back to regular Laravel authentication");
            setLoading(true);
            
            // Get CSRF cookie first
            await axios.get('/sanctum/csrf-cookie');
            
            // Attempt login
            const response = await axios.post('/login', { email, password, remember }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            
            // If login was successful, fetch user data
            if (response.status >= 200 && response.status < 300) {
                const userResponse = await axios.get('/api/user', {
                    headers: {
                        'Accept': 'application/json',
                    },
                    withCredentials: true
                });
                
                setUser(userResponse.data);
                return true;
            }
            
            return false;
        } catch (err) {
            // Pass through validation errors directly
            if (err.response?.status === 422) {
                throw err; // Let the component handle validation errors
            }
            
            // Handle different types of error responses from Laravel
            if (err.response?.data?.errors) {
                // Laravel validation errors
                const errorMessages = Object.values(err.response.data.errors).flat();
                setError(errorMessages.join(' '));
            } else if (err.response?.data?.message) {
                // Single error message
                setError(err.response.data.message);
            } else {
                // Generic error
                setError('Échec de la connexion. Veuillez vérifier vos identifiants.');
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        
        try {
            await axios.post('/logout', {}, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            
            setUser(null);
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout, setError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext; 