<template>
    <form @submit.prevent="handleLogin" class="space-y-5">

        <div v-if="errorMessage"
            class="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-200">
            {{ errorMessage }}
        </div>

        <div>
            <label class="block text-sm font-medium text-emerald-900 mb-1">Username</label>
            <input v-model="form.username" type="text" required
                class="w-full px-4 py-2.5 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors bg-emerald-50/30"
                placeholder="admin">
        </div>

        <div>
            <label class="block text-sm font-medium text-emerald-900 mb-1">Password</label>
            <input v-model="form.password" type="password" required
                class="w-full px-4 py-2.5 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors bg-emerald-50/30"
                placeholder="••••••••">
        </div>

        <button type="submit" :disabled="isLoading"
            class="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md shadow-emerald-200 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2">
            <span v-if="isLoading"
                class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            {{ isLoading ? 'Memproses...' : 'Masuk' }}
        </button>
    </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
    username: '',
    password: ''
});

const isLoading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
    isLoading.value = true;
    errorMessage.value = '';

    try {
        await authStore.login(form);
        // Jika sukses, arahkan ke dashboard
        router.push('/dashboard');
    } catch (error) {
        // Tangani jika kredensial salah
        errorMessage.value = error.response?.data?.message || 'Login gagal. Periksa kembali email dan password Anda.';
    } finally {
        isLoading.value = false;
    }
};
</script>