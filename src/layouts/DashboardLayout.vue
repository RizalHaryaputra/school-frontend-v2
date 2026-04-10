<template>
    <div class="min-h-screen flex bg-gray-100">
        <aside class="w-64 bg-slate-800 text-white flex flex-col transition-all duration-300">
            <div
                class="h-16 flex items-center justify-center border-b border-slate-700 text-xl font-bold tracking-wider">
                SCHOOL API
            </div>
            <nav class="flex-1 p-4 space-y-2">
                <p class="text-slate-400 text-xs uppercase font-semibold mb-4">Menu Utama</p>
                    <router-link to="/dashboard/kelas"
                        class="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group"
                        :class="$route.path.includes('kelas') ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-900/50' : 'text-emerald-100/70 hover:bg-emerald-700/50 hover:text-emerald-50'">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span>Data Kelas</span>
                    </router-link>
            </nav>
        </aside>

        <div class="flex-1 flex flex-col">
            <header class="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10">
                <div class="text-gray-500">
                </div>
                <div>
                    <button @click="showLogoutModal = true"
                        class="flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-all duration-200">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                            </path>
                        </svg>
                        Keluar
                    </button>
                </div>
            </header>

            <main class="flex-1 p-6 overflow-y-auto">
                <router-view />
            </main>
        </div>
    </div>

    <BaseModal :show="showLogoutModal" title="Konfirmasi Keluar" message="Apakah Anda yakin ingin mengakhiri sesi ini?"
        confirmText="Keluar Sekarang" type="danger" @close="showLogoutModal = false" @confirm="authStore.logout()" />
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import BaseModal from '../components/BaseModal.vue';

const authStore = useAuthStore();
const showLogoutModal = ref(false);
</script>