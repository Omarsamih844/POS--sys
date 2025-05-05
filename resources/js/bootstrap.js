import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Accept'] = 'application/json';

// Configure axios to include credentials for cross-domain requests
window.axios.defaults.withCredentials = true;

// Use the current domain as the baseURL
window.axios.defaults.baseURL = window.location.origin;

// Log axios configuration in development
if (process.env.NODE_ENV !== 'production') {
    console.log('Axios configured with:');
    console.log('- withCredentials:', window.axios.defaults.withCredentials);
    console.log('- baseURL:', window.axios.defaults.baseURL);
}
