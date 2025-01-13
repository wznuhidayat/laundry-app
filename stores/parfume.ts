import { defineStore } from 'pinia';
import axios from 'axios';

export const useParfumeStore = defineStore('parfume', {
    state: () => ({
        parfumes: [],
    }),
    actions: {
        async fetchParfumes() {
            try {
                const response = await axios.get('/api/parfumes');
                this.parfumes = response.data;
            } catch (error) {
                console.error('Error fetching parfumes:', error);
            }
        },
        async createParfume(parfume) {
            try {
                await axios.post('/api/parfumes', parfume);
            } catch (error) {
                console.error('Error creating parfume:', error);
            }
        },
    },
});