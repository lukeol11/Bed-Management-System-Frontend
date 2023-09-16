import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/auth/LoginView.vue";
import SignupView from "../views/auth/SignupView.vue";
import { getAuth } from "firebase/auth";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
        meta: {
            requiresAuth: true
        }
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
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !currentUser) {
        next("login");
    } else {
        next();
    }
});

export default router;
