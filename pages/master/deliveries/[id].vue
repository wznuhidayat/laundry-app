<script setup>
import { useDeliverStore } from '~/stores/delivery';
import { customRound } from '~/utils/rounding';
const deliverStore = useDeliverStore();
const id = useRoute().params.id
const toast = useToastStore();
const form = reactive({
    name: '',
    price: '',
});

const errors = reactive({
    name: '',
    price: '',
})
const fetchItem = async () => {
  try {
    const data = await deliverStore.showDeliver(id);
    form.name = data.name;
    form.price = customRound(data.price);
  } catch (error) {
    console.error('Error fetching item:', error);
  }
};
await fetchItem();
const handleSubmit = async (id) => {
  try {
    const res = await deliverStore.updateDelivery(id, form);
    if(res){
        if(res.status == 200){
            toast.showToast('Delivery successfully updated!', 'success');
            navigateTo('/master/deliveries');
        }else if(res.status == 422){
            errors.name = ''
            errors.price = ''
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
                <h1 class="card-title">Edit Delivery</h1>
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
                            <span class="label-text">Price</span>
                        </div>
                        <input type="text" placeholder="long deliver" v-model="form.price" class="input input-bordered w-full max-w-xs" :class="{ 'input-error': errors.price }" />
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