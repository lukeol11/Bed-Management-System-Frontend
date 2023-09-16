<template>
    <div id="loginBox">
        <div id="title">
            <p>Bed<br />Management<br />System</p>
            <hospital-bed-icon />
        </div>

        <cv-form @submit.prevent="login()">
            <cv-text-input
                id="email"
                label="Email"
                placeholder="example@health.com"
                v-model="email"
            />
            <cv-text-input
                id="password"
                label="Password"
                type="password"
                placeholder="Password"
                v-model="password"
            />
            <button style="visibility: hidden"></button>
        </cv-form>
        <cv-button-set>
            <cv-button id="helpButton" @click="openModal()">
                Help
                <help-icon />
            </cv-button>
            <cv-button id="loginButton" @click="login()">
                Login
                <login-icon />
            </cv-button>
        </cv-button-set>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import HospitalBedIcon from "@carbon/icons-vue/es/hospital-bed/32";
import LoginIcon from "@carbon/icons-vue/es/login/32";
import HelpIcon from "@carbon/icons-vue/es/help/32";

export default {
    name: "LoginView",
    data() {
        return {
            password: "",
            email: "",
            errorMessage: ""
        };
    },
    components: {
        HospitalBedIcon,
        LoginIcon,
        HelpIcon
    },
    methods: {
        login() {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    console.info(
                        "Welcome " + userCredential.user.email.split("@")[0]
                    );
                    this.$router.push("/");
                })
                .catch((error) => {
                    this.errorMessage = error.message;
                });
        },
        openModal() {
            console.log("open modal");
        }
    }
};
</script>

<style lang="scss">
#loginBox {
    width: 35rem;
    height: 35rem;
    margin: auto;
    padding-top: 5rem;
    top: 10rem;
    position: relative;
    border-radius: 0.9375rem;
    background: #2e3648;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    form.bx--form .cv-text-input label.bx--label,
    #title svg,
    #title p {
        color: #fff;
    }
    form.bx--form {
        margin-left: 5rem;
        margin-right: 5rem;
        .cv-text-input {
            margin-top: 2rem;
        }
    }
    .cv-button-set {
        margin-left: 5.2rem;
        margin-right: 5.2rem;
        margin-top: 2rem;
        .bx--btn--primary {
            &#loginButton {
                background: #0099ff;
                height: 4.3rem;
                color: #fff;
                text-align: center;
                font-family: Roboto, sans-serif;
                font-size: 1.5rem;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                letter-spacing: 0.0625rem;
            }
            &#helpButton {
                background: #323e58;
                height: 4.3rem;
                color: #fff;
                text-align: center;
                font-family: Roboto, sans-serif;
                font-size: 1.5rem;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                letter-spacing: 0.0625rem;
            }
        }
    }
    #title {
        padding-left: 10.225rem;
        display: inline-block;
        padding-bottom: 2rem;
        p {
            text-align: center;
            font-family: Roboto, sans-serif;
            font-size: 1.5rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            letter-spacing: 0.0625rem;
            width: 10.75rem;
            height: 5.3rem;
            flex-direction: column;
            justify-content: center;
            display: inline-block;
        }
        svg {
            width: 3.8rem;
            height: 3.8rem;
            display: inline-block;
        }
    }
}
</style>
