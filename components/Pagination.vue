<template>
    <div class="join">
           <!-- Tombol Previous -->
           <button class="join-item btn" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
            Prev
        </button>
        <!-- Tombol Halaman Pertama -->
        <button class="join-item btn" :class="{ 'btn-active': currentPage === 1 }" 
            @click="goToPage(1)">
            1
        </button>

        <!-- Tombol Halaman Tengah -->
        <button v-for="page in middlePages" :key="page" class="join-item btn"
            :class="{ 'btn-active': currentPage === page }" @click="goToPage(page)">
            {{ page }}
        </button>

        <!-- Ellipsis -->
        <button class="join-item btn btn-disabled" disabled>...</button>
        <!-- Tombol Halaman Terakhir -->
        <button class="join-item btn" :class="{ 'btn-active': currentPage === totalPages }"
            @click="goToPage(totalPages)" v-if="totalPages > 1"
        >
            {{ totalPages }}
        </button>

        <!-- Tombol Next -->
        <button class="join-item btn" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
            Next
        </button>
    </div>
</template>

<script setup>
import { computed } from 'vue';

// Props untuk membuat komponen reusable
const props = defineProps({
    currentPage: {
        type: Number,
        required: true,
    },
    totalItems: {
        type: Number,
        required: true,
    },
    itemsPerPage: {
        type: Number,
        required: true,
        default: 10,
    },
    onPageChange: {
        type: Function ,
        required: true,
    },
});

// Total halaman
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

// Halaman tengah
const middlePages = computed(() => {
    const pages = [];
    const start = Math.max(2, props.currentPage - 2);
    const end = Math.min(totalPages.value - 1, props.currentPage + 2);
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
});

// Apakah tombol ellipsis perlu ditampilkan
const showEllipsis = computed(() => totalPages.value > 2 && middlePages.value.length > 0);

// Fungsi untuk berpindah halaman
const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        props.onPageChange(page);
    }
};
</script>