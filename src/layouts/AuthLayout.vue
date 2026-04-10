<template>
    <div class="min-h-screen bg-emerald-50 flex flex-col justify-center items-center p-4 sm:p-6">
        <div
            class="w-full max-w-md bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 transform transition-all">
            <div class="flex justify-center mb-6">
                <div class="bg-emerald-600 text-white p-4 rounded-full shadow-lg shadow-emerald-200">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222">
                        </path>
                    </svg>
                </div>
            </div>

            <h1 class="text-2xl font-extrabold text-center text-emerald-900 mb-2">Sistem Sekolah</h1>
            <p class="text-center text-emerald-600/80 mb-8 text-sm">Masuk ke akun Anda untuk melanjutkan</p>

            <router-view />
        </div>

        <p class="mt-8 text-sm text-emerald-600/60 text-center">
            &copy; 2026 School API Management. All rights reserved.
        </p>
    </div>
</template>