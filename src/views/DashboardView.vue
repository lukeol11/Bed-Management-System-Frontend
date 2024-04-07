<template>
    <div class="dashboard">
        <div class="charts">
            <WardAvailability />
            <HospitalAvailability />
            <BusyTimes />
        </div>
        <div class="navigation">
            <cv-tile @click="open('search')" kind="clickable" id="search"
                ><SearchIcon />Search
            </cv-tile>
            <cv-tile @click="open('create')" kind="clickable" id="create"
                ><RequestQuoteIcon />Create
            </cv-tile>
            <cv-tile @click="open('search')" kind="clickable" id="transfer"
                ><MovementIcon />Transfer</cv-tile
            >
        </div>
        <div class="wardCharts">
            <WardsTile><LineChart /></WardsTile>
        </div>
    </div>
</template>

<script>
import WardAvailability from "@/components/charts/WardAvailability.vue";
import HospitalAvailability from "@/components/charts/HospitalAvailability.vue";
import BusyTimes from "@/components/charts/BusyTimes.vue";
import WardsTile from "@/components/charts/WardsTile.vue";
import LineChart from "@/components/charts/LineChart.vue";
import MovementIcon from "@carbon/icons-vue/es/movement/32";
import RequestQuoteIcon from "@carbon/icons-vue/es/request-quote/32";
import SearchIcon from "@carbon/icons-vue/es/search/32";

export default {
    name: "Dashboard-View",
    components: {
        WardAvailability,
        HospitalAvailability,
        BusyTimes,
        WardsTile,
        LineChart,
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

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");
.charts .cv-tile#hospitalAvailability,
.charts .cv-tile#busyTimes {
    height: 90%;
    width: 19%;
}
.navigation {
    width: 30%;
    height: 50%;
    flex-direction: column;
}
.wardCharts {
    width: 66%;
    height: 40%;
    padding-left: 1em;
}
.charts .cv-tile#wardAvailability {
    height: 90%;
    width: 40%;
}
.wardCharts .cv-tile#wardSelectorTile {
    height: 90%;
    width: 78%;
}
.navigation .cv-tile {
    height: 20%;
    width: 100%;
    text-align: center;
    font-family: Roboto, sans-serif;
}
.navigation .cv-tile svg {
    margin-left: 30%;
    margin-right: 30%;
    margin-top: 1%;
    margin-bottom: 1%;
    width: 40%;
    height: 40%;
}
.cv-tile {
    margin: 1em;
}
.dashboard {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100vh;
    align-items: flex-start;
    width: 100%;
}
.charts,
.navigation,
.wardCharts {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.charts {
    width: 100%;
    height: 50%;
}

div.wardCharts div#wardSelectorTile div#chartContainer {
    height: 80%;
}

@media (max-width: 768px) {
    .charts,
    .wardCharts {
        display: none;
    }
    .navigation {
        width: 100%;
        height: 100%;
        #create,
        #transfer {
            display: none;
        }
    }
}
</style>
