import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        hospitals: [],
        email: "",
        userDetails: {},
        selectedHospital: {},
        authToken: ""
    },
    getters: {
        allHospitals: (state) => state.hospitals,
        getUserEmail: (state) => state.email,
        getSelectedHospital: (state) => state.selectedHospital,
        getUserDetails: (state) => state.userDetails,
        getHospitalById: (state) => (id) => {
            return state.hospitals.find((hospital) => hospital.id === id);
        },
        getAuthToken: (state) => state.authToken
    },
    mutations: {
        SET_HOSPITALS(state, hospitals) {
            state.hospitals = hospitals;
        },
        SET_USER_EMAIL(state, email) {
            state.email = email;
        },
        SET_USER_DETAILS(state, userDetails) {
            state.userDetails = userDetails;
        },
        SET_SELECTED_HOSPITAL(state, hospital) {
            state.selectedHospital = hospital;
        },
        SET_AUTH_TOKEN(state, token) {
            state.authToken = token;
        }
    },
    actions: {
        fetchHospitals({ commit, state }) {
            axios
                .get("/api/hospitals/all", {
                    headers: {
                        Authorization: `Bearer ${state.authToken}`,
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => {
                    commit("SET_HOSPITALS", response.data);
                })
                .catch((error) => console.error(error));
        },
        fetchUserDetails({ commit, state }) {
            if (!state.email) {
                console.error("Email not set.");
                return;
            }
            axios
                .get(`/api/users/find?email=${state.email}`, {
                    headers: {
                        Authorization: `Bearer ${state.authToken}`,
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => {
                    commit("SET_USER_DETAILS", response.data);
                })
                .catch((error) => console.error(error));
        }
    },
    modules: {}
});
