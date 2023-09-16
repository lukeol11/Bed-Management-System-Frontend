<template>
    <div class="Layout">
        <top-bar :hospital-name="hospitalName" />
        <side-bar />

        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script>
import SideBar from "./SideBar.vue";
import TopBar from "./TopBar.vue";

export default {
    name: "MainLayout",
    components: {
        SideBar,
        TopBar
    },
    props: {
        hospitalName: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");
.Layout .content {
    margin-left: 16rem;
    margin-top: 3rem;
}
</style>
