import { defineStore } from 'pinia';
type ToastType = 'success' | 'error' | 'warning' | 'info';
interface ToastState {
    message: string;
    type: ToastType | ''; // Allow an empty string for the initial state
  }
export const useToastStore = defineStore('toast', {
    state: (): ToastState => ({
        message: '',
        type: '',
    }),
    actions: {
        showToast(message: string, type: ToastType) {
            this.message = message;
            this.type = type;
            setTimeout(() => {
              this.message = '';
              this.type = '';
            }, 3000);
          },
          clearToast() {
            this.message = '';
            this.type = '';
          },
    },
});