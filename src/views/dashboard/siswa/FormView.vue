<template>
    <div class="max-w-4xl mx-auto space-y-6">
        <div class="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
            <div class="flex items-center gap-4">
                <button @click="$router.push('/dashboard/siswa')"
                    class="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </button>
                <div>
                    <h1 class="text-2xl font-bold text-emerald-900">{{ isEdit ? 'Edit Data Siswa' : 'Tambah Siswa Baru'
                        }}</h1>
                    <p class="text-sm text-emerald-600">{{ isEdit ? 'Perbarui profil dan informasi kontak siswa' :
                        'Daftarkan peserta didik baru ke dalam sistem' }}</p>
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
                <p>Memuat data form...</p>
            </div>

            <form v-else @submit.prevent="handleSubmit" class="space-y-8">

                <div v-if="errorMessage" class="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
                    <p class="font-bold mb-1">Gagal menyimpan data:</p>
                    <ul class="list-disc pl-5">
                        <li v-for="(err, index) in errorMessage" :key="index">{{ err }}</li>
                    </ul>
                </div>

                <div>
                    <h3
                        class="text-lg font-bold text-emerald-900 mb-4 border-b border-emerald-50 pb-2 flex items-center gap-2">
                        <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222">
                            </path>
                        </svg>
                        Data Akademik
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-emerald-900 mb-1.5">NIS (Nomor Induk Siswa)
                                <span class="text-red-500">*</span></label>
                            <input v-model="form.nis" type="text" required placeholder="Masukkan NIS unik"
                                class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-emerald-50/30 font-mono">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-emerald-900 mb-1.5">Kelas <span
                                    class="text-red-500">*</span></label>
                            <select v-model="form.kelas_id" required
                                class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-white cursor-pointer">
                                <option value="" disabled>-- Pilih Kelas --</option>
                                <option v-for="k in options.kelas" :key="k.id" :value="k.id">
                                    {{ k.nama_kelas }} ({{ k.kode_kelas }})
                                </option>
                            </select>
                            <p v-if="options.kelas.length === 0" class="text-xs text-red-500 mt-1">Data kelas tidak
                                tersedia.</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3
                        class="text-lg font-bold text-emerald-900 mb-4 border-b border-emerald-50 pb-2 flex items-center gap-2">
                        <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Data Pribadi & Kontak
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-emerald-900 mb-1.5">Nama Lengkap <span
                                    class="text-red-500">*</span></label>
                            <input v-model="form.nama" type="text" required placeholder="Nama lengkap siswa"
                                class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-emerald-50/30">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-emerald-900 mb-1.5">Jenis Kelamin <span
                                    class="text-red-500">*</span></label>
                            <select v-model="form.gender" required
                                class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-white cursor-pointer">
                                <option value="" disabled>-- Pilih Jenis Kelamin --</option>
                                <option value="laki-laki">Laki-Laki</option>
                                <option value="perempuan">Perempuan</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-emerald-900 mb-1.5">Email</label>
                            <input v-model="form.email" type="email" placeholder="siswa@sekolah.com"
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

                        <div>
                            <label class="block text-sm font-medium text-emerald-900 mb-1.5">Nama Orang Tua /
                                Wali</label>
                            <input v-model="form.nama_ortu" type="text" placeholder="Nama ayah/ibu/wali"
                                class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-emerald-50/30">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-emerald-900 mb-1.5">Nomor Telepon/HP</label>
                            <input v-model="form.phone_number" type="text" placeholder="0812..."
                                class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-emerald-50/30">
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-emerald-900 mb-1.5">Alamat Lengkap</label>
                            <textarea v-model="form.alamat" rows="3" placeholder="Alamat rumah tinggal..."
                                class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-emerald-50/30 resize-none"></textarea>
                        </div>

                    </div>
                </div>

                <div class="flex justify-end gap-3 pt-6 border-t border-emerald-50 mt-8">
                    <button type="button" @click="$router.push('/dashboard/siswa')"
                        class="px-5 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors">
                        Batal
                    </button>
                    <button type="submit" :disabled="isLoading || options.kelas.length === 0"
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
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../../utils/axios';

const route = useRoute();
const router = useRouter();

const isEdit = ref(false);
const isFetching = ref(true);
const isLoading = ref(false);
const errorMessage = ref(null);

const submitUrl = ref('/siswa');
const submitMethod = ref('POST');

const form = ref({
    nis: '',
    nama: '',
    gender: '',
    tempat_lahir: '',
    tgl_lahir: '',
    nama_ortu: '',
    phone_number: '',
    email: '',
    kelas_id: '',
    alamat: ''
});

// Referensi Data Master
const options = reactive({
    kelas: []
});

const fetchMasterData = async () => {
    try {
        const resKelas = await api.get('/kelas');
        options.kelas = resKelas.data?.data?.items || [];
    } catch (error) {
        console.error("Gagal mengambil data kelas", error);
        alert("Gagal memuat daftar kelas. Pastikan data kelas sudah ada.");
    }
};

onMounted(async () => {
    isFetching.value = true;

    // 1. Ambil data dropdown (Kelas) terlebih dahulu
    await fetchMasterData();

    // 2. Jika Mode Edit, panggil data spesifik siswa
    if (route.params.id) {
        isEdit.value = true;
        try {
            const res = await api.get(`/siswa/${route.params.id}`);
            const data = res.data.data;

            // Mengisi form
            form.value.nis = data.nis || '';
            form.value.nama = data.nama || '';
            form.value.gender = data.gender || '';
            form.value.tempat_lahir = data.tempat_lahir || '';
            form.value.tgl_lahir = data.tgl_lahir || '';
            form.value.nama_ortu = data.nama_ortu || '';
            form.value.phone_number = data.phone_number || '';
            form.value.email = data.email || '';
            form.value.alamat = data.alamat || '';

            // Jika siswa sudah punya kelas, set nilainya
            if (data.kelas && data.kelas.id) {
                form.value.kelas_id = data.kelas.id;
            }

            const updateLink = data._links.find(link => link.rel === 'update');
            if (updateLink) {
                submitUrl.value = updateLink.href;
                submitMethod.value = updateLink.method;
            }
        } catch (error) {
            alert('Gagal mengambil detail siswa atau data tidak ditemukan.');
            router.push('/dashboard/siswa');
        }
    }

    isFetching.value = false;
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
        router.push('/dashboard/siswa');
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