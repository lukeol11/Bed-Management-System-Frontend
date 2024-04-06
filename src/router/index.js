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
import WardManagementView from "@/views/WardManagementView.vue";
import UserManagementView from "@/views/UserManagementView.vue";
import BedsList from "@/components/admin/BedsList.vue";
import BedView from "@/views/BedView.vue";

import { getAuth, onAuthStateChanged } from "firebase/auth";
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
                component: AdminView,
                children: [
                    {
                        path: "wards",
                        name: "wards",
                        component: WardManagementView,
                        children: [
                            {
                                path: ":wardId",
                                component: BedsList
                            }
                        ]
                    },
                    {
                        path: "users",
                        name: "users",
                        component: UserManagementView
                    }
                ]
            },
            {
                path: "transfer/:bedId",
                name: "transfer",
                component: TransferView
            },
            {
                path: "/signup",
                name: "signup",
                component: SignupView
            },
            {
                path: "bed/:bedId",
                name: "bed",
                component: BedView
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: LoginView
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

function waitForAuthState() {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        onAuthStateChanged(
            auth,
            (user) => {
                resolve(user);
            },
            reject
        );
    });
}

router.beforeEach(async (to, from, next) => {
    const currentUser = await waitForAuthState();
    if (currentUser) {
        store.commit("SET_USER_EMAIL", currentUser.email);
    }

    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !currentUser) {
        next("login");
    } else {
        next();
    }

    if (
        to.name === "requests" &&
        !store.getters.getUserDetails.can_approve_requests
    ) {
        next("dashboard");
    }

    if (to.name === "admin" && !store.getters.getUserDetails.can_administrate) {
        next("dashboard");
    }
});

export default router;
