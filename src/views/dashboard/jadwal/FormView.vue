<template>
    <div class="max-w-4xl mx-auto space-y-6">
        <div class="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
            <div class="flex items-center gap-4">
                <button @click="$router.push('/dashboard/jadwal')"
                    class="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </button>
                <div>
                    <h1 class="text-2xl font-bold text-emerald-900">{{ isEdit ? 'Edit Jadwal Pelajaran' : 'Tambah Jadwal Baru' }}</h1>
                    <p class="text-sm text-emerald-600">{{ isEdit ? 'Ubah waktu atau pengampu mata pelajaran' : 'Atur jadwal pelajaran, kelas, dan guru pengampu' }}</p>
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
                <p>Memuat data form dan referensi...</p>
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
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                            </path>
                        </svg>
                        Detail Pembelajaran
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

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
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-emerald-900 mb-1.5">Mata Pelajaran <span
                                    class="text-red-500">*</span></label>
                            <select v-model="form.mapel_id" required
                                class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-white cursor-pointer">
                                <option value="" disabled>-- Pilih Mapel --</option>
                                <option v-for="m in options.mapels" :key="m.id" :value="m.id">
                                    {{ m.nama_mapel }}
                                </option>
                            </select>
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-emerald-900 mb-1.5">Guru Pengampu <span
                                    class="text-red-500">*</span></label>
                            <select v-model="form.guru_id" required
                                class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-white cursor-pointer">
                                <option value="" disabled>-- Pilih Guru --</option>
                                <option v-for="g in options.gurus" :key="g.id" :value="g.id">
                                    {{ g.nama }} (NIP: {{ g.nip || '-' }})
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <h3
                        class="text-lg font-bold text-emerald-900 mb-4 border-b border-emerald-50 pb-2 flex items-center gap-2">
                        <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Waktu Pelaksanaan
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div>
                            <label class="block text-sm font-medium text-emerald-900 mb-1.5">Hari <span
                                    class="text-red-500">*</span></label>
                            <select v-model="form.hari" required
                                class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-white cursor-pointer">
                                <option value="" disabled>-- Pilih Hari --</option>
                                <option v-for="hari in days" :key="hari.value" :value="hari.value">{{ hari.label }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-emerald-900 mb-1.5">Jam Mulai <span
                                    class="text-red-500">*</span></label>
                            <input v-model="form.jam_mulai" type="time" required
                                class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-emerald-50/30">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-emerald-900 mb-1.5">Jam Selesai <span
                                    class="text-red-500">*</span></label>
                            <input v-model="form.jam_selesai" type="time" required
                                class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 bg-emerald-50/30">
                        </div>

                    </div>
                </div>

                <div class="flex justify-end gap-3 pt-6 border-t border-emerald-50 mt-8">
                    <button type="button" @click="$router.push('/dashboard/jadwal')"
                        class="px-5 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors">
                        Batal
                    </button>
                    <button type="submit" :disabled="isLoading"
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
const isFetching = ref(true); // Mulai dengan true karena kita pasti fetch data master
const isLoading = ref(false);
const errorMessage = ref(null);

const submitUrl = ref('/jadwal');
const submitMethod = ref('POST');

const form = ref({
    guru_id: '',
    mapel_id: '',
    kelas_id: '',
    hari: '',
    jam_mulai: '',
    jam_selesai: ''
});

// Referensi Data Master untuk Dropdown
const options = reactive({
    gurus: [],
    mapels: [],
    kelas: []
});

// Daftar Hari Statis
const days = [
    { value: 'senin', label: 'Senin' },
    { value: 'selasa', label: 'Selasa' },
    { value: 'rabu', label: 'Rabu' },
    { value: 'kamis', label: 'Kamis' },
    { value: 'jumat', label: 'Jumat' },
    { value: 'sabtu', label: 'Sabtu' },
];

const fetchMasterData = async () => {
    try {
        // Memanggil ke-3 endpoint secara paralel agar lebih cepat
        // Tambahkan parameter limit jika API Anda mendukunnya agar tidak terpotong pagination
        const [resGuru, resMapel, resKelas] = await Promise.all([
            api.get('/guru'),
            api.get('/mapel'),
            api.get('/kelas')
        ]);

        // Sesuaikan dengan struktur collection JSON Anda (biasanya di .data.data.items)
        options.gurus = resGuru.data?.data?.items || [];
        options.mapels = resMapel.data?.data?.items || [];
        options.kelas = resKelas.data?.data?.items || [];
    } catch (error) {
        console.error("Gagal mengambil data master referensi", error);
        alert("Gagal memuat daftar guru, kelas, atau mapel. Periksa koneksi backend.");
    }
};

onMounted(async () => {
    isFetching.value = true;

    // 1. Ambil data dropdown terlebih dahulu
    await fetchMasterData();

    // 2. Jika Mode Edit, panggil data spesifik jadwal
    if (route.params.id) {
        isEdit.value = true;
        try {
            const res = await api.get(`/jadwal/${route.params.id}`);
            const data = res.data.data;

            // Isi form (pastikan format jam H:i saja untuk input type="time")
            form.value.guru_id = data.guru_id;
            form.value.mapel_id = data.mapel_id;
            form.value.kelas_id = data.kelas_id;
            form.value.hari = data.hari;
            form.value.jam_mulai = data.jam_mulai ? data.jam_mulai.substring(0, 5) : '';
            form.value.jam_selesai = data.jam_selesai ? data.jam_selesai.substring(0, 5) : '';

            const updateLink = data._links.find(link => link.rel === 'update');
            if (updateLink) {
                submitUrl.value = updateLink.href;
                submitMethod.value = updateLink.method;
            }
        } catch (error) {
            alert('Gagal mengambil detail jadwal.');
            router.push('/dashboard/jadwal');
        }
    }

    isFetching.value = false;
});

const handleSubmit = async () => {
    isLoading.value = true;
    errorMessage.value = null;

    try {
        // Beberapa browser mengirimkan 'HH:mm', API kadang minta 'HH:mm:ss'
        // Laravel biasanya bisa menerima 'HH:mm' untuk kolom time, 
        // jika error validasi, kita bisa menambahkan ':00' di belakangnya di sini.

        await api({
            method: submitMethod.value,
            url: submitUrl.value,
            data: form.value
        });
        router.push('/dashboard/jadwal');
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