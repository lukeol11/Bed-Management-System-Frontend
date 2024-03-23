<template>
    <div class="dashboard">
        <div class="charts">
            <WardAvailability />
            <HospitalAvailability />
        </div>
        <div class="navigation">
            <cv-tile @click="open('search')" kind="clickable"
                ><SearchIcon />Search
            </cv-tile>
            <cv-tile @click="open('create')" kind="clickable"
                ><RequestQuoteIcon />Create
            </cv-tile>
            <cv-tile @click="open('transfer')" kind="clickable"
                ><MovementIcon />Transfer</cv-tile
            >
        </div>
    </div>
</template>

<script>
import WardAvailability from "@/components/charts/WardAvailability.vue";
import HospitalAvailability from "@/components/charts/HospitalAvailability.vue";
import MovementIcon from "@carbon/icons-vue/es/movement/32";
import RequestQuoteIcon from "@carbon/icons-vue/es/request-quote/32";
import SearchIcon from "@carbon/icons-vue/es/search/32";

export default {
    name: "Dashboard-View",
    components: {
        WardAvailability,
        HospitalAvailability,
        MovementIcon,
        RequestQuoteIcon,
        SearchIcon
    },
    methods: {
        open(route) {
            this.$router.push({ name: route });
        }
    }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");
.charts .cv-tile {
    height: 90%;
    width: 40%;
}
.navigation .cv-tile {
    height: 80%;
    width: 26%;
    text-align: center;
    font-family: Roboto, sans-serif;
}
.navigation .cv-tile svg {
    margin-left: 30%;
    margin-right: 30%;
    margin-top: 20%;
    margin-bottom: 10%;
    width: 40%;
    height: 40%;
}
.cv-tile {
    margin: 1em;
}
.dashboard {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100vh;
    align-items: flex-start;
    width: 100%;
}
.charts,
.navigation {
    width: 100%;
    height: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
</style>
