<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
import { useParfumeStore } from '~/stores/parfume';
const parfumeStore = useParfumeStore();
const test = await parfumeStore.fetchParfumes();
console.log(test)
</script>
<template>
    <NuxtLayout name="admin">
        <div class="card bg-base-100">
            <div class="card-header p-4">
                <h1 class="card-title">Parfumes</h1>
            </div>
            <div class="card-body ">
                <div class="overflow-x-auto">
                    <table class="table table-zebra">
                        <!-- head -->   
                        <thead>
                        <tr>
                            <th >No</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- row 1 -->
                        <tr>
                            <th>1</th>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                        <!-- row 2 -->
                        <tr>
                            <th>2</th>
                            <td>Desktop Support Technician</td>
                            <td>Purple</td>
                        </tr>
                        <!-- row 3 -->
                        <tr>
                            <th>3</th>
                            <td>Tax Accountant</td>
                            <td>Red</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>