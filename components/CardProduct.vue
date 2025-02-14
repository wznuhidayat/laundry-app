<script setup>
const props = defineProps(['service'])
</script>

<template>
    <div class="card h-40 bg-base-100 hover:bg-base-100/70 p-4 shadow-sm ">
        <div class="flex h-full gap-4">
            <figure class="h-full w-1/3 border border-base-300 border-dashed rounded-lg">
                <img src="/public/tshirt.png" class="h-full object-contain scale-75 rounded-lg" alt="Shoes">
            </figure>
            <div class="w-2/3 py-2 space-y-2 flex flex-col justify-between ">
                <div class="w-full ">
                    <span class="font-bold line-clamp-2 w-full">
                        {{ service.name }}
                    </span>
                </div>
                <div class="w-full">
                    <span class="italic line-clamp-1 w-full">
                        {{ customRound(service.price) }}
                    </span>
                </div>
                <div class="flex justify-between w-full">
                    <div class="flex gap-2">
                        <div class="btn btn-circle btn-sm">-</div>
                        <div class="btn btn-circle btn-sm">1</div>
                        <div class="btn btn-circle btn-sm">+</div>
                    </div>
                    <button type="button" class="btn btn-secondary btn-sm">Add</button>
                </div>
            </div>
        </div>
        
    </div>
</template>