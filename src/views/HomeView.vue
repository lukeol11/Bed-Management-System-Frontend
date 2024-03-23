<template>
    <div>
        <main-layout :selectedHospital="usersHospitalName">
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
    mounted() {
        this.$store.dispatch("fetchHospitals");
        this.$store.dispatch("fetchUserDetails");
    },
    computed: {
        usersHospitalName() {
            console.log(this.$store.getters.getUserEmail);
            const usersHospitalId =
                this.$store.getters.getUserDetails.hospital_id;
            console.log(usersHospitalId);
            return this.$store.getters.getHospitalById(usersHospitalId)
                .description;
        }
    }
};
</script>
