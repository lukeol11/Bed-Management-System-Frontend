<template>
    <div>
        <main-layout selectedHospital="Example Hospital Name"> </main-layout>
    </div>
</template>

<script>
import MainLayout from "@/components/Layout/MainLayout.vue";

export default {
    name: "HomeView",
    components: {
        MainLayout
    }
};
</script>
