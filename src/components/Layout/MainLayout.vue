<template>
    <div class="Layout">
        <top-bar />
        <side-bar />

        <div class="content">
            <slot />
            <div class="notifications">
                <cv-toast-notification
                    style="z-index: 1000"
                    v-for="(notification, index) in notifications"
                    :key="index"
                    :title="notification.title"
                    :sub-title="notification.subTitle"
                    :caption="notification.caption"
                    :kind="notification.kind"
                    @close="closeNotification(index)"
                />
            </div>
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
    computed: {
        notifications() {
            return this.$store.getters.getNotifications;
        }
    },
    methods: {
        closeNotification(index) {
            this.$store.commit("REMOVE_NOTIFICATION", index);
        }
    },
    created() {
        this.$store.dispatch("fetchUserDetails");
    }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");
.Layout .content {
    margin-left: 16rem;
    margin-top: 3rem;
}

@media (max-width: 768px) {
    div.Layout div.content {
        margin-left: 0.2rem;
        margin-right: 0.2rem;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
    }
    nav.sideBar,
    header.topBar {
        display: none;
    }
}

.notifications {
    position: fixed;
    overflow-y: auto;
    right: 1em;
    bottom: 1em;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 3rem);
    overflow-x: hidden;

    width: auto;
}
</style>
