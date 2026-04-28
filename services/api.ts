import axios, { type InternalAxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 15000
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export const authApi = {
  login: (payload: { phone: string; password?: string; otp?: string }) => api.post('/auth/login', payload)
};

export const availabilityApi = {
  bikeSlots: (bikeId: string, from?: string, to?: string) =>
    api.get(`/availability/bike/${bikeId}`, {
      params: { from, to }
    })
};

export const paymentsApi = {
  createAdvanceOrder: (bookingId: string) => api.post(`/payments/advance/${bookingId}`)
};

export const invoicesApi = {
  download: (bookingId: string) => api.get(`/invoices/${bookingId}`, { responseType: 'blob' })
};
