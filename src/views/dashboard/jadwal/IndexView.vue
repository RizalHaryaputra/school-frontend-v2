<template>
    <div class="space-y-6">
        <div
            class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
            <div>
                <h1 class="text-2xl font-bold text-emerald-900">Data Jadwal Pelajaran</h1>
                <p class="text-sm text-emerald-600">Manajemen jadwal kelas, mata pelajaran, dan guru</p>
            </div>

            <div class="flex flex-wrap items-center gap-3">
                <div class="relative">
                    <input v-model="searchQuery" type="text" placeholder="Cari Jadwal..." @input="debounceSearch"
                        class="pl-10 pr-4 py-2.5 text-sm rounded-xl border border-emerald-200 bg-emerald-50/30 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none w-full md:w-64 transition-all">
                    <svg class="w-5 h-5 text-emerald-400 absolute left-3 top-2.5" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>

                <router-link to="/dashboard/jadwal/create"
                    class="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all active:scale-95">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Tambah
                </router-link>
            </div>
        </div>

        <div
            class="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden min-h-[300px] flex flex-col">
            <div class="overflow-x-auto flex-1">
                <table class="w-full text-left border-collapse whitespace-nowrap">
                    <thead class="bg-emerald-50/50 border-b border-emerald-100">
                        <tr>
                            <th class="p-4 text-xs font-bold uppercase text-emerald-700 tracking-wider">Waktu Pelajaran
                            </th>
                            <th class="p-4 text-xs font-bold uppercase text-emerald-700 tracking-wider">Kelas</th>
                            <th class="p-4 text-xs font-bold uppercase text-emerald-700 tracking-wider">Mata Pelajaran
                            </th>
                            <th class="p-4 text-xs font-bold uppercase text-emerald-700 tracking-wider">Guru Pengampu
                            </th>
                            <th class="p-4 text-xs font-bold uppercase text-emerald-700 tracking-wider text-center">Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-emerald-50">
                        <tr v-if="isLoading" v-for="i in 5" :key="`skeleton-${i}`" class="animate-pulse">
                            <td class="p-4">
                                <div class="flex flex-col gap-2">
                                    <div class="h-5 w-20 bg-emerald-100 rounded-full"></div>
                                    <div class="h-4 w-24 bg-emerald-50 rounded"></div>
                                </div>
                            </td>
                            <td class="p-4">
                                <div class="h-5 w-24 bg-emerald-50 rounded"></div>
                            </td>
                            <td class="p-4">
                                <div class="h-5 w-32 bg-emerald-50 rounded"></div>
                            </td>
                            <td class="p-4">
                                <div class="h-5 w-40 bg-emerald-50 rounded"></div>
                            </td>
                            <td class="p-4">
                                <div class="flex justify-center gap-2">
                                    <div class="h-9 w-9 bg-emerald-50 rounded-lg"></div>
                                    <div class="h-9 w-9 bg-red-50 rounded-lg"></div>
                                </div>
                            </td>
                        </tr>

                        <tr v-else-if="!collection?.items || collection.items.length === 0">
                            <td colspan="5" class="p-12 text-center">
                                <div class="flex flex-col items-center justify-center text-emerald-600/60">
                                    <div class="bg-emerald-50 p-4 rounded-full mb-4">
                                        <svg class="w-12 h-12 text-emerald-300" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                            </path>
                                        </svg>
                                    </div>
                                    <p class="text-lg font-bold text-emerald-900 mb-1">Tidak ada data jadwal</p>
                                    <p class="text-sm text-emerald-600 max-w-sm">
                                        {{ searchQuery ? `Tidak menemukan jadwal dengan kata kunci "${searchQuery}"` :
                                        'Belum ada jadwal yang ditambahkan ke dalam sistem.' }}
                                    </p>
                                </div>
                            </td>
                        </tr>

                        <tr v-else v-for="item in collection.items" :key="item.id"
                            class="hover:bg-emerald-50/30 transition-colors">
                            <td class="p-4">
                                <div class="flex flex-col items-start gap-1">
                                    <span
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 capitalize">
                                        {{ item.hari }}
                                    </span>
                                    <span class="text-sm font-medium text-emerald-600 flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        {{ formatTime(item.jam_mulai) }} - {{ formatTime(item.jam_selesai) }}
                                    </span>
                                </div>
                            </td>
                            <td class="p-4">
                                <span class="font-bold text-emerald-900">{{ item.kelas }}</span>
                            </td>
                            <td class="p-4">
                                <span class="text-emerald-800 font-medium">{{ item.mapel }}</span>
                            </td>
                            <td class="p-4">
                                <span class="text-emerald-700 flex items-center gap-2">
                                    <div
                                        class="w-6 h-6 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                                        {{ getInitials(item.guru) }}
                                    </div>
                                    {{ item.guru }}
                                </span>
                            </td>
                            <td class="p-4">
                                <div class="flex justify-center gap-2">
                                    <button @click="handleEdit(item)"
                                        class="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                                        title="Edit">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                    <button @click="confirmDelete(item)"
                                        class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Hapus">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="!isLoading && collection?.items?.length > 0"
                class="p-4 border-t border-emerald-100 bg-emerald-50/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span class="text-xs font-medium text-emerald-600">
                    Menampilkan {{ meta?.from || 0 }} - {{ meta?.to || 0 }} dari {{ meta?.total || 0 }} data
                </span>
                <nav class="flex gap-1">
                    <button v-for="link in meta?.links" :key="link.label" @click="changePage(link.url)"
                        :disabled="!link.url || link.active" v-html="link.label"
                        class="px-3 py-1 text-xs rounded-lg border transition-all"
                        :class="link.active ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-emerald-700 border-emerald-100 hover:bg-emerald-100 disabled:opacity-50'"></button>
                </nav>
            </div>
        </div>

        <BaseModal :show="modal.show" title="Hapus Jadwal?"
            :message="`Anda yakin ingin menghapus jadwal ${modal.data?.mapel} untuk kelas ${modal.data?.kelas} di hari ${modal.data?.hari}?`"
            confirmText="Ya, Hapus" type="danger" @close="modal.show = false" @confirm="handleDelete" />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../../utils/axios';
