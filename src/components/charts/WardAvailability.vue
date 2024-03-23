<template>
    <cv-tile id="wardAvailability">
        <Bar id="stackedBarChart" :options="chartOptions" :data="chartData" />
    </cv-tile>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

export default {
    name: "WardAvailability",
    components: { Bar },
    data() {
        return {
            chartData: {
                labels: [
                    "Ward 1",
                    "Ward 2",
                    "Ward 3",
                    "Ward 4",
                    "Ward 5",
                    "Ward 6",
                    "Ward 7",
                    "Ward 8",
                    "Ward 9",
                    "Ward 10"
                ],
                datasets: [
                    {
                        label: "Available Beds",
                        data: [
                            1, 4, 20, 19, 10, 7, 5, 3, 6, 12, 11, 2, 9, 8, 16,
                            14, 18, 13, 15, 17
                        ],
                        backgroundColor: "rgba(0,255,0, 0.75)"
                    },
                    {
                        label: "Cleaning Required",
                        data: [
                            19, 12, 15, 4, 11, 13, 3, 10, 20, 8, 18, 5, 9, 14,
                            17, 2, 6, 1, 16, 7
                        ],
                        backgroundColor: "rgba(255,255,0,0.75)"
                    },
                    {
                        label: "Occupied Beds",
                        data: [
                            2, 5, 17, 12, 18, 14, 4, 10, 15, 1, 16, 13, 3, 19,
                            11, 20, 6, 8, 9, 7
                        ],
                        backgroundColor: "rgba(255,0,0,0.75)"
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true
                    }
                }
            }
        };
    }
};
</script>

<style scoped></style>
