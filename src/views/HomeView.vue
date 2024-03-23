<template>
    <div>
        <main-layout>
            <router-view />
        </main-layout>
    </div>
</template>

<script>
import MainLayout from "@/components/Layout/MainLayout.vue";

export default {
    name: "HomeView",
    components: {
        MainLayout
    },
    created() {
        this.$store.dispatch("fetchHospitals");
    }
};
</script>
