<template>
    <div class="max-w-5xl mx-auto space-y-6">
        <div class="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
            <div class="flex items-center gap-4">
                <button @click="$router.push('/dashboard/guru')"
                    class="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors" title="Kembali">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </button>
                <div>
                    <h1 class="text-2xl font-bold text-emerald-900">Profil Detail Guru</h1>
                    <p class="text-sm text-emerald-600">Informasi lengkap staf pengajar</p>
                </div>
            </div>

            <button v-if="guru" @click="$router.push(`/dashboard/guru/edit/${guru.id}`)"
                class="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold rounded-xl transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Edit Profil
            </button>
        </div>

        <div v-if="isLoading"
            class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-emerald-100">
            <svg class="animate-spin w-10 h-10 mb-4 text-emerald-600" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
            <p class="text-emerald-700 font-medium">Memuat profil guru...</p>
        </div>

        <div v-else-if="guru" class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div class="md:col-span-1 space-y-6">
                <div class="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 text-center">
                    <div
                        class="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-emerald-200 mb-4">
                        {{ getInitials(guru.nama) }}
                    </div>
                    <h2 class="text-xl font-bold text-emerald-900 mb-1">{{ guru.nama }}</h2>
                    <p
                        class="text-emerald-600 font-mono text-sm bg-emerald-50 inline-block px-3 py-1 rounded-full border border-emerald-100 mb-4">
                        NIP: {{ guru.nip || '-' }}
                    </p>

                    <div class="flex flex-col gap-2 text-sm text-left mt-4 border-t border-emerald-50 pt-4">
                        <div class="flex items-center gap-3 text-emerald-700">
                            <div class="p-2 bg-emerald-50 rounded-lg"><svg class="w-5 h-5" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg></div>
                            <span class="capitalize">{{ guru.gender }}</span>
                        </div>
                        <div class="flex items-center gap-3 text-emerald-700">
                            <div class="p-2 bg-emerald-50 rounded-lg"><svg class="w-5 h-5" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                    </path>
                                </svg></div>
                            <span>{{ guru.pendidikan || 'Pendidikan tidak diisi' }}</span>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
                    <h3
                        class="text-sm font-bold text-emerald-900 uppercase tracking-wider mb-4 border-b border-emerald-50 pb-2">
                        Akun Sistem</h3>
                    <div v-if="guru.info_akun" class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                            @</div>
                        <div>
                            <p class="font-bold text-gray-800">{{ guru.info_akun.username }}</p>
                            <p class="text-xs text-gray-500">ID User: {{ guru.info_akun.user_id }}</p>
                        </div>
                    </div>
                    <div v-else class="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg border border-orange-100">
                        Guru ini belum ditautkan ke akun sistem manapun.
                    </div>
                </div>
            </div>

            <div class="md:col-span-2 space-y-6">
                <div class="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 md:p-8">
                    <h3 class="text-lg font-bold text-emerald-900 mb-6 border-b border-emerald-50 pb-2">Informasi Kontak
                        & Pribadi</h3>

                    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-emerald-600 flex items-center gap-2 mb-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                    </path>
                                </svg>
                                Alamat Email
                            </dt>
                            <dd class="text-base text-gray-900 font-medium">{{ guru.email }}</dd>
                        </div>

                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-emerald-600 flex items-center gap-2 mb-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                                    </path>
                                </svg>
                                Nomor Telepon
                            </dt>
                            <dd class="text-base text-gray-900 font-medium">{{ guru.phone_number || '-' }}</dd>
                        </div>

                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-emerald-600 mb-1">Tempat Lahir</dt>
                            <dd class="text-base text-gray-900 font-medium">{{ guru.tempat_lahir || '-' }}</dd>
                        </div>

                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-emerald-600 mb-1">Tanggal Lahir</dt>
                            <dd class="text-base text-gray-900 font-medium">{{ formatDate(guru.tgl_lahir) }}</dd>
                        </div>

                        <div class="sm:col-span-2 mt-2">
                            <dt class="text-sm font-medium text-emerald-600 flex items-center gap-2 mb-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                    </path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                Alamat Lengkap
                            </dt>
                            <dd
                                class="text-base text-gray-900 font-medium bg-emerald-50/50 p-4 rounded-xl border border-emerald-50 leading-relaxed">
                                {{ guru.alamat || 'Alamat belum diisi.' }}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../../utils/axios';

const route = useRoute();
const router = useRouter();

const guru = ref(null);
const isLoading = ref(true);

onMounted(async () => {
    try {
        const res = await api.get(`/guru/${route.params.id}`);
        guru.value = res.data.data;
    } catch (error) {
        alert('Gagal mengambil data atau guru tidak ditemukan.');
        router.push('/dashboard/guru');
    } finally {
        isLoading.value = false;
    }
});

// Utility: Format Tanggal (YYYY-MM-DD menjadi format lokal)
const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

// Utility: Ambil inisial nama untuk avatar
const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};
</script>