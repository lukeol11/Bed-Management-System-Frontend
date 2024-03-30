<template>
    <div class="bedView">
        <div class="tilesContainer">
            <cv-tile>
                <h1>Bed Info</h1>
                <p>Bed ID: {{ bedInfo.id }}</p>
                <p>Description: {{ bedInfo.description }}</p>
                <p v-if="bedInfo.disabled_reason_id || patientInfo.first_name">
                    Available: <cv-tag label="False" kind="red"></cv-tag>
                </p>
                <p v-else>
                    Available: <cv-tag label="True" kind="green"></cv-tag>
                </p>
            </cv-tile>
            <cv-tile id="patient">
                <h1>Current Patient Info</h1>
                <div v-if="patientInfo.first_name">
                    <p>First Name: {{ patientInfo.first_name }}</p>
                    <p>Last Name: {{ patientInfo.last_name }}</p>
                    <p>DOB: {{ patientInfo.date_of_birth }}</p>
                    <p>Time Assigned: {{ patientInfo.timeBooked }}</p>
                    <cv-button kind="danger">Checkout</cv-button>
                </div>
                <div v-else>
                    <cv-button kind="secondary">Assign Patient</cv-button>
                    <cv-button id="green">Make as available</cv-button>
                </div>
            </cv-tile>
        </div>
        <cv-button @click="downloadQrCode">Download QR Code</cv-button>
        <qrcode id="bedQrCodeUrl" :value="currentRoute" />
    </div>
</template>

<script>
import Qrcode from "qrcode.vue";

export default {
    name: "BedView",
    components: {
        Qrcode
    },
    data() {
        return {
            bedInfo: {},
            patientInfo: {}
        };
    },
    computed: {
        bedId() {
            return this.$route.params.bedId;
        },
        currentRoute() {
            return "localhost:8080" + this.$route.path;
        }
    },
    methods: {
        downloadQrCode() {
            const canvas = document.querySelector("canvas");
            const image = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            const link = document.createElement("a");
            link.href = image;
            link.download = `bed-${this.bedId}-qr-code.png`;
            link.click();
        },
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
.bedView {
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
    #bedQrCodeUrl {
        visibility: hidden;
    }
    .cv-button-set {
        .cv-button.bx--btn--primary#green {
            background-color: green;
        }
        .cv-button.bx--btn--primary#yellow {
            background-color: rgb(122, 122, 0);
        }
    }
}
</style>