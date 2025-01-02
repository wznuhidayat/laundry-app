
<template>
    <div
      v-if="toast.message"
      :class="[
        'fixed bottom-5 right-5 flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow text-sm font-normal',
        {
          'text-gray-500 bg-white dark:text-gray-400 dark:bg-gray-800': true,
          'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200': toast.type === 'success',
          'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200': toast.type === 'error',
          'text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200': toast.type === 'warning',
          'text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200': toast.type === 'info',
        }
      ]"
      role="alert"
    >
      <div
        :class="[
          'inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg',
          {
            'bg-green-100 dark:bg-green-800': toast.type === 'success',
            'bg-red-100 dark:bg-red-800': toast.type === 'error',
            'bg-orange-100 dark:bg-orange-700': toast.type === 'warning',
            'bg-blue-100 dark:bg-blue-800': toast.type === 'info',
          }
        ]"
      >
        <svg
          class="w-5 h-5"
          :class="{
            'text-green-500 dark:text-green-200': toast.type === 'success',
            'text-red-500 dark:text-red-200': toast.type === 'error',
            'text-orange-500 dark:text-orange-200': toast.type === 'warning',
            'text-blue-500 dark:text-blue-200': toast.type === 'info',
          }"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            v-if="toast.type === 'success'"
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
          />
          <path
            v-if="toast.type === 'error'"
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
          />
          <path
            v-if="toast.type === 'warning'"
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"
          />
          <path
            v-if="toast.type === 'info'"
            d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM10 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM10 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
          />
        </svg>
      </div>
      <div class="ms-3">{{ toast.message }}</div>
      <button
        type="button"
        class="ms-auto bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Close"
        @click="clearToast"
      >
        <svg
          class="w-3 h-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  </template>
  
  <script setup>
  import { useToastStore } from '~/stores/toast';
  const toast = useToastStore();
  const clearToast = () => toast.clearToast();
  </script>
  