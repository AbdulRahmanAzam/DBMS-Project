import axios from 'axios';

// Base URL for API - Update this based on your backend configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear storage and redirect to login
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// Patient API
export const patientAPI = {
  getAll: () => api.get('/patients'),
  getById: (id) => api.get(`/patients/${id}`),
  search: (query) => api.get(`/patients/search?q=${query}`),
  create: (data) => api.post('/patients', data),
  update: (id, data) => api.put(`/patients/${id}`, data),
  delete: (id) => api.delete(`/patients/${id}`),
};

// Doctor API
export const doctorAPI = {
  getAll: () => api.get('/doctors'),
  getById: (id) => api.get(`/doctors/${id}`),
  getByDepartment: (departmentId) => api.get(`/doctors/department/${departmentId}`),
  create: (data) => api.post('/doctors', data),
  update: (id, data) => api.put(`/doctors/${id}`, data),
};

// Appointment API
export const appointmentAPI = {
  getAll: () => api.get('/appointments'),
  getByDateRange: (startDate, endDate) => 
    api.get(`/appointments/range?start=${startDate}&end=${endDate}`),
  create: (data) => api.post('/appointments', data),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  cancel: (id) => api.patch(`/appointments/${id}/cancel`),
};

// Lab API
export const labAPI = {
  getAll: () => api.get('/lab'),
  getByPatient: (patientId) => api.get(`/lab/patient/${patientId}`),
  create: (data) => api.post('/lab', data),
  update: (id, data) => api.put(`/lab/${id}`, data),
};

// Pharmacy API
export const pharmacyAPI = {
  getAll: () => api.get('/pharmacy'),
  getByPatient: (patientId) => api.get(`/pharmacy/patient/${patientId}`),
  create: (data) => api.post('/pharmacy', data),
  update: (id, data) => api.put(`/pharmacy/${id}`, data),
};

// Billing API
export const billingAPI = {
  getAll: () => api.get('/billing'),
  getByPatient: (patientId) => api.get(`/billing/patient/${patientId}`),
  create: (data) => api.post('/billing', data),
  update: (id, data) => api.put(`/billing/${id}`, data),
};

export default api;
