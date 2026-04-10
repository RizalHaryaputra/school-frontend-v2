<template>
    <div class="space-y-6">

        <div
            class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-800 to-emerald-600 p-6 rounded-2xl shadow-lg shadow-emerald-200 text-white">
            <div>
                <h1 class="text-2xl font-bold mb-1">Selamat Datang, {{ authStore.user?.username || 'Admin' }}! 👋</h1>
                <p class="text-emerald-100 text-sm">Berikut adalah ringkasan sistem akademik sekolah hari ini: <span
                        class="font-bold text-white">{{ dashboardData?.hari_ini || 'Memuat...' }}</span></p>
            </div>
            <div class="hidden md:block">
                <div
                    class="bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/30 text-sm font-medium">
                    {{ currentDate }}
                </div>
            </div>
        </div>

        <div v-if="isLoading" class="space-y-6 animate-pulse">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="i in 4" :key="i" class="h-28 bg-emerald-100 rounded-2xl"></div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 h-64 bg-emerald-50 rounded-2xl"></div>
                <div class="h-64 bg-emerald-50 rounded-2xl"></div>
            </div>
        </div>

        <template v-else-if="dashboardData">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                    class="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div class="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Total Siswa</p>
                        <p class="text-2xl font-bold text-gray-900">{{ dashboardData.stats.total_siswa }}</p>
                    </div>
                </div>

                <div
                    class="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div class="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Total Guru</p>
                        <p class="text-2xl font-bold text-gray-900">{{ dashboardData.stats.total_guru }}</p>
                    </div>
                </div>

                <div
                    class="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div class="w-14 h-14 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Total Kelas</p>
                        <p class="text-2xl font-bold text-gray-900">{{ dashboardData.stats.total_kelas }}</p>
                    </div>
                </div>

                <div
                    class="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div class="w-14 h-14 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Akun Sistem</p>
                        <p class="text-2xl font-bold text-gray-900">{{ dashboardData.stats.total_user }}</p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div class="lg:col-span-2 space-y-6">

                    <div class="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
                        <h3 class="text-lg font-bold text-emerald-900 mb-4">Demografi Siswa</h3>
                        <div class="flex justify-between text-sm mb-2 font-medium">
                            <span class="text-blue-600">Laki-Laki ({{ dashboardData.demografi.laki_laki }})</span>
                            <span class="text-pink-600">Perempuan ({{ dashboardData.demografi.perempuan }})</span>
                        </div>
                        <div class="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
                            <div class="bg-blue-500 h-full transition-all duration-1000"
                                :style="`width: ${persentaseLaki}%`" title="Laki-Laki"></div>
                            <div class="bg-pink-500 h-full transition-all duration-1000"
                                :style="`width: ${persentasePerempuan}%`" title="Perempuan"></div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-bold text-emerald-900">Jadwal Pelajaran Hari Ini</h3>
                            <router-link to="/dashboard/jadwal"
                                class="text-sm font-semibold text-emerald-600 hover:text-emerald-800">Lihat
                                Semua</router-link>
                        </div>

                        <div v-if="dashboardData.jadwal_hari_ini.length === 0"
                            class="text-center py-8 text-gray-500 bg-gray-50 rounded-xl">
                            Tidak ada jadwal pelajaran untuk hari ini.
                        </div>

                        <div v-else class="space-y-4">
                            <div v-for="jadwal in dashboardData.jadwal_hari_ini" :key="jadwal.id"
                                class="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-emerald-50 bg-emerald-50/30 hover:bg-emerald-50/80 transition-colors">
                                <div class="flex-shrink-0 w-32 font-bold text-emerald-700 flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    {{ jadwal.waktu }}
                                </div>
                                <div class="flex-1 flex flex-col">
                                    <span class="font-bold text-gray-900">{{ jadwal.mapel }}</span>
                                    <span class="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                        <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                            </path>
                                        </svg>
                                        {{ jadwal.guru }} &nbsp;•&nbsp; <span class="font-semibold text-blue-600">Kelas
                                            {{ jadwal.kelas }}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="lg:col-span-1">
                    <div class="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 h-full">
                        <h3 class="text-lg font-bold text-emerald-900 mb-6 border-b border-emerald-50 pb-2">Pendaftaran
                            Siswa Baru</h3>

                        <div v-if="dashboardData.siswa_terbaru.length === 0" class="text-center py-6 text-gray-500">
                            Belum ada siswa terdaftar.
                        </div>

                        <div v-else class="space-y-5">
                            <div v-for="siswa in dashboardData.siswa_terbaru" :key="siswa.id"
                                class="flex items-start gap-3">
                                <div
                                    class="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm shadow-emerald-200">
                                    {{ siswa.nama.substring(0, 2).toUpperCase() }}
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-bold text-gray-900 truncate">{{ siswa.nama }}</p>
                                    <p class="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                                        <span
                                            class="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-bold">{{
                                            siswa.kelas }}</span>
                                    </p>
                                </div>
                                <div class="text-[10px] text-gray-400 text-right whitespace-nowrap pt-1">
                                    {{ siswa.created_at }}
                                </div>
                            </div>
                        </div>

                        <button @click="$router.push('/dashboard/siswa')"
                            class="w-full mt-6 py-2.5 text-sm font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors">
                            Kelola Semua Siswa
                        </button>
                    </div>
                </div>

            </div>
        </template>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import api from '../../utils/axios';

const authStore = useAuthStore();
const isLoading = ref(true);
const dashboardData = ref(null);

const currentDate = computed(() => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('id-ID', options);
});

// Perhitungan persentase untuk bar demografi
const persentaseLaki = computed(() => {
    if (!dashboardData.value) return 0;
    const { laki_laki, perempuan } = dashboardData.value.demografi;
    const total = laki_laki + perempuan;
    return total === 0 ? 0 : Math.round((laki_laki / total) * 100);
});

const persentasePerempuan = computed(() => {
    if (!dashboardData.value) return 0;
    const { laki_laki, perempuan } = dashboardData.value.demografi;
    const total = laki_laki + perempuan;
    return total === 0 ? 0 : Math.round((perempuan / total) * 100);
});

const fetchDashboard = async () => {
    try {
        const res = await api.get('/dashboard');
        dashboardData.value = res.data.data;
    } catch (error) {
        console.error('Gagal mengambil data dashboard:', error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchDashboard();
});
</script>