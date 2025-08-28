import type { RouteRecordRaw } from 'vue-router';
import AddressListPage from '../../pages/AddressList/AddressListPage.vue';

const AddressRouter: RouteRecordRaw[] = [
  {
    path: '',
    component: AddressListPage,
  }
];

export default AddressRouter;
