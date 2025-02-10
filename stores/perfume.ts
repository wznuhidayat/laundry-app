import { defineStore } from 'pinia';
import axios from 'axios';

export const usePerfumeStore = defineStore('perfume', {
    state: () => ({
        perfumes: [],
        page: 1,
        perPage: 10,
        total: 0,
    }),
    actions: {
        async fetchPerfumes() {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                const response = await axios.get(`${config.public.apiBase}/perfume`,{
                    params: {
                        page: this.page,
                        perPage: this.perPage,
                    }
                });
                this.perfumes = response.data.data;
                this.page = response.data.meta.currentPage;
                this.perPage = response.data.meta.perPage;
                this.total = response.data.meta.total;
            } catch (error) {
                console.error('Error fetching perfumes:', error);
            }
        },
        async showPerfume(id) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                const data = await axios.get(`${config.public.apiBase}/perfume/${id}`);
                return data.data.perfume;
            } catch (error) {
                const toast = useToastStore();
                return error.response.data;
            }
        },
        async createPerfume(perfume) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.post(`${config.public.apiBase}/perfume`, perfume);
            } catch (error) {
                const toast = useToastStore();
                return error.response.data;
            }
        },
        async updatePerfume(id, perfume) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.put(`${config.public.apiBase}/perfume/${id}`, perfume);
            } catch (error) {
                const toast = useToastStore();
                return error.response.data;
            }
        } , 
        async deletePerfume(id) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.delete(`${config.public.apiBase}/perfume/${id}`);
            } catch (error) {
                const toast = useToastStore();
                toast.showToast(error.response.data.messages[0].message, 'error');
            }
        },
        async setPage(page) {
            this.page = page;
            await this.fetchDurations();
        },
    },
});