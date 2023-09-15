<template>
    <div>
        <main-layout hospitalName="Example Hospital Name" />
    </div>
</template>

<script>
import MainLayout from "@/components/Layout/MainLayout.vue"; // @ is an alias to /src

export default {
    name: "HomeView",
    components: {
        MainLayout
    }
};
</script>
