import api from './api';

export const authService = {
  async login(credentials) {
    const response = await api.post('/oauth/token', {
      grant_type: 'password',
      client_id: 'TU_CLIENT_ID', // Reemplaza con tu client ID de Passport
      client_secret: 'TU_CLIENT_SECRET', // Reemplaza con tu client secret
      username: credentials.email,
      password: credentials.password,
      scope: '',
    });
    
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      // Obtener datos del usuario
      const userResponse = await api.get('/user');
      localStorage.setItem('user', JSON.stringify(userResponse.data));
    }
    
    return response.data;
  },

  async register(userData) {
    const response = await api.post('/register', userData);
    return response.data;
  },

  async logout() {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  },
};