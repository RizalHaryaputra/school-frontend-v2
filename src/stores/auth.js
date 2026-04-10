// src/stores/auth.js
import { defineStore } from 'pinia';
import api from '../utils/axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: null, 
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async login(credentials) {
            try {
                const response = await api.post('/login', credentials);

                this.token = response.data.meta.token;

                this.user = response.data.data;

                localStorage.setItem('token', this.token);
                return true;
            } catch (error) {
                throw error;
            }
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    }
});