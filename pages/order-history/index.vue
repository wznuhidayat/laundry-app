<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
import { Icon } from '@iconify/vue';
import { ref,computed } from 'vue';
import { useDateFormat } from '@vueuse/core'
import Pagination from '@/components/Pagination.vue';
import { useOrderStore } from '#build/imports';
import { useToastStore } from '#build/imports';
const toast = useToastStore();
const orderStore = useOrderStore();
await useFetch(() => orderStore.fetchOrders());
const currentPage = computed(() => orderStore.page);
const total = computed(() => orderStore.total);
const perPage = computed(() => orderStore.perPage);
const orders = computed(() => orderStore.orders);

const handlePageChange = (page) => {
  orderStore.setPage(page);
};
const modalChangeStatus = ref(false);
const selectedOrder = ref(null);
const editStatus = (order) => {
  modalChangeStatus.value = true;
  selectedOrder.value = order;
}
const deleteOrder = (id: number) => {
  isConfirmDelete.value = true;
  idCurrentDelete.value = id
}
const idCurrentDelete = ref(0);
const isConfirmDelete = ref(false);

const handleConfirm = async () => {
  const id = idCurrentDelete.value
  try {
    await orderStore.deleteOrder(id);
    await orderStore.fetchOrders();
    toast.showToast('Perfume successfully deleted!', 'success');
    isConfirmDelete.value = false;
  } catch (error) {
    toast.showToast(error, 'error');
  }
};

const handleClose = () => {
  isConfirmDelete.value = false;
}
const printOrder = (order) => {
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(`
    <html>
    <head>
      <title>Cetak Order #${order.invoice}</title>
      <style>
        body { font-family: Arial, sans-serif; }
        .invoice-container { padding: 20px; }
        .invoice-header { text-align: center; border-bottom: 1px solid #ccc; margin-bottom: 10px; line-height: 1rem; }
        table { width: 100%;  }
        table, th, td {  padding: 5px; text-align: left; }
        table.item-table { width: 100%; border-collapse: collapse; }
        table.item-table > thead > tr > th { text-align: center; }
        table.item-table > thead > tr > th,table.item-table > tbody > tr > td,table.item-table > tfoot > tr > td { border: 1px solid #ccc; }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="invoice-header">
          <h2>Laundry App</h2>
          <p>No. Telp : (021) 1234-5678, Jl. Jend. Sudirman No. 1, Jakarta - Indonesia</p>
        </div>
        <table>
          <tr><th>No Invoice</th><td>${order.invoice}</td><th>Customer</th><td>${order.customer ? order.customer.name : 'Guest'}</td></tr>
          <tr><th>Date</th><td>${useDateFormat(order.date, 'DD-MM-YYYY').value}</td><th>Status</th><td>${order.status === 0 ? 'Pending' : order.status === 1 ? 'Completed' : 'Canceled'}</td></tr>
        </table>
        <table class="item-table">
          <thead>
            <tr><th>No</th><th>Service</th><th>Perfume</th><th>Qty</th><th>Price</th></tr>
          </thead>
          <tbody>
            ${order.orderDetails.map((item, index) => `
              <tr><td>${index + 1}</td><td>${item.service.name}</td><td>${item.perfume ? item.perfume.name : '-'}</td><td style="text-align: center;">${item.qty}</td><td style="text-align: right;">${currency(item.price)}</td></tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr><td colspan="4" style="text-align: center;">Subtotal</td><td style="text-align: right;">${currency(order.subtotal)}</td></tr>
            <tr><td colspan="4" style="text-align: center;">Delivery</td><td style="text-align: right;">${currency(order.totalDelivery)}</td></tr>
            <tr><td colspan="4" style="text-align: center;">Discount</td><td style="text-align: right;">-${currency(order.totalDiscount)}</td></tr>
            <tr><td colspan="4" style="text-align: center;">Grand Total</td><td style="text-align: right;">${currency(order.grandTotal)}</td></tr>
            
          </tfoot>
        </table>
      </div>
      <script>
        window.onload = function() {
          window.print();
          window.close();
        };
      <\/script>
    </body>
    </html>
  `);
  printWindow.document.close();
};
</script>

<template>
  <NuxtLayout name="admin">
    <div class="card bg-base-100">
            <div class="card-body ">
                <div class="flex justify-between">
                  <h1 class="card-title">Order History</h1>
                </div>
                <div class="overflow-x-auto">
                    <table class="table table-zebra">
                        <!-- head -->
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Invoice</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- row 1 -->
                            <tr v-for="(order, index) in orders" :key="order.id">
                                <th>{{ index + 1 + (currentPage - 1) * perPage }}</th>
                                <td>{{ order.invoice }}</td>
                                <td>{{ order.customer ? order.customer.name : 'Guest' }}</td>
                                <td>
                                  <div v-if="order.status === 0" class="badge badge-warning">Pending</div>
                                  <div v-else-if="order.status === 1" class="badge badge-success">Completed</div>
                                  <div v-else class="badge badge-neutral">Canceled</div>
                                </td>
                                <td>{{ useDateFormat(order.date, 'DD-MM-YYYY') }}</td>
                                <td>{{ currency(order.grandTotal) }}</td>
                                <td class="space-x-2">
                                  <button @click="printOrder(order)" class="btn btn-square btn-info">
                                    <Icon icon="ic:baseline-local-printshop" class="h-5 w-5" />
                                  </button>
                                  <!-- Edit Status -->
                                  <button @click="editStatus(order)" class="btn btn-square btn-warning">
                                    <Icon icon="ic:baseline-credit-score" class="h-5 w-5" />
                                  </button>
                                  <button class="btn btn-square btn-error" @click="deleteOrder(order.id)">
                                        <Icon icon="material-symbols:delete" class="h-5 w-5" /> 
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination
                  :currentPage="currentPage"
                  :totalItems="total"
                  :itemsPerPage="perPage"
                  @pageChange="handlePageChange"
                />
            </div>
            
        </div>
        <ModalDialog
          :isOpen="isConfirmDelete"
          title="Delete Item"
          message="Are you sure you want to delete this item? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          confirmClass="btn-error text-white"
          @confirm="handleConfirm"
          @cancel="handleClose"
        />
        <ModalChangeStatus :isOpen="modalChangeStatus" @close="modalChangeStatus = false" :order="selectedOrder"></ModalChangeStatus>
  </NuxtLayout>
</template>