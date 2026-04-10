<template>
    <div class="max-w-4xl mx-auto space-y-6">
        <div class="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
            <div class="flex items-center gap-4">
                <button @click="$router.push('/dashboard/guru')"
                    class="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </button>
                <div>
                    <h1 class="text-2xl font-bold text-emerald-900">{{ isEdit ? 'Edit Data Guru' : 'Tambah Guru Baru' }}
                    </h1>
                    <p class="text-sm text-emerald-600">{{ isEdit ? 'Perbarui informasi staf pengajar' : 'Daftarkan guru baru dan hubungkan dengan akun sistem' }}</p>
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

                <div v-if="!isEdit" class="p-5 bg-emerald-50/50 rounded-xl border border-emerald-100 mb-6">
                    <label class="block text-sm font-bold text-emerald-900 mb-2">Pilih Akun Sistem <span
                            class="text-red-500">*</span></label>
                    <p class="text-xs text-emerald-600 mb-3">Guru harus ditautkan dengan akun sistem yang belum memiliki
                        profil guru.</p>
                    <select v-model="form.user_id" required
                        class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors bg-white cursor-pointer">
                        <option value="" disabled>-- Pilih Akun yang Tersedia --</option>
                        <option v-for="user in availableUsers" :key="user.id" :value="user.id">
                            @{{ user.username }}
                        </option>
                    </select>
                    <p v-if="availableUsers.length === 0 && !isFetching" class="text-xs text-red-500 mt-2 font-medium">
                        Tidak ada akun tersedia! Silakan buat akun User dengan role 'guru' terlebih dahulu di menu
                        Users.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="col-span-1 md:col-span-2">
                        <label class="block text-sm font-medium text-emerald-900 mb-1.5">Nama Lengkap (beserta gelar)
                            <span class="text-red-500">*</span></label>
                        <input v-model="form.nama" type="text" required placeholder="Misal: Budi Santoso, S.Pd."
                            class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-emerald-50/30">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-emerald-900 mb-1.5">NIP</label>
                        <input v-model="form.nip" type="text" placeholder="Nomor Induk Pegawai"
                            class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-emerald-50/30">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-emerald-900 mb-1.5">Jenis Kelamin <span
                                class="text-red-500">*</span></label>
                        <select v-model="form.gender" required
                            class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-emerald-50/30">
                            <option value="" disabled>-- Pilih Jenis Kelamin --</option>
                            <option value="laki-laki">Laki-Laki</option>
                            <option value="perempuan">Perempuan</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-emerald-900 mb-1.5">Email Aktif <span
                                class="text-red-500">*</span></label>
                        <input v-model="form.email" type="email" required placeholder="email@sekolah.com"
                            class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-emerald-50/30">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-emerald-900 mb-1.5">Nomor Telepon/HP</label>
                        <input v-model="form.phone_number" type="text" placeholder="081234567890"
                            class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-emerald-50/30">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-emerald-900 mb-1.5">Tempat Lahir</label>
                        <input v-model="form.tempat_lahir" type="text" placeholder="Nama Kota"
                            class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-emerald-50/30">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-emerald-900 mb-1.5">Tanggal Lahir</label>
                        <input v-model="form.tgl_lahir" type="date"
                            class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-emerald-50/30">
                    </div>

                    <div class="col-span-1 md:col-span-2">
                        <label class="block text-sm font-medium text-emerald-900 mb-1.5">Pendidikan Terakhir</label>
                        <input v-model="form.pendidikan" type="text" placeholder="Misal: S1 Pendidikan Matematika"
                            class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-emerald-50/30">
                    </div>

                    <div class="col-span-1 md:col-span-2">
                        <label class="block text-sm font-medium text-emerald-900 mb-1.5">Alamat Lengkap</label>
                        <textarea v-model="form.alamat" rows="3" placeholder="Alamat rumah..."
                            class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-emerald-50/30 resize-none"></textarea>
                    </div>
                </div>

                <div class="flex justify-end gap-3 pt-6 border-t border-emerald-50 mt-8">
                    <button type="button" @click="$router.push('/dashboard/guru')"
                        class="px-5 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors">
                        Batal
                    </button>
                    <button type="submit" :disabled="isLoading || (availableUsers.length === 0 && !isEdit)"
                        class="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2">
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
const availableUsers = ref([]);

const submitUrl = ref('/guru');
const submitMethod = ref('POST');

const form = ref({
    user_id: '',
    nip: '',
    nama: '',
    gender: '',
    email: '',
    tempat_lahir: '',
    tgl_lahir: '',
    phone_number: '',
    alamat: '',
    pendidikan: ''
});

onMounted(async () => {
    if (route.params.id) {
        // === MODE EDIT ===
        isEdit.value = true;
        isFetching.value = true;
        try {
            const res = await api.get(`/guru/${route.params.id}`);
            const data = res.data.data;

            // Mengisi form dengan data guru (kecuali user_id)
            form.value.nip = data.nip || '';
            form.value.nama = data.nama || '';
            form.value.gender = data.gender || '';
            form.value.email = data.email || '';
            form.value.tempat_lahir = data.tempat_lahir || '';
            form.value.tgl_lahir = data.tgl_lahir || '';
            form.value.phone_number = data.phone_number || '';
            form.value.alamat = data.alamat || '';
            form.value.pendidikan = data.pendidikan || '';

            const updateLink = data._links.find(link => link.rel === 'update');
            if (updateLink) {
                submitUrl.value = updateLink.href;
                submitMethod.value = updateLink.method;
            }
        } catch (error) {
            alert('Gagal mengambil data atau data tidak ditemukan.');
            router.push('/dashboard/guru');
        } finally {
            isFetching.value = false;
        }
    } else {
        // === MODE CREATE ===
        isFetching.value = true;
        try {
            const response = await api.get('/users/available-for-guru')

            availableUsers.value = response.data.items || response.data.data || response.data
        } catch (error) {
            console.error('Gagal memuat daftar akun yang tersedia', error);
            errorMessage.value = ['Gagal memuat daftar akun. Pastikan endpoint /users/available-for-guru tersedia.'];
        } finally {
            isFetching.value = false;
        }
    }
});

const handleSubmit = async () => {
    isLoading.value = true;
    errorMessage.value = null;

    const payload = { ...form.value };
    if (isEdit.value) {
        delete payload.user_id;
    }

    try {
        await api({
            method: submitMethod.value,
            url: submitUrl.value,
            data: payload
        });
        router.push('/dashboard/guru');
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