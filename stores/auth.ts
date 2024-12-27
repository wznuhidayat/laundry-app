import { defineStore } from 'pinia';
import { useRuntimeConfig } from '#app';
import axios from 'axios';
export const useAuthStore = defineStore('auth', {
    state: () => ({
      token: null as string | null,
      user: null as object | null,
    }),
});