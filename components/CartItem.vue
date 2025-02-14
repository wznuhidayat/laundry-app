<script setup>
</script>

<template>
    <div class="group hover:bg-base-300 rounded-lg p-2 cursor-pointer transition duration-300 ease-in-out">
        <div class="flex gap-2 ">
            <div class="avatar relative">
                <div class="w-10 h-10 rounded-xl">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
                <div class="bg-neutral opacity-50 group-hover:opacity-100 absolute text-neutral-content rounded-lg w-10 transition delay-100 duration-300 ease-in-out">
                    <div class="text-3xl flex items-center justify-center h-full w-full font-bold">1</div>
                </div>
            </div>
            <div class="flex justify-between w-full gap-8">
                <div class="">
                    <p class="text-sm font-semibold line-clamp-2">Laundry Fast Version with extra parfume lor</p>
                </div>
                <div class="font-bold text-sm flex items-center">$200</div>
            </div>
        </div>
        <div class="hidden group-hover:flex justify-between mt-2 gap-2">
            <div class="flex-grow">
                <select class="select select-sm select-bordered w-full max-w-xs">
                    <option disabled selected>Select perfume</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>
            </div>
            <div class="flex gap-2">
                <div class="btn btn-circle btn-sm">-</div>
                <div class="btn btn-circle btn-sm">1</div>
                <div class="btn btn-circle btn-sm">+</div>
            </div>
        </div>
    </div>
</template>