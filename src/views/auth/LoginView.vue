<template>
    <div id="loginBox">
        <cv-text-input id="email" label="Email" v-model="email" />
        <cv-text-input
            id="password"
            label="Password"
            type="password"
            v-model="password"
        />
        <cv-button @click="login()">Login</cv-button>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
    name: "LoginView",
    data() {
        return {
            password: "",
            email: ""
        };
    },
    methods: {
        login() {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    alert("Logged in!", userCredential.user.email);
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    }
};
</script>

<style lang="scss">
#loginBox {
    width: 34.95rem;
    height: 34.9rem;
    margin: auto;
    padding-top: 10rem;

    border-radius: 0.9375rem;
    background: #2e3648;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>
