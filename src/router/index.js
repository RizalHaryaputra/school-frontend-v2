import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

import AuthLayout from '../layouts/AuthLayout.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: AuthLayout,
        // Halaman yang hanya boleh diakses jika BELUM login
        meta: { requiresGuest: true },
        children: [
            { path: '', name: 'Login', component: () => import('../views/auth/LoginView.vue') }
        ]
    },
    {
        path: '/dashboard',
        component: DashboardLayout,
        // Halaman yang WAJIB login
        meta: { requiresAuth: true },
        children: [
            { path: '', name: 'Dashboard', component: () => import('../views/dashboard/IndexView.vue') }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Route Navigation Guard
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        // Mau ke dashboard tapi belum login? Tendang ke login
        next('/login');
    } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
        // Sudah login tapi iseng buka halaman login? Tendang ke dashboard
        next('/dashboard');
    } else {
        next();
    }
});

export default router;