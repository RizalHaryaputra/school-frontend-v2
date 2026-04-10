<template>
    <div class="space-y-6">
        <div
            class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
            <div>
                <h1 class="text-2xl font-bold text-emerald-900">Data Kelas</h1>
                <p class="text-sm text-emerald-600">Manajemen rombongan belajar sekolah</p>
            </div>

            <div class="flex flex-wrap items-center gap-3">
                <div class="relative">
                    <input v-model="searchQuery" type="text" placeholder="Cari Kelas..." @input="debounceSearch"
                        class="pl-10 pr-4 py-2.5 text-sm rounded-xl border border-emerald-200 bg-emerald-50/30 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none w-full md:w-64 transition-all">
                    <svg class="w-5 h-5 text-emerald-400 absolute left-3 top-2.5" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>

                <button
                    class="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 transition-all active:scale-95">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Tambah
                </button>
            </div>
        </div>

        <div
            class="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden min-h-[300px] flex flex-col">
            <div class="overflow-x-auto flex-1">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-emerald-50/50 border-b border-emerald-100">
                        <tr>
                            <th class="p-4 text-xs font-bold uppercase text-emerald-700 tracking-wider">Kode</th>
                            <th class="p-4 text-xs font-bold uppercase text-emerald-700 tracking-wider">Nama Kelas</th>
                            <th class="p-4 text-xs font-bold uppercase text-emerald-700 tracking-wider text-center">Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-emerald-50">
                        <tr v-if="isLoading" v-for="i in 5" :key="`skeleton-${i}`" class="animate-pulse">
                            <td class="p-4">
                                <div class="h-6 w-20 bg-emerald-100 rounded"></div>
                            </td>
                            <td class="p-4">
                                <div class="h-5 w-48 bg-emerald-50 rounded"></div>
                            </td>
                            <td class="p-4">
                                <div class="flex justify-center gap-2">
                                    <div class="h-9 w-9 bg-emerald-50 rounded-lg"></div>
                                    <div class="h-9 w-9 bg-red-50 rounded-lg"></div>
                                </div>
                            </td>
                        </tr>

                        <tr v-else-if="!collection?.items || collection.items.length === 0">
                            <td colspan="3" class="p-12 text-center">
                                <div class="flex flex-col items-center justify-center text-emerald-600/60">
                                    <div class="bg-emerald-50 p-4 rounded-full mb-4">
                                        <svg class="w-12 h-12 text-emerald-300" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4">
                                            </path>
                                        </svg>
                                    </div>
                                    <p class="text-lg font-bold text-emerald-900 mb-1">Tidak ada data kelas</p>
                                    <p class="text-sm text-emerald-600 max-w-sm">
                                        {{ searchQuery ? `Tidak menemukan kelas dengan kata kunci "${searchQuery}"` :
                                        'Belum ada data kelas yang ditambahkan ke dalam sistem.' }}
                                    </p>
                                </div>
                            </td>
                        </tr>

                        <tr v-else v-for="item in collection.items" :key="item.id"
                            class="hover:bg-emerald-50/30 transition-colors">
                            <td class="p-4"><span
                                    class="font-mono text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">{{
                                    item.kode_kelas }}</span></td>
                            <td class="p-4 font-medium text-emerald-900">{{ item.nama_kelas }}</td>
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

        <BaseModal :show="modal.show" title="Hapus Data Kelas?"
            :message="`Anda yakin ingin menghapus kelas ${modal.data?.nama_kelas}? Tindakan ini tidak dapat dibatalkan.`"
            confirmText="Ya, Hapus" type="danger" @close="modal.show = false" @confirm="handleDelete" />
    </div>
</template>

<script setup>
// Bagian script tetap sama persis seperti kode Anda sebelumnya
import { ref, reactive, onMounted } from 'vue';
import api from '../../../utils/axios';
import BaseModal from '../../../components/BaseModal.vue';

const collection = ref(null);
const meta = ref(null);
const isLoading = ref(true);
const searchQuery = ref('');
const modal = reactive({ show: false, data: null });

const fetchData = async (url = '/kelas') => {
    isLoading.value = true;
    try {
        const params = new URLSearchParams();
        if (searchQuery.value) {
            params.append('search', searchQuery.value);
        }

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

onMounted(() => fetchData());
</script>