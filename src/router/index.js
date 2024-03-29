import Vue from "vue";
import store from "../store";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/auth/LoginView.vue";
import SignupView from "../views/auth/SignupView.vue";
import DashboardView from "../views/DashboardView.vue";
import RequestsView from "../views/RequestsView.vue";
import CreateView from "../views/CreateView.vue";
import SearchView from "../views/SearchView.vue";
import AdminView from "../views/AdminView.vue";
import TransferView from "@/views/TransferView.vue";

import { getAuth } from "firebase/auth";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
        redirect: "/dashboard",
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: DashboardView
            },
            {
                path: "requests",
                name: "requests",
                component: RequestsView
            },
            {
                path: "create",
                name: "create",
                component: CreateView
            },
            {
                path: "search",
                name: "search",
                component: SearchView
            },
            {
                path: "admin",
                name: "admin",
                component: AdminView
            },
            {
                path: "transfer",
                name: "transfer",
                component: TransferView
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: LoginView
    },
    {
        path: "/signup",
        name: "signup",
        component: SignupView
    },
    {
        path: "/logout",
        name: "logout",
        beforeEnter: (to, from, next) => {
            getAuth().signOut();
            next("/login");
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach(async (to, from, next) => {
    const currentUser = getAuth().currentUser;
    store.commit("SET_USER_EMAIL", currentUser.email);
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !currentUser) {
        next("login");
    } else {
        next();
    }
});

export default router;
