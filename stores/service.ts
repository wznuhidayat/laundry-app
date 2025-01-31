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
                console.log(response.data.data)
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
        
    },
});