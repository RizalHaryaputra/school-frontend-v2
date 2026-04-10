<template>
    <div class="max-w-3xl mx-auto space-y-6">
        <div class="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
            <div class="flex items-center gap-4">
                <button @click="$router.push('/dashboard/mapel')"
                    class="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </button>
                <div>
                    <h1 class="text-2xl font-bold text-emerald-900">{{ isEdit ? 'Edit Data Mapel' : 'Tambah Mapel Baru'
                        }}</h1>
                    <p class="text-sm text-emerald-600">{{ isEdit ? 'Perbarui informasi mata pelajaran' : 'Masukkan informasi mata pelajaran baru' }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 sm:p-8">

            <div v-if="isFetching" class="flex flex-col items-center justify-center py-12 text-emerald-600">
                <svg class="animate-spin w-8 h-8 mb-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                <p>Memuat data...</p>
            </div>

            <form v-else @submit.prevent="handleSubmit" class="space-y-6">
                <div v-if="errorMessage" class="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
                    <p class="font-bold mb-1">Gagal menyimpan data:</p>
                    <ul class="list-disc pl-5">
                        <li v-for="(err, index) in errorMessage" :key="index">{{ err }}</li>
                    </ul>
                </div>

                <div>
                    <label class="block text-sm font-medium text-emerald-900 mb-1.5">Kode Mapel <span
                            class="text-red-500">*</span></label>
                    <input v-model="form.kode_mapel" type="text" required maxlength="10" placeholder="Misal: MTK"
                        class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors bg-emerald-50/30 font-mono">
                </div>

                <div>
                    <label class="block text-sm font-medium text-emerald-900 mb-1.5">Nama Mapel <span
                            class="text-red-500">*</span></label>
                    <input v-model="form.nama_mapel" type="text" required maxlength="50" placeholder="Misal: Matematika"
                        class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors bg-emerald-50/30">
                </div>

                <div class="flex justify-end gap-3 pt-6 border-t border-emerald-50">
                    <button type="button" @click="$router.push('/dashboard/mapel')"
                        class="px-5 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors">
                        Batal
                    </button>
                    <button type="submit" :disabled="isLoading"
                        class="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-all disabled:opacity-70 flex items-center gap-2">
                        <svg v-if="isLoading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        {{ isLoading ? 'Menyimpan...' : 'Simpan Data' }}
                    </button>
                </div>

            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../../utils/axios';

const route = useRoute();
const router = useRouter();

const isEdit = ref(false);
const isFetching = ref(false);
const isLoading = ref(false);
const errorMessage = ref(null);

const submitUrl = ref('/mapel');
const submitMethod = ref('POST');

const form = ref({
    kode_mapel: '',
    nama_mapel: ''
});

onMounted(async () => {
    if (route.params.id) {
        isEdit.value = true;
        isFetching.value = true;
        try {
            const res = await api.get(`/mapel/${route.params.id}`);
            const data = res.data.data;

            form.value.kode_mapel = data.kode_mapel;
            form.value.nama_mapel = data.nama_mapel;

            const updateLink = data._links.find(link => link.rel === 'update');
            if (updateLink) {
                submitUrl.value = updateLink.href;
                submitMethod.value = updateLink.method;
            }
        } catch (error) {
            alert('Gagal mengambil data atau data tidak ditemukan.');
            router.push('/dashboard/mapel');
        } finally {
            isFetching.value = false;
        }
    }
});

const handleSubmit = async () => {
    isLoading.value = true;
    errorMessage.value = null;
    try {
        await api({
            method: submitMethod.value,
            url: submitUrl.value,
            data: form.value
        });
        router.push('/dashboard/mapel');
    } catch (error) {
        if (error.response && error.response.status === 422) {
            const errors = error.response.data.errors;
            errorMessage.value = Object.values(errors).flat();
        } else {
            errorMessage.value = ['Terjadi kesalahan pada server.'];
        }
    } finally {
        isLoading.value = false;
    }
};
</script>