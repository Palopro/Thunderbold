const axios = require('axios');

module.exports = {
    setHeader(token) {
        if (token) {
            localStorage.removeItem('jwtToken');
            localStorage.setItem('jwtToken',
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`);
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }
};