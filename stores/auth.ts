import { defineStore } from 'pinia';
import { useRuntimeConfig } from '#app';
import axios from 'axios';
export const useAuthStore = defineStore('auth', {
    state: () => ({
      token: null as string | null,
      user: null as object | null,
    }),
    persist: true,
    actions: {
        async login(credentials: { email: string; password: string }) {
            const config = useRuntimeConfig();
            try {
              const response = await axios.post(`${config.public.apiBase}/login`, credentials, {
                withCredentials: true, // Penting untuk cookie HTTP-Only
              });
              this.user = response.data.user;
              this.token = response.data.token.token;
              
              return response.data;
            } catch (error: any) {
              throw error.response?.data || error.message;
            }
          },
          async logout() {
            const config = useRuntimeConfig();
            try {
              await axios.post(`${config.public.apiBase}/logout`, {}, { withCredentials: true,
                headers: {
                    Authorization: `Bearer ${this.token}`,  // Pastikan token dikirim di header Authorization
                  },
               });
              this.user = null;
              this.token = null;
              return true;
            } catch (error: any) {
              throw error.response?.data || error.message;
            }
          },
    },
});