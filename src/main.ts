import { createPinia } from "pinia";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import AuthServiceHttp from "./services/AuthServiceHttp";
import { useAuthStore } from "./stores/AuthStore";
import DashboardViewVue from "./views/DashboardView.vue";
import LoginViewVue from './views/LoginView.vue';
import LandingPageViewVue from './views/LandingPageView.vue';
import RegisterViewVue from './views/RegisterView.vue';
import ResultViewVue from './views/ResultView.vue';
import UserServiceHttp from "./services/UserServiceHttp";

import Vue from 'vue'


const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: LandingPageViewVue},
        {path: "/login", component: LoginViewVue},
        {path: "/register", component: RegisterViewVue},
        {path: "/result", component: ResultViewVue},
        {path: "/dashboard", component: DashboardViewVue},
    ]
})

const httpClient = new AxiosAdapter(router);
const baseUrl = "https://easygest-backend.herokuapp.com";
// const baseUrl = "http://localhost:8080";
const authService = new AuthServiceHttp(httpClient, baseUrl);
const userService = new UserServiceHttp(httpClient, baseUrl);

const pinia = createPinia();
pinia.use(({ store }) => {
  store.$router = router,
  store.authService = authService,
  store.userService = userService
});

app.use(router)
app.use(pinia)

useAuthStore().init();

app.mount("#app");
