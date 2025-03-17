import { defineStore } from 'pinia';
import { useToastStore } from '~/stores/toast';
import axios from 'axios';
// 
export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: [],
        shipping: null,
        totalShipping: 0,
        discount: null,
        totalDiscount: 0,
        customer: null,
    }),
    actions: {
        addToCart(item, qty) {
            const index = this.cart.findIndex(i => i.id === item.id);
            if (index !== -1) {
                this.cart[index].qty += qty;
            } else {
                this.cart.push({ ...item, qty: qty, perfumeId: null });
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
        setParfumeId(id, perfumeId) {
            const item = this.cart.find(i => i.id === id);
            if (item) {
                item.perfumeId = perfumeId;
            }
        },
        setCustomer(customer) {
            this.customer = customer;
        },
        checkout(){
            if(this.cart.length == 0){
                const toast = useToastStore();
                toast.showToast("Please add item to cart", 'error')
            }
        },
        async submit(){
            try{
                const config = useRuntimeConfig();
                const authStore = useAuthStore();
                axios.defaults.headers.common.Authorization = `Bearer ${authStore.token}`;
                const payload = {
                    service_id: this.cart.map(item => item.id),
                    qty: this.cart.map(item => item.qty),
                    perfume_id: this.cart.map(item => item.perfumeId),
                    status: '1',
                    delivery_id: this.shipping ? this.shipping.id : null,
                    discount_id: this.discount ? this.discount.id : null,
                    customer_id: this.customer ? this.customer.id : null
                }
                const response = await axios.post(`${config.public.apiBase}/order/checkout`, payload);
                if(response.status == 200){
                    this.$reset();
                };
                return response;
            }catch(error){
                // const toast = useToastStore();
                console.log(error)
                // return error.;
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