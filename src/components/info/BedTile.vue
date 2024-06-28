<template>
    <cv-tile id="bed">
        <hospital-bed-icon />
        <h1>Bed Info</h1>
        <p>Bed ID: {{ bedInfo.id }}</p>
        <p>Name: {{ bedInfo.description }}</p>
        <p>Room: {{ bedInfo.room?.description || "N/A" }}</p>
        <p>
            Bed Gender:
            <gender-tag :gender="bedInfo.room?.gender || ward.gender" />
        </p>
        <p v-if="bedInfo.disabled_reason?.id === 2">
            Status: <cv-tag label="Occupied" kind="red"></cv-tag>
        </p>
        <p v-else-if="bedInfo.disabled_reason?.id === 1">
            Status:
            <cv-tag label="Cleaning Required" kind="blue"></cv-tag>
        </p>
        <p v-else>Status: <cv-tag label="Available" kind="green"></cv-tag></p>
        <cv-button
            @click="enableBed"
            id="green"
            v-if="bedInfo.disabled_reason?.id === 1"
            >Mark as Cleaned</cv-button
        >

        <qrcode id="bedQrCodeUrl" :value="currentRoute" />
    </cv-tile>
</template>

<script>
import Qrcode from "qrcode.vue";
import HospitalBedIcon from "@carbon/icons-vue/es/hospital-bed/32";
import GenderTag from "@/components/Layout/GenderTag.vue";

export default {
    name: "BedTile",
    components: {
        Qrcode,
        HospitalBedIcon,
        GenderTag
    },
    props: {
        bedInfo: Object,
        patientInfo: Object,
        ward: Object,
        currentRoute: String
    },
    methods: {
        async enableBed() {
            await fetch(`/api/beds/enable/${this.bedInfo.id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                }
            });
            this.$router.go();
        }
    }
};
</script>

<style lang="scss" scoped>
#bed {
    &.cv-tile {
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
        svg {
            width: 2em;
            height: 2em;
        }
    }
}
</style>
