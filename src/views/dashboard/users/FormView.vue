<template>
    <div class="max-w-2xl mx-auto space-y-6">
        <div class="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
            <div class="flex items-center gap-4">
                <button @click="$router.push('/dashboard/users')"
                    class="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </button>
                <div>
                    <h1 class="text-2xl font-bold text-emerald-900">{{ isEdit ? 'Edit Akun Sistem' : 'Tambah Akun Baru'
                        }}</h1>
                    <p class="text-sm text-emerald-600">{{ isEdit ? 'Perbarui username, role, atau ubah password' :
                        'Buat kredensial login baru untuk admin atau guru' }}</p>
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
                <p>Memuat data akun...</p>
            </div>

            <form v-else @submit.prevent="handleSubmit" class="space-y-6">

                <div v-if="errorMessage" class="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
                    <p class="font-bold mb-1">Gagal menyimpan data:</p>
                    <ul class="list-disc pl-5">
                        <li v-for="(err, index) in errorMessage" :key="index">{{ err }}</li>
                    </ul>
                </div>

                <div>
                    <label class="block text-sm font-medium text-emerald-900 mb-1.5">Username <span
                            class="text-red-500">*</span></label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span class="text-emerald-500 font-bold">@</span>
                        </div>
                        <input v-model="form.username" type="text" required placeholder="nama_pengguna"
                            class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors bg-emerald-50/30">
                    </div>
                    <p class="text-xs text-emerald-600/70 mt-1.5">Gunakan huruf kecil tanpa spasi. Harus unik.</p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-emerald-900 mb-1.5">Hak Akses (Role) <span
                            class="text-red-500">*</span></label>
                    <select v-model="form.type" required
                        class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors bg-white cursor-pointer">
                        <option value="" disabled>-- Pilih Role --</option>
                        <option value="admin">Administrator</option>
                        <option value="guru">Guru</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-emerald-900 mb-1.5">
                        Password <span v-if="!isEdit" class="text-red-500">*</span>
                    </label>
                    <input v-model="form.password" type="password" :required="!isEdit" placeholder="••••••••"
                        class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors bg-emerald-50/30">
                    <p v-if="isEdit"
                        class="text-xs text-blue-600 mt-1.5 font-medium bg-blue-50 p-2 rounded-lg border border-blue-100">
                        ℹ️ Kosongkan field ini jika Anda tidak ingin mengubah password saat ini.
                    </p>
                    <p v-else class="text-xs text-emerald-600/70 mt-1.5">Minimal 8 karakter.</p>
                </div>

                <div class="flex justify-end gap-3 pt-6 border-t border-emerald-50">
                    <button type="button" @click="$router.push('/dashboard/users')"
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
                        {{ isLoading ? 'Menyimpan...' : 'Simpan Akun' }}
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

const submitUrl = ref('/users');
const submitMethod = ref('POST');

// Perhatikan bahwa field untuk role di request adalah "type" (sesuai template API)
const form = ref({
    username: '',
    password: '',
    type: ''
});

onMounted(async () => {
    if (route.params.id) {
        isEdit.value = true;
        isFetching.value = true;
        try {
            const res = await api.get(`/users/${route.params.id}`);
            const data = res.data.data;

            // Isi form dengan data eksisting
            form.value.username = data.username;

            // Mapping "role" dari response GET ke "type" untuk form PUT
            form.value.type = data.role;

            const updateLink = data._links.find(link => link.rel === 'update');
            if (updateLink) {
                submitUrl.value = updateLink.href;
                submitMethod.value = updateLink.method;
            }
        } catch (error) {
            alert('Gagal mengambil detail akun atau data tidak ditemukan.');
            router.push('/dashboard/users');
        } finally {
            isFetching.value = false;
        }
    }
});

const handleSubmit = async () => {
    isLoading.value = true;
    errorMessage.value = null;

    // Clone payload agar tidak mengubah nilai reaktif form langsung
    const payload = { ...form.value };

    // LOGIKA CERDAS: Jika sedang edit dan password kosong, hapus properti password
    // agar API Laravel tidak memvalidasinya sebagai perubahan password.
    if (isEdit.value && !payload.password) {
        delete payload.password;
    }

    try {
        await api({
            method: submitMethod.value,
            url: submitUrl.value,
            data: payload
        });
        router.push('/dashboard/users');
    } catch (error) {
        if (error.response && error.response.status === 422) {
            const errors = error.response.data.errors;
            errorMessage.value = Object.values(errors).flat();
        } else {
            errorMessage.value = [error.response?.data?.message || 'Terjadi kesalahan pada server.'];
        }
    } finally {
        isLoading.value = false;
    }
};
</script>