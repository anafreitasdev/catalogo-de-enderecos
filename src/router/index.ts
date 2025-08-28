import { createRouter, createWebHistory } from "vue-router";
import AddressRouter from "./routes/AdressRoutes";

const routes = [...AddressRouter];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
