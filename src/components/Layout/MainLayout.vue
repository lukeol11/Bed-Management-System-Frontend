<template>
    <div class="Layout">
        <top-bar
            v-if="usersHospitalId"
            :selectedHospital="selectedHospital"
            :hospitalsList="hospitalsList"
        />
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
    computed: {
        hospitalsList() {
            return this.$store.getters.allHospitals.map(
                (hospital) => hospital.description
            );
        },
        usersHospitalId() {
            return this.$store.getters.getUserDetails.hospital_id;
        }
    },
    data() {
        return {
            selectedHospital: undefined
        };
    },
    methods: {
        findSelectedHospital() {
            this.selectedHospital = this.$store.getters.getHospitalById(
                this.usersHospitalId
            ).description;
        }
    },
    watch: {
        usersHospitalId() {
            this.findSelectedHospital();
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
</style>
