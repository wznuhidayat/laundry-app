<script setup>
const props = defineProps(['item']);
import { Icon } from '@iconify/vue';    
import { useCartStore } from '#build/imports';
import { usePerfumeStore } from '#build/imports';
const cartStore = useCartStore();
const perfumeStore = usePerfumeStore();
const computedPrice = computed(() => {
    return props.item.price * props.item.qty;
})
const parfumeId = ref(null);

watch(parfumeId, (newValue) => {
    cartStore.setParfumeId(props.item.id, newValue);
})

useFetch(() => perfumeStore.fetchPerfumes());
</script>

<template>
    <div class="group relative hover:bg-base-100/50 rounded-lg cursor-pointer transition duration-300 ease-in-out">
        <div class="flex gap-2 ">
            <div class="avatar relative">
                <div class="w-10 h-10 rounded-xl">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
                <div class="bg-neutral opacity-50 group-hover:opacity-100 absolute text-neutral-content rounded-lg w-10 transition delay-100 duration-300 ease-in-out">
                    <div class="text-3xl flex items-center justify-center h-full w-full font-bold">{{ item.qty }}</div>
                </div>
            </div>
            <div class="flex justify-between w-full gap-8">
                <div class="">
                    <p class="text-sm font-semibold line-clamp-2">{{ item.name }}</p>
                </div>
                <div class="font-bold text-sm flex items-center">{{ currency(computedPrice) }}</div>
            </div>
        </div>
        <div class="hidden group-hover:flex justify-between mt-2 gap-2">
            <div class="flex-grow">
                <select class="select select-sm select-bordered w-full max-w-xs" v-model="parfumeId">
                    <option disabled selected>Select perfume</option>
                    <option v-for="perfume in perfumeStore.perfumes" :key="perfume.id" :value="perfume.id">{{ perfume.name }}</option>
                </select>
            </div>
                <div class="flex gap-2">
                    <div class="btn btn-circle btn-sm" v-if="item.qty == 1" @click="cartStore.removeItem(item.id)"><Icon icon="ic:twotone-remove-shopping-cart" class="w-5 h-5 text-red-500"></Icon></div>
                    <div class="btn btn-circle btn-sm" v-if="item.qty > 1" @click="cartStore.decreaseQty(item.id)">-</div>
                    <div class="btn btn-circle btn-sm">{{ cartStore.getQty(item.id) }}</div>
                    <div class="btn btn-circle btn-sm" @click="cartStore.increaseQty(item.id)">+</div>
                </div>
        </div>
        <div class="absolute top-5 -left-2 z-50">
            
        </div>
    </div>
</template>