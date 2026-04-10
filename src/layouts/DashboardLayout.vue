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
                <router-link to="/dashboard/mapel"
                    class="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group"
                    :class="$route.path.includes('mapel') ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-900/50' : 'text-emerald-100/70 hover:bg-emerald-700/50 hover:text-emerald-50'">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                        </path>
                    </svg>
                    <span>Data Mapel</span>
                </router-link>
                <router-link to="/dashboard/guru"
                    class="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group"
                    :class="$route.path.includes('guru') ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-900/50' : 'text-emerald-100/70 hover:bg-emerald-700/50 hover:text-emerald-50'">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                        </path>
                    </svg>
                    <span>Data Guru</span>
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