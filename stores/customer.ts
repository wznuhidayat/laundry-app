import { defineStore } from 'pinia';
import axios from 'axios';

export const useCustomerStore = defineStore('customer', {
    state: () => ({
        customers: [],
        page: 1,
        perPage: 10,
        total: 0,
        searchResults: [],
    }),
    actions: {
        async fetchCustomers() {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                const response = await axios.get(`${config.public.apiBase}/customer`,{
                    params: {
                        page: this.page,
                        perPage: this.perPage,
                    }
                });
                this.customers = response.data.data;
                this.page = response.data.meta.currentPage;
                this.perPage = response.data.meta.perPage;
                this.total = response.data.meta.total;
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        },
        async createCustomer(customer) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.post(`${config.public.apiBase}/customer`, customer);
            } catch (error) {
                const toast = useToastStore();
                return error.response.data;
            }
        },  
        async setPage(page) {
            this.page = page;
            await this.fetchCustomers();
        },
        async deleteCustomer(id) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.delete(`${config.public.apiBase}/customer/${id}`);
            } catch (error) {
                const toast = useToastStore();
                toast.showToast(error.response.data.messages[0].message, 'error');
            }
        },
        async showCustomer(id) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                const data = await axios.get(`${config.public.apiBase}/customer/${id}`);
                return data.data.customer;
            } catch (error) {
                const toast = useToastStore();
                return error.response.data;
            }
        },
        async updateCustomer(id, customer) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.put(`${config.public.apiBase}/customer/${id}`, customer);
            } catch (error) {
                const toast = useToastStore();
                return error.response.data;
            }
        },
        async searchCustomers(search) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                const response = await axios.get(`${config.public.apiBase}/customer-search`, {
                    params: {
                        query: search,
                    }
                });
                this.searchResults = response.data.customers;
            } catch (error) {
                console.error('Error searching customers:', error);
            }
        },
    },
});