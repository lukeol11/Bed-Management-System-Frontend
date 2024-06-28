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
        <p>
            Status:
            <bed-status-tag
                :disabledReason="bedInfo.disabled_reason || undefined"
            />
        </p>
        <cv-button
            @click="enableBed"
            id="green"
            v-if="bedInfo.disabled_reason?.id === 1"
            >Mark as Cleaned</cv-button
        >
        <disabled-reason-select
            v-if="bedInfo.id"
            :bedId="bedInfo.id"
            @change="reloadPage"
        />

        <qrcode id="bedQrCodeUrl" :value="currentRoute" />
    </cv-tile>
</template>

<script>
import Qrcode from "qrcode.vue";
import HospitalBedIcon from "@carbon/icons-vue/es/hospital-bed/32";
import GenderTag from "@/components/tags/GenderTag.vue";
import BedStatusTag from "@/components/tags/BedStatusTag.vue";
import DisabledReasonSelect from "@/components/form_items/DisabledReasonSelect.vue";

export default {
    name: "BedTile",
    components: {
        Qrcode,
        HospitalBedIcon,
        GenderTag,
        BedStatusTag,
        DisabledReasonSelect
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
            this.reloadPage();
        },
        reloadPage() {
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
