<script setup>
import { useCartStore } from '#build/imports'

const props = defineProps(['service'])
const emit = defineEmits(['addToCart'])

const cartStore = useCartStore();

const qty = ref(1);

const increaseQty = () => {
    qty.value++;
}

const decreaseQty = () => {
    if (qty.value > 1) {
        qty.value--;
    }
}
</script>

<template>
    <div class="card bg-base-100 hover:bg-base-100/70 p-4 shadow-sm">
        <div class="flex gap-4">
            <figure class="w-1/3 border border-base-300 border-dashed rounded-lg">
                <img src="/public/tshirt.png" class="object-contain scale-75 rounded-lg" alt="Shoes">
            </figure>
            <div class="w-2/3 py-2 space-y-2 flex flex-col justify-between ">
                <div class="w-full ">
                    <span class="font-bold line-clamp-2 w-full">
                        {{ service.name }}
                    </span>
                </div>
                <div class="w-full">
                    <span class="italic line-clamp-1 w-full">
                        {{ currency(service.price) }}
                    </span>
                </div>
                <div class="flex justify-between w-full">
                    <div class="flex gap-2">
                        <div class="btn btn-circle btn-sm" @click="decreaseQty">-</div>
                        <div class="btn btn-circle btn-sm">{{ qty }}</div>
                        <div class="btn btn-circle btn-sm" @click="increaseQty">+</div>
                    </div>
                    <button type="button" class="btn btn-secondary btn-sm" @click="cartStore.addToCart(service, qty)">Add</button>
                </div>
            </div>
        </div>
        
    </div>
</template>