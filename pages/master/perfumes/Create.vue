<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
import { reactive } from 'vue';
import { usePerfumeStore } from '~/stores/perfume';
import { useToastStore } from '~/stores/toast';
const toast = useToastStore();
const perfumeStore = usePerfumeStore();
const form = reactive({
  name: '', 
});
const errors = reactive({
    name: '',
})
const handleSubmit = async () => {
  try {
    const res = await perfumeStore.createPerfume(form);
    if(res){
        if(res.status == 201){
            navigateTo('/master/perfumes');
        }else if(res.status == 422){
            errors.name = ''
            res.messages.forEach(error => {
                if (errors.hasOwnProperty(error.field)) {
                    errors[error.field] = error.message
                }
            })
        }
    }
  } catch (error) {
    toast.showToast(error, 'error');
  }
};
</script>
<template>
    <NuxtLayout name="admin">
        <div class="card bg-base-100">
            <div class="card-body">
                <h1 class="card-title">Create Duration</h1>
                <form @submit.prevent="handleSubmit" class=" space-y-4">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Name</span>
                        </div>
                        <input type="text" v-model="form.name" placeholder="name of parfume" class="input input-bordered w-full max-w-xs" />
                    </label>
                    <div class="card-actions">
                        <button class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>  
    </NuxtLayout>
</template>