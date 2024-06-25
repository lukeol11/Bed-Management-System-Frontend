<template>
    <div class="bedView">
        <div class="tilesContainer">
            <cv-tile>
                <hospital-bed-icon />
                <h1>Bed Info</h1>
                <p>Bed ID: {{ bedInfo.id }}</p>
                <p>
                    Bed Gender:
                    <gender-tag :gender="bedInfo.room?.gender || ward.gender" />
                </p>
                <p>Name: {{ bedInfo.description }}</p>
                <p>Room: {{ bedInfo.room?.description || "N/A" }}</p>
                <p v-if="patientInfo.first_name">
                    Status: <cv-tag label="Occupied" kind="red"></cv-tag>
                </p>
                <p v-else-if="isDisabled">
                    Status:
                    <cv-tag label="Cleaning Required" kind="blue"></cv-tag>
                </p>
                <p v-else>
                    Status: <cv-tag label="Available" kind="green"></cv-tag>
                </p>
                <cv-button @click="enabledBed" id="green" v-if="isDisabled"
                    >Mark as Cleaned</cv-button
                >

                <qrcode id="bedQrCodeUrl" :value="currentRoute" />
            </cv-tile>
            <cv-tile id="patient">
                <user-icon />
                <h1 v-if="patientInfo.first_name">Current Patient Info</h1>
                <h1 v-else>No Patient Currently Assigned</h1>
                <div v-if="patientInfo.first_name">
                    <p>First Name: {{ patientInfo.first_name }}</p>
                    <p>Last Name: {{ patientInfo.last_name }}</p>
                    <p>Gender: <gender-tag :gender="patientInfo.gender" /></p>
                    <p>
                        DOB: {{ patientInfo.date_of_birth }} ({{
                            findPatientAge(patientInfo.date_of_birth)
                        }})
                    </p>
                    <p>Time Assigned: {{ patientInfo.timeBooked }}</p>
                    <cv-button-set>
                        <cv-button
                            kind="danger"
                            @click="checkoutPatient(patientInfo.id, bedInfo.id)"
                            >Checkout</cv-button
                        >
                        <cv-button kind="secondary" @click="openTransfer(bedId)"
                            >Transfer</cv-button
                        >
                    </cv-button-set>
                </div>
                <div v-else>
                    <div v-if="!isDisabled">
                        <cv-button-set>
                            <cv-button
                                kind="primary"
                                @click="routerRedirect('create')"
                                >Assign New Patient</cv-button
                            >
                            <cv-button
                                kind="secondary"
                                @click="routerRedirect('search')"
                                >Transfer current patient</cv-button
                            >
                        </cv-button-set>
                    </div>
                </div>
            </cv-tile>
        </div>
        <cv-button id="qrDownloadButton" @click="downloadQrCode"
            >Download QR Code</cv-button
        >
    </div>
</template>

<script>
import Qrcode from "qrcode.vue";
import HospitalBedIcon from "@carbon/icons-vue/es/hospital-bed/32";
import UserIcon from "@carbon/icons-vue/es/user/32";
import GenderTag from "@/components/Layout/GenderTag.vue";

export default {
    name: "BedView",
    components: {
        Qrcode,
        HospitalBedIcon,
        UserIcon,
        GenderTag
    },
    data() {
        return {
            bedInfo: {},
            patientInfo: {},
            isDisabled: true,
            ward: {}
        };
    },
    computed: {
        bedId() {
            return this.$route.params.bedId;
        },
        currentRoute() {
            return window.location.origin + this.$route.path;
        }
    },
    methods: {
        findPatientAge(dateOfBirth) {
            const dob = new Date(dateOfBirth.split("/").reverse().join("-"));
            const diff_ms = Date.now() - dob.getTime();
            const age_dt = new Date(diff_ms);
            return Math.abs(age_dt.getUTCFullYear() - 1970);
        },
        async enabledBed() {
            await fetch(`/api/beds/enable/${this.bedId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                }
            });
            this.$router.go();
        },
        async disabledBed() {
            await fetch(`/api/beds/disable/${this.bedId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                }
            });
            this.$router.go();
        },
        openTransfer(bedId) {
            this.$router.push(`/transfer/${bedId}`);
        },
        routerRedirect(route) {
            this.$router.push(`/${route}/`);
        },
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
                const response = await fetch(`/api/beds/find/${this.bedId}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const bedInfo = await response.json();
                this.bedInfo = bedInfo;
                this.isDisabled = await this.getBedStatus(
                    bedInfo.ward_id,
                    bedInfo.id
                );
                this.findWard(bedInfo.ward_id);
            } catch (error) {
                console.error(error);
            }
        },
        async getBedStatus(wardId, bedId) {
            try {
                const response = await fetch(`/api/beds/status/${wardId}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const bedsDetails = await response.json();
                const bedDetails = bedsDetails.find((bed) => bed.id === bedId);
                return bedDetails.disabled;
            } catch (error) {
                console.error(error);
            }
        },
        async findPatient() {
            try {
                let response = await fetch(`/api/beds/active/${this.bedId}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const bedActiveResponse = await response.json();
                const patientId = bedActiveResponse[0]?.patient_id;
                if (patientId) {
                    response = await fetch(
                        `/api/patients/find?id=${patientId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                            }
                        }
                    );
                    this.patientInfo = await response.json();
                    this.patientInfo.timeBooked = new Date(
                        bedActiveResponse[0].time_booked
                    ).toUTCString();
                }
            } catch (error) {
                console.error(error);
            }
        },
        async findWard(wardId) {
            try {
                const response = await fetch(`/api/wards/find?id=${wardId}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const ward = await response.json();
                this.ward = ward;
                return ward;
            } catch (error) {
                console.error(error);
            }
        },
        async checkoutPatient(patientId, bedId) {
            try {
                await fetch(
                    `/api/beds/checkout?patient_id=${patientId}&bed_id=${bedId}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        },
                        body: JSON.stringify({
                            checkout_time: new Date().toISOString()
                        })
                    }
                );
                await this.disabledBed();
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
        svg {
            width: 2em;
            height: 2em;
        }
    }

    .cv-button-set {
        display: block;
        .cv-button.bx--btn--primary#green {
            background-color: green;
        }
        .cv-button.bx--btn--primary#yellow {
            background-color: rgb(122, 122, 0);
        }
    }
}

@media (max-width: 768px) {
    .bedView {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        .tilesContainer {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .cv-tile {
            width: 90%;
            margin: auto;
            height: fit-content;
        }
    }
    #qrDownloadButton,
    #bedQrCodeUrl {
        visibility: hidden;
    }
}
</style>
