<template>
    <div class="min-h-screen flex bg-emerald-50/50 font-sans text-slate-800">

        <aside
            class="w-64 bg-emerald-800 text-white flex-col transition-all duration-300 shadow-2xl z-20 hidden md:flex">
            <div class="h-16 flex items-center justify-center border-b border-emerald-700/50">
                <span class="text-xl font-bold tracking-wider flex items-center gap-2">
                    <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 14l9-5-9-5-9 5 9 5z"></path>
                    </svg>
                    SCHOOL API
                </span>
            </div>

            <nav class="flex-1 p-4 space-y-2 overflow-y-auto mt-4">
                <p class="text-emerald-400/70 text-xs uppercase font-bold mb-4 tracking-wider px-2">Menu Utama</p>
                <div
                    class="text-sm text-emerald-100/80 italic p-3 bg-emerald-900/50 rounded-lg border border-emerald-700/30">
                    Menu navigasi dinamis akan muncul di sini...
                </div>
            </nav>

            <div class="p-4 border-t border-emerald-700/50">
                <div class="flex items-center gap-3 px-2">
                    <div
                        class="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm shadow-inner">
                        A
                    </div>
                    <div class="text-sm">
                        <p class="font-semibold text-emerald-50">Admin User</p>
                        <p class="text-xs text-emerald-300">Administrator</p>
                    </div>
                </div>
            </div>
        </aside>

        <div class="flex-1 flex flex-col h-screen overflow-hidden">
            <header
                class="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6 z-10 border-b border-emerald-100">
                <div class="flex items-center gap-4">
                    <button class="md:hidden text-emerald-800 hover:bg-emerald-50 p-2 rounded-lg transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    <h2 class="text-lg font-bold text-emerald-900 hidden sm:block">Dashboard System</h2>
                </div>

                <div>
                    <button
                        class="flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-all duration-200">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                            </path>
                        </svg>
                        Keluar
                    </button>
                </div>
            </header>

            <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-emerald-50/30">
                <div class="mx-auto max-w-7xl">
                    <router-view />
                </div>
            </main>
        </div>

    </div>
</template>