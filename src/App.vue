<template>
    <div id="app">
        <cv-modal
            :visible="showModal"
            :auto-hide-off="true"
            @primary-click="warningAccepted"
        >
            <template slot="title">Demo</template>
            <template slot="content"
                >Thanks for trying this demo build. Please note this will not be
                available outside of scheduled demo hours</template
            >
            <template slot="primary-button">I Understand</template>
        </cv-modal>
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            showModal: true
        };
    },
    methods: {
        warningAccepted() {
            this.showModal = false;
            localStorage.setItem("warningAccepted", true);
        }
    },
    created() {
        if (localStorage.getItem("warningAccepted")) {
            this.showModal = false;
        }
    }
};
</script>

<style lang="scss">
body {
    margin: 0px;
    #app {
        background-color: #d9d9d9;
        height: 100vh;
        .bx--modal-close {
            display: none;
        }
    }
}
</style>
