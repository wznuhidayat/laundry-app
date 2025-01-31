<script setup lang="ts">
definePageMeta({
    layout: 'admin'
})
import { useToastStore } from '~/stores/toast';
const toast = useToastStore();
import { reactive } from 'vue';
import { useDurationStore } from '~/stores/duration';
const durationStore = useDurationStore();

const form = reactive({
    name: '',
    long_duration: '',
});

const errors = reactive({
    name: '',
    long_duration: '',
})

const handleSubmit = async () => {
  try {
    const res = await durationStore.createDuration(form);
    if(res){
        if(res.status == 201){
            navigateTo('/master/durations');
        }else if(res.status == 422){
            errors.name = ''
            errors.value = ''
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
                        <input name="text" placeholder="name" v-model="form.name" class="input input-bordered w-full max-w-xs" :class="{ 'input-error': errors.name }" />
                        <div v-if="errors.name" class="label">
                            <span class="label-text-alt text-error">{{ errors.name }}</span>
                        </div>
                    </label>
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Long Duration</span>
                        </div>
                        <input name="text" placeholder="long duration" v-model="form.long_duration" class="input input-bordered w-full max-w-xs" :class="{ 'input-error': errors.long_duration }" />
                        <div v-if="errors.long_duration" class="label">
                            <span class="label-text-alt text-error">{{ errors.long_duration }}</span>
                        </div>
                    </label>
                    <div class="card-actions">
                        <button class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>

        </div>
    </NuxtLayout>
</template>