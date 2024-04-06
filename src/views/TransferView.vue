<template>
    <div class="transferView">
        <div class="tilesContainer">
            <cv-tile>
                <h1>Current Info</h1>
                <p>Bed ID: {{ bedInfo.id }}</p>
                <p>Description: {{ bedInfo.description }}</p>
                <p>First Name: {{ patientInfo.first_name }}</p>
                <p>Last Name: {{ patientInfo.last_name }}</p>
                <p>DOB: {{ patientInfo.date_of_birth }}</p>
                <p>Time Assigned: {{ patientInfo.timeBooked }}</p>
            </cv-tile>
            <cv-tile id="bedList">
                <cv-dropdown
                    v-model="selectedHospital"
                    placeholder="Select a Hospital"
                >
                    <cv-dropdown-item
                        v-for="hospital in hospitals"
                        :key="hospital.id"
                        :value="String(hospital.id)"
                    >
                        {{ hospital.description }}
                    </cv-dropdown-item>
                </cv-dropdown>
            </cv-tile>
        </div>
    </div>
</template>

<script>
export default {
    name: "TransferView",
    components: {},
    data() {
        return {
            bedInfo: {},
            patientInfo: {},
            selectedHospital: undefined
        };
    },
    computed: {
        bedId() {
            return this.$route.params.bedId;
        },
        currentRoute() {
            return "localhost:8080" + this.$route.path;
        },
        hospitals() {
            return this.$store.getters.allHospitals;
        }
    },
    methods: {
        async getBedInfo() {
            try {
                const response = await fetch(`/api/beds/find/${this.bedId}`);
                this.bedInfo = await response.json();
            } catch (error) {
                console.error(error);
            }
        },
        async findPatient() {
            try {
                let response = await fetch(`/api/beds/active/${this.bedId}`);
                const bedActiveResponse = await response.json();
                const patientId = bedActiveResponse[0]?.patient_id;
                if (patientId) {
                    response = await fetch(
                        `/api/patients/find?id=${patientId}`
                    );
                    this.patientInfo = await response.json();
                    this.patientInfo.timeBooked = new Date(
                        bedActiveResponse[0].time_booked
                    ).toUTCString();
                }
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.findPatient();
        this.getBedInfo();
    }
};
</script>

<style scoped lang="scss">
.transferView {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .cv-tile {
        h1 {
            margin-bottom: 1em;
        }
        width: 40%;
        height: 90%;
        font-size: 2rem;
        font-weight: 500;
        font-family: Roboto, sans-serif;
        text-align: center;
        margin: 2rem;
    }
    .tilesContainer {
        width: 100%;
        height: 60vh;
        display: flex;
        justify-content: center;
    }
}
</style>