import BaseModal from '../../../components/BaseModal.vue';

const router = useRouter();
const collection = ref(null);
const meta = ref(null);
const isLoading = ref(true);
const searchQuery = ref('');
const modal = reactive({ show: false, data: null });

const fetchData = async (url = '/jadwal') => {
    isLoading.value = true;
    try {
        const params = new URLSearchParams();
        if (searchQuery.value) params.append('search', searchQuery.value);

        const queryString = params.toString();
        const fullUrl = url.includes('?')
            ? `${url}${queryString ? '&' + queryString : ''}`
            : `${url}${queryString ? '?' + queryString : ''}`;

        const res = await api.get(fullUrl);
        collection.value = res.data.data;
        meta.value = res.data.meta;
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};

const changePage = (url) => { if (url) fetchData(url); };

let timeout = null;
const debounceSearch = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fetchData(), 500);
};

const handleEdit = (item) => {
    router.push(`/dashboard/jadwal/edit/${item.id}`);
};

const confirmDelete = (item) => {
    modal.data = item;
    modal.show = true;
};

const handleDelete = async () => {
    const deleteLink = modal.data._links.find(l => l.rel === 'delete');
    if (deleteLink) {
        try {
            await api.delete(deleteLink.href);
            modal.show = false;
            fetchData();
        } catch (error) {
            alert('Gagal menghapus data');
        }
    }
};

// Utilities for UI Formatting
const formatTime = (timeStr) => {
    if (!timeStr) return '';
    return timeStr.substring(0, 5); // "07:45:00" -> "07:45"
};

const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

onMounted(() => fetchData());
</script>