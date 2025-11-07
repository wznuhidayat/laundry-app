import { defineStore } from 'pinia';
import axios from 'axios';
// 
export const useOrderStore = defineStore('order', {
    state: () => ({
        orders: [],
        page: 1,
        perPage: 10,
        total: 0,
        summary: {
            totalOrders: 0,
            totalOrdersCompleted: 0,
            totalDeliveries: 0,
        },
        lastWeekTotals: [] as Array<{ date: string; totalOrders: number }>,
    }),
    actions: {
        async fetchOrders() {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                const response = await axios.get(`${config.public.apiBase}/order`,{
                    params: {
                        page: this.page,
                        perPage: this.perPage,
                    }
                });
                this.orders = response.data.data;
                this.page = response.data.meta.currentPage;
                this.perPage = response.data.meta.perPage;
                this.total = response.data.meta.total;
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        },
        async changeStatus(id, status) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                const response = await axios.put(`${config.public.apiBase}/order/status/${id}`,{
                    status: status
                });
                this.fetchOrders();
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        },
        async setPage(page) {
            this.page = page;
            await this.fetchOrders();
        },
        async deleteOrder(id) {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                return await axios.delete(`${config.public.apiBase}/order/${id}`);
            } catch (error) {
                const toast = useToastStore();
                toast.showToast(error.response.data.messages[0].message, 'error');
            }
        },
        async fetchSummary() {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                const response = await axios.get(`${config.public.apiBase}/order/summary`);
                this.summary = {
                    totalOrders: response.data.totalOrders ?? 0,
                    totalOrdersCompleted: response.data.totalOrdersCompleted ?? 0,
                    totalDeliveries: response.data.totalDeliveries ?? 0,
                };
            } catch (error) {
                console.error('Error fetching order summary:', error);
            }
        },
        async fetchLastWeekSummary() {
            try {
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                const response = await axios.get(`${config.public.apiBase}/order/summary/last-week`);
                this.lastWeekTotals = Array.isArray(response.data.dailyTotals) ? response.data.dailyTotals : [];
            } catch (error) {
                console.error('Error fetching last week summary:', error);
            }
        },
    },
});
