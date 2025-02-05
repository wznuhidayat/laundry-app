<script setup>
const durations = ref([]);
import { useToastStore } from '~/stores/toast';
const toast = useToastStore();
import { reactive } from 'vue';
import { useServiceStore } from '~/stores/service';
import { useDurationStore } from '~/stores/duration';
const DurationStore = useDurationStore();
const serviceStore = useServiceStore();
const id = useRoute().params.id

const fetchDurations = async () => {
    durations.value = await DurationStore.getAllDurations();
}
fetchDurations();
const form = reactive({
    name: '',
    type: '',
    duration_id: '',
    price: '',
});

const errors = reactive({
    name: '',
    type: '',
    duration_id: '',
    price: '',
})
const fetchItem = async () => {
  try {
    const data = await serviceStore.showService(id);
    form.name = data.name;
    form.type = data.type;
    form.duration_id = data.durationId;
    form.price = customRound(data.price);
  } catch (error) {
    console.error('Error fetching item:', error);
  }
};
await fetchItem();
const handleSubmit = async (id) => {
  try {
    const res = await serviceStore.updateService(id, form);
    if(res){
        if(res.status == 200){
            toast.showToast('Service successfully updated!', 'success');
            navigateTo('/master/services');
        }else if(res.status == 422){
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
                <h1 class="card-title">Create Service</h1>
                <form @submit.prevent="handleSubmit(id)" class=" space-y-4">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Name</span>
                        </div>
                        <input type="text" placeholder="name" v-model="form.name" class="input input-bordered w-full max-w-xs" :class="{ 'input-error': errors.name }" />
                        <div v-if="errors.name" class="label">
                            <span class="label-text-alt text-error">{{ errors.name }}</span>
                        </div>
                    </label>
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Type</span>
                        </div>
                        <select v-model="form.type" class="select select-bordered " :class="{ 'select-error': errors.type }">
                            <option disabled selected>-- select one --</option>
                            <option value="item" >Item</option>
                            <option value="weight">Weight</option>
                            <option value="length">Length</option>
                        </select>
                        <div v-if="errors.type" class="label">
                            <span class="label-text-alt text-error">{{ errors.type }}</span>
                        </div>
                    </label>
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Duration</span>
                        </div>
                        <select v-model="form.duration_id" class="select select-bordered " :class="{ 'select-error': errors.duration_id }">
                            <option disabled selected>-- select one --</option>
                            <option v-for="duration in durations" :key="duration.id" :value="duration.id" >{{ duration.name }}</option>
                        </select>
                        <div v-if="errors.duration_id" class="label">
                            <span class="label-text-alt text-error">{{ errors.duration_id }}</span>
                        </div>
                    </label>
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Price</span>
                        </div>
                        <input type="text" placeholder="price" v-model="form.price" class="input input-bordered w-full max-w-xs" :class="{ 'input-error': errors.price }" />
                        <div v-if="errors.price" class="label">
                            <span class="label-text-alt text-error">{{ errors.price }}</span>
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
