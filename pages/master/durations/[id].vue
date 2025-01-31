<script setup>
import { useDurationStore } from '~/stores/duration';
import { customRound } from '~/utils/rounding';
const durationStore = useDurationStore();
const id = useRoute().params.id
const toast = useToastStore();
const form = reactive({
    type: '',
    long_duration: '',
});

const errors = reactive({
    type: '',
    long_duration: '',
})
const fetchItem = async () => {
  try {
    const data = await durationStore.showDuration(id);
    form.name = data.name;
    form.long_duration = data.longDuration;
  } catch (error) {
    console.error('Error fetching item:', error);
  }
};
await fetchItem();
const handleSubmit = async (id) => {
  try {
    const res = await durationStore.updateDuration(id, form);
    if(res){
        if(res.status == 200){
            toast.showToast('Duration successfully updated!', 'success');
            navigateTo('/master/durations');
        }else if(res.status == 422){
            errors.type = ''
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
                <h1 class="card-title">Edit Duration</h1>
                <form @submit.prevent="handleSubmit(id)" class=" space-y-4">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Type</span>
                        </div>
                        <input type="text" placeholder="name" v-model="form.name" class="input input-bordered w-full max-w-xs" :class="{ 'input-error': errors.name }" />
                        <div v-if="errors.name" class="label">
                            <span class="label-text-alt text-error">{{ errors.name }}</span>
                        </div>
                    </label>
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Long Duration</span>
                        </div>
                        <input type="text" placeholder="long duration" v-model="form.long_duration" class="input input-bordered w-full max-w-xs" :class="{ 'input-error': errors.long_duration }" />
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