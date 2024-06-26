<template>
    <cv-tile id="wardAvailability">
        <Bar
            v-if="dataAvailable"
            id="stackedBarChart"
            :options="chartOptions"
            :data="chartData"
        />
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
            chartOptions: {
                animation: false,
                transitions: {
                    active: {
                        animation: {
                            duration: 0
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Ward Availability"
                    }
                }
            },
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: "Occupied Beds",
                        data: [],
                        backgroundColor: "rgba(255,0,0,0.75)"
                    },
                    {
                        label: "Cleaning Required",
                        data: [],
                        backgroundColor: "rgba(255,255,0,0.75)"
                    },
                    {
                        label: "Available Beds",
                        data: [],
                        backgroundColor: "rgba(0,255,0, 0.75)"
                    }
                ]
            }
        };
    },
    methods: {
        async getWards() {
            this.chartData.labels = [];
            this.chartData.datasets[0].data = [];
            this.chartData.datasets[1].data = [];
            this.chartData.datasets[2].data = [];
            try {
                const response = await fetch(
                    `/api/wards/all?hospital_id=${this.$store.getters.getSelectedHospital.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        }
                    }
                );
                const wards = await response.json();
                this.chartData.labels = wards.map((ward) => ward.description);
                const bedsDataPromises = wards.map((ward) =>
                    this.getBeds(ward.id)
                );
                const bedsDataResults = await Promise.all(bedsDataPromises);
                bedsDataResults.forEach(([available, cleaning, occupied]) => {
                    this.chartData.datasets[2].data.push(available);
                    this.chartData.datasets[1].data.push(cleaning);
                    this.chartData.datasets[0].data.push(occupied);
                });
            } catch (err) {
                console.error(err);
            }
        },

        async getBeds(wardId) {
            try {
                const response = await fetch(`/api/beds/status/${wardId}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const beds = await response.json();
                if (beds.length !== 0) {
                    const available = beds.filter(
                        (bed) => !bed.disabled && !bed.occupied
                    ).length;
                    const cleaning = beds.filter((bed) => bed.disabled).length;
                    const occupied = beds.filter((bed) => bed.occupied).length;
                    return [available, cleaning, occupied];
                } else {
                    return [0, 0, 0];
                }
            } catch (err) {
                console.error(err);
                return [0, 0, 0];
            }
        }
    },
    computed: {
        selectedHospital() {
            return this.$store.getters.getSelectedHospital;
        },
        dataAvailable() {
            return (
                this.chartData.datasets[0].data.length ===
                    this.chartData.labels.length &&
                this.chartData.datasets[1].data.length ===
                    this.chartData.labels.length &&
                this.chartData.datasets[2].data.length ===
                    this.chartData.labels.length
            );
        }
    },
    props: {
        update: {
            type: Number,
            required: false
        }
    },
    watch: {
        selectedHospital() {
            this.getWards();
        },
        update() {
            this.getWards();
        }
    },
    mounted() {
        this.getWards();
    }
};
</script>
