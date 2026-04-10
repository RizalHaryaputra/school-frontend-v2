<template>
    <div class="min-h-screen flex bg-gray-100">
        <aside class="w-64 bg-slate-800 text-white flex flex-col transition-all duration-300">
            <div
                class="h-16 flex items-center justify-center border-b border-slate-700 text-xl font-bold tracking-wider">
                SCHOOL API
            </div>
            <nav class="flex-1 p-4 space-y-2">
                <p class="text-slate-400 text-xs uppercase font-semibold mb-4">Menu Utama</p>
                <div class="text-sm text-slate-500 italic p-2 bg-slate-700/30 rounded">
                    Navigasi akan ditambahkan pada tahap selanjutnya...
                </div>
            </nav>
        </aside>

        <div class="flex-1 flex flex-col">
            <header class="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10">
                <div class="text-gray-500">
                </div>
                <div>
                    <button @click="authStore.logout()"
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
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();
</script>