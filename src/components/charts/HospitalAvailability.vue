<template>
    <cv-tile id="hospitalAvailability">
        <Pie
            v-if="dataAvailable"
            :options="chartOptions"
            :data="chartData"
            :id="chartId"
        />
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
                labels: ["Available", "Cleaning Required", "Occupied"],
                datasets: [
                    {
                        backgroundColor: [
                            "rgba(0,255,0,0.75)",
                            "rgba(255,255,0,0.75)",
                            "rgba(255,0,0,0.75)"
                        ],
                        data: []
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: "Hospital Availability"
                    }
                }
            }
        };
    },
    computed: {
        selectedHospital() {
            return this.$store.getters.getSelectedHospital;
        },
        dataAvailable() {
            return this.chartData.datasets[0].data.some((value) => value > 0);
        }
    },
    methods: {
        async fetchWardBeds() {
            try {
                const response = await fetch(
                    `/api/wards/all?hospital_id=${this.selectedHospital.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        }
                    }
                );
                const wards = await response.json();
                const bedsDataPromises = wards.map((ward) =>
                    this.fetchBedStatus(ward.id)
                );
                const bedsDataResults = await Promise.all(bedsDataPromises);
                this.processBedData(bedsDataResults);
            } catch (err) {
                console.error(err);
            }
        },
        async fetchBedStatus(wardId) {
            try {
                const response = await fetch(`/api/beds/status/${wardId}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const beds = await response.json();
                let counts = [0, 0, 0];
                beds.forEach((bed) => {
                    if (!bed.disabled && !bed.occupied) counts[0]++;
                    else if (bed.disabled) counts[1]++;
                    else if (bed.occupied) counts[2]++;
                });
                return counts;
            } catch (err) {
                console.error(err);
                return [0, 0, 0];
            }
        },
        processBedData(bedsData) {
            let totals = [0, 0, 0];
            bedsData.forEach((bed) => {
                totals[0] += bed[0];
                totals[1] += bed[1];
                totals[2] += bed[2];
            });
            this.chartData.datasets[0].data = totals;
        }
    },
    watch: {
        selectedHospital() {
            this.fetchWardBeds();
        }
    },
    mounted() {
        this.fetchWardBeds();
    }
};
</script>
