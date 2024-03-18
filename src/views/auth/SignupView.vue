<template>
    <div id="signupBox">
        <cv-text-input id="email" label="Email" v-model="email" />
        <cv-text-input
            id="password"
            label="Password"
            type="password"
            v-model="password"
        />
        <cv-button @click="signup()">Sign up</cv-button>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
    name: "SignupView",
    data() {
        return {
            password: "",
            email: ""
        };
    },
    methods: {
        signup() {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    alert("Account created!", userCredential.user.email);
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    }
};
</script>

<style lang="scss">
#signupBox {
    width: 34.95rem;
    height: 34.9rem;
    margin: auto;
    padding-top: 10rem;

    border-radius: 0.9375rem;
    background: #2e3648;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>
