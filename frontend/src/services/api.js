import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Movies API
export const moviesAPI = {
  getAll: () => api.get('/movies'),
  getById: (id) => api.get(`/movies/${id}`),
  getNowShowing: () => api.get('/movies/now-showing'),
  getComingSoon: () => api.get('/movies/coming-soon'),
};

// Cinemas API
export const cinemasAPI = {
  getAll: () => api.get('/cinemas'),
  getById: (id) => api.get(`/cinemas/${id}`),
  getShowtimes: (cinemaId, movieId, date) => 
    api.get(`/cinemas/${cinemaId}/showtimes`, { params: { movie_id: movieId, date } }),
};

// Showtimes API
export const showtimesAPI = {
  getById: (id) => api.get(`/showtimes/${id}`),
  getSeats: (id) => api.get(`/showtimes/${id}/seats`),
};

// Bookings API
export const bookingsAPI = {
  create: (data) => api.post('/bookings', data),
  getMyBookings: () => api.get('/bookings/my'),
  getById: (id) => api.get(`/bookings/${id}`),
  cancel: (id) => api.delete(`/bookings/${id}`),
};

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// Promotions API
export const promotionsAPI = {
  getAll: () => api.get('/promotions'),
  validateCode: (code) => api.post('/promotions/validate', { code }),
};

// FnB API
export const fnbAPI = {
  getAll: () => api.get('/fnb'),
  getCategories: () => api.get('/fnb/categories'),
};

// Membership API
export const membershipAPI = {
  getPlans: () => api.get('/membership/plans'),
  subscribe: (planId) => api.post('/membership/subscribe', { plan_id: planId }),
  getMyMembership: () => api.get('/membership/my'),
};

export default api;
