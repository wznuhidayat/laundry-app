import { defineStore } from 'pinia';
import axios from 'axios';

export const useDurationStore = defineStore('duration', {
    state: () => ({
        durations: [],
        page: 1,
        perPage: 10,
        total: 0,
    }),
    actions: {
        async fetchDurations() {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                const response = await axios.get(`${config.public.apiBase}/duration`,{
                    params: {
                        page: this.page,
                        perPage: this.perPage,
                    }
                });
                console.log(response.data.data)
                this.durations = response.data.data;
                this.page = response.data.meta.currentPage;
                this.perPage = response.data.meta.perPage;
                this.total = response.data.meta.total;
            } catch (error) {
                console.error('Error fetching durations:', error);
            }
        },
        async createDuration(duration) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.post(`${config.public.apiBase}/duration`, duration);
            } catch (error) {
                const toast = useToastStore();
                return error.response.data;
            }
        },  
        async setPage(page) {
            this.page = page;
            await this.fetchDurations();
        },
        async deleteDuration(id) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.delete(`${config.public.apiBase}/duration/${id}`);
            } catch (error) {
                const toast = useToastStore();
                toast.showToast(error.response.data.messages[0].message, 'error');
            }
        },
        async showDuration(id) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                const data = await axios.get(`${config.public.apiBase}/duration/${id}`);
                return data.data.duration;
            } catch (error) {
                const toast = useToastStore();
                return error.response.data;
            }
        },
        async updateDuration(id, duration) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.put(`${config.public.apiBase}/duration/${id}`, duration);
            } catch (error) {
                const toast = useToastStore();
                return error.response.data;
            }
        },
    },
});