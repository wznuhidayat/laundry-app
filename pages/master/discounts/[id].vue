<script setup>
import { useDiscountStore } from '~/stores/discount';
import { customRound } from '~/utils/rounding';
const discountStore = useDiscountStore();
const id = useRoute().params.id
const toast = useToastStore();
const form = reactive({
    type: '',
    value: '',
});

const errors = reactive({
    type: '',
    value: '',
})
const fetchItem = async () => {
  try {
    const data = await discountStore.showDiscount(id);
    form.type = data.type;
    form.value = customRound(data.value);
  } catch (error) {
    console.error('Error fetching item:', error);
  }
};
await fetchItem();
const handleSubmit = async (id) => {
  try {
    const res = await discountStore.updateDiscount(id, form);
    if(res){
        if(res.status == 200){
            toast.showToast('Discount successfully updated!', 'success');
            navigateTo('/master/discounts');
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
                <h1 class="card-title">Edit Discount</h1>
                <form @submit.prevent="handleSubmit(id)" class=" space-y-4">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Type</span>
                        </div>
                        <select v-model="form.type" class="select select-bordered " :class="{ 'select-error': errors.type }">
                            <option disabled selected>-- select one --</option>
                            <option value="percentage">Percentage</option>
                            <option value="amount">Amount</option>
                        </select>
                        <div v-if="errors.type" class="label">
                            <span class="label-text-alt text-error">{{ errors.type }}</span>
                        </div>
                    </label>
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Value</span>
                        </div>
                        <input type="text" placeholder="value" v-model="form.value" class="input input-bordered w-full max-w-xs" :class="{ 'input-error': errors.value }" />
                        <div v-if="errors.value" class="label">
                            <span class="label-text-alt text-error">{{ errors.value }}</span>
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