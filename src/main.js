import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import "carbon-components/css/carbon-components.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import CarbonComponentsVue from "@carbon/vue";
Vue.use(CarbonComponentsVue);

let app = "";
import firebaseConfig from "./firebaseConfig";
initializeApp(firebaseConfig);

getAuth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: (h) => h(App)
        }).$mount("#app");
    }
});
