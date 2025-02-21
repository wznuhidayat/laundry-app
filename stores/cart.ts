import { defineStore } from 'pinia';
import axios from 'axios';

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: [],
        shipping: null,
        totalShipping: 0,
        discount: null,
        totalDiscount: 0,
    }),
    actions: {
        addToCart(item, qty) {
            const index = this.cart.findIndex(i => i.id === item.id);
            if (index !== -1) {
                this.cart[index].qty += qty;
            } else {
                this.cart.push({ ...item, qty: qty, parfumeId: null });
            }
        },
        removeItem(id) {
            this.cart = this.cart.filter(item => item.id !== id);
        },
        getQty(id) {
            const item = this.cart.find(i => i.id === id);
            return item ? item.qty : 1;
        },
        increaseQty(id) {
            const item = this.cart.find(i => i.id === id);
            if (item) {
                console.log(id)
                item.qty++;
            }
        },
        decreaseQty(id) {
            const item = this.cart.find(i => i.id === id);
            if (item && item.qty > 1) {
                item.qty--;
            }
        },
        setTotalShipping(totalShipping) {
            this.totalShipping = totalShipping;
        },
        setShipping(shipping) {
            this.shipping = shipping;
        },
        setDiscount(discount) {
            this.discount = discount;
            this.setTotalDiscount(discount);
        },
        setTotalDiscount(discount) {
            if(!discount) this.totalDiscount = 0;
            if(discount.type == 'amount') this.totalDiscount = discount.value;
            if(discount.type == 'percentage') this.totalDiscount = this.subtotal * (discount.value / 100);
        },
        setParfumeId(id, parfumeId) {
            const item = this.cart.find(i => i.id === id);
            if (item) {
                item.parfumeId = parfumeId;
            }
        }
    },
    getters: {
        subtotal: (state) => {
            return state.cart.reduce((total, item) => total + item.price * item.qty, 0);
        },
        total: (state) => {
            return parseFloat(state.subtotal) + parseFloat(state.totalShipping) - parseFloat(state.totalDiscount);
        },
       
    }

});