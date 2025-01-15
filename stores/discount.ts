import { defineStore } from 'pinia';
import axios from 'axios';

export const useDiscountStore = defineStore('discount', {
    state: () => ({
        discounts: [],
        page: 1,
        perPage: 10,
        total: 0,
    }),
    actions: {
        async fetchDiscounts() {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                const response = await axios.get(`${config.public.apiBase}/discount`,{
                    params: {
                        page: this.page,
                        perPage: this.perPage,
                    }
                });
                this.discounts = response.data.data;
                this.page = response.data.meta.currentPage;
                this.perPage = response.data.meta.perPage;
                this.total = response.data.meta.total;
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
        async setPage(page) {
            this.page = page;
            await this.fetchDiscounts();
        },
    },
});