import { defineStore } from 'pinia';
import axios from 'axios';

export const useDiscountStore = defineStore('discount', {
    state: () => ({
        discounts: [],
    }),
    actions: {
        async fetchDiscounts() {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;

                const response = await axios.get(`${config.public.apiBase}/discount`);
                this.discounts = response.data.data;
            } catch (error) {
                console.error('Error fetching discounts:', error);
            }
        },
        async createDiscount(discount) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.post(`${config.public.apiBase}/discount`, discount);
            } catch (error) {
                const toast = useToastStore();
                toast.showToast(error.response.data.messages[0].message, 'error');
            }
        },
        async deleteDiscount(id) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.delete(`${config.public.apiBase}/discount/${id}`);
            } catch (error) {
                const toast = useToastStore();
                toast.showToast(error.response.data.messages[0].message, 'error');
            }
        },
    },
});