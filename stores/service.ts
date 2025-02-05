import { defineStore } from 'pinia';
import axios from 'axios';

export const useServiceStore = defineStore('service', {
    state: () => ({
        services: [],
        page: 1,
        perPage: 10,
        total: 0,
    }),
    actions: {
        async fetchServices() {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                const response = await axios.get(`${config.public.apiBase}/service`,{
                    params: {
                        page: this.page,
                        perPage: this.perPage,
                    }
                });
                this.services = response.data.data;
                this.page = response.data.meta.currentPage;
                this.perPage = response.data.meta.perPage;
                this.total = response.data.meta.total;
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        },
        async createService(service) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.post(`${config.public.apiBase}/service`, service);
            } catch (error) {
                const toast = useToastStore();
                return error.response.data;
            }
        }, 
        async setPage(page) {
            this.page = page;
            await this.fetchServices();
        }, 
        async showService(id) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                const data = await axios.get(`${config.public.apiBase}/service/${id}`);
                return data.data.service;
            } catch (error) {
                const toast = useToastStore();
                return error.response.data;
            }
        },
        async deleteService(id) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.delete(`${config.public.apiBase}/service/${id}`);
            } catch (error) {
                const toast = useToastStore();
                toast.showToast(error.response.data.messages[0].message, 'error');
            }
        },
        async updateService(id, service) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.put(`${config.public.apiBase}/service/${id}`, service);
            } catch (error) {
                const toast = useToastStore();
                return error.response.data;
            }
        },
    },
});