<template>
    <Teleport to="body">
        <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div class="fixed inset-0 bg-emerald-900/40 backdrop-blur-sm transition-opacity" @click="$emit('close')">
            </div>

            <div
                class="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 overflow-hidden transform transition-all border border-emerald-100">
                <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full"
                    :class="type === 'danger' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'">
                    <component :is="icon" class="w-6 h-6" />
                </div>

                <h3 class="text-lg font-bold text-center text-emerald-900 mb-2">{{ title }}</h3>
                <p class="text-sm text-center text-emerald-600/80 mb-6">{{ message }}</p>

                <div class="flex gap-3 mt-4">
                    <button @click="$emit('close')"
                        class="flex-1 px-4 py-2 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                        Batal
                    </button>
                    <button @click="$emit('confirm')"
                        class="flex-1 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors shadow-md"
                        :class="type === 'danger' ? 'bg-red-600 hover:bg-red-700 shadow-red-200' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'">
                        {{ confirmText }}
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { computed } from 'vue';
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'; // Pastikan install @heroicons/vue

const props = defineProps({
    show: Boolean,
    title: String,
    message: String,
    confirmText: { type: String, default: 'Ya, Lanjutkan' },
    type: { type: String, default: 'info' } // 'info' or 'danger'
});

const icon = computed(() => props.type === 'danger' ? ExclamationTriangleIcon : InformationCircleIcon);

defineEmits(['close', 'confirm']);
</script>