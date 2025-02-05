import { defineStore } from 'pinia';
import axios from 'axios';

export const useDeliverStore = defineStore('deliver', {
    state: () => ({
        delivers: [],
        page: 1,
        perPage: 10,
        total: 0,
    }),
    actions: {
        async fetchDelivers() {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                const response = await axios.get(`${config.public.apiBase}/delivery`,{
                    params: {
                        page: this.page,
                        perPage: this.perPage,
                    }
                });
                this.delivers = response.data.data;
                this.page = response.data.meta.currentPage;
                this.perPage = response.data.meta.perPage;
                this.total = response.data.meta.total;
            } catch (error) {
                console.error('Error fetching delivers:', error);
            }
        },
        async createDeliver(delivery) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.post(`${config.public.apiBase}/delivery`, delivery);
            } catch (error) {
                const toast = useToastStore();
                return error.response.data;
            }
        },  
        async setPage(page) {
            this.page = page;
            await this.fetchDelivers();
        },
        async deleteDeliver(id) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.delete(`${config.public.apiBase}/delivery/${id}`);
            } catch (error) {
                const toast = useToastStore();
                toast.showToast(error.response.data.messages[0].message, 'error');
            }
        },
        async showDeliver(id) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                const data = await axios.get(`${config.public.apiBase}/delivery/${id}`);
                return data.data.delivery;
            } catch (error) {
                const toast = useToastStore();
                return error.response.data;
            }
        },
        async updateDelivery(id, delivery) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.put(`${config.public.apiBase}/delivery/${id}`, delivery);
            } catch (error) {
                const toast = useToastStore();
                return error.response.data;
            }
        },
        
    },
});