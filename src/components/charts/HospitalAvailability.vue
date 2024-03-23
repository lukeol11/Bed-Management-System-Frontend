<template>
    <cv-tile id="wardAvailability">
        <Pie :options="chartOptions" :data="chartData" :id="chartId" />
    </cv-tile>
</template>

<script>
import { Pie } from "vue-chartjs";

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
    name: "PieChart",
    components: {
        Pie
    },
    data() {
        return {
            chartId: "Total Availability",
            chartData: {
                labels: ["Available", "Cleaning Required", "Unavailable"],
                datasets: [
                    {
                        backgroundColor: [
                            "rgba(0,255,0,0.75)",
                            "rgba(255,255,0,0.75)",
                            "rgba(255,0,0,0.75)"
                        ],
                        data: [5, 10, 50]
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        };
    }
};
</script>

<style scoped></style>
