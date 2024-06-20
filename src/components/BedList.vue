<template>
    <div id="bedList">
        <h2>Bed Selection</h2>
        <cv-data-table :columns="columns" :zebra="true">
            <template slot="data">
                <cv-data-table-row v-for="bed in beds" :key="bed.bedId">
                    <cv-data-table-cell>{{
                        findWard(bed.ward_id).description
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{ bed.id }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        bed.description
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-button @click="assignBed(bed.id)">{{
                            action
                        }}</cv-button>
                    </cv-data-table-cell>
                </cv-data-table-row>
            </template>
        </cv-data-table>
        <cv-toast-notification
            v-if="!treatmentLevel || !age || !gender || !hospitalId"
            id="fill-info-notification"
            title="Fill available fields for list of beds"
        ></cv-toast-notification>
        <cv-toast-notification
            v-else-if="!beds.length"
            id="fill-info-notification"
            kind="error"
            title="No beds available for the given criteria"
        ></cv-toast-notification>
    </div>
</template>

<script>
export default {
    name: "BedList",
    props: {
        treatmentLevel: {
            type: Number,
            required: false
        },
        age: {
            type: Number,
            required: false
        },
        gender: {
            type: String,
            required: false
        },
        hospitalId: {
            type: Number,
            required: false
        },
        triggerUpdate: {
            type: Number,
            required: false
        },
        action: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            columns: ["Ward", "Bed Id", "Description", "Action"],
            wards: [],
            beds: []
        };
    },
    watch: {
        treatmentLevel() {
            this.getAllMatchingBeds(this.age, this.treatmentLevel, this.gender);
        },
        triggerUpdate() {
            this.getAllMatchingBeds(this.age, this.treatmentLevel, this.gender);
        },
        hospitalId() {
            this.getAllMatchingBeds(this.age, this.treatmentLevel, this.gender);
        }
    },
    methods: {
        assignBed(bedId) {
            this.$emit("assignBed", bedId);
        },
        async getBeds(wardId) {
            try {
                let activeBeds = [];
                const response = await fetch(`/api/beds/all/${wardId}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const beds = await response.json();
                const bedsPromises = beds.map(async (bed) => {
                    if (await this.isBedActive(bed.id, wardId)) {
                        activeBeds.push(bed);
                    }
                });
                await Promise.all(bedsPromises);
                return activeBeds;
            } catch (err) {
                console.error(err);
            }
        },
        async getWards() {
            try {
                const response = await fetch(
                    `/api/wards/all?hospital_id=${this.hospitalId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        }
                    }
                );
                const wards = await response.json();
                this.wards = wards;
                return wards;
            } catch (err) {
                console.error(err);
            }
        },
        async isBedActive(bedId, wardId) {
            try {
                const response = await fetch(`/api/beds/status/${wardId}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const bedsDetails = await response.json();
                const bedDetails = bedsDetails.find((bed) => bed.id === bedId);
                return !(bedDetails.disabled || bedDetails.occupied);
            } catch (err) {
                console.error(err);
            }
        },
        async getAllMatchingBeds(age, treatmentLevel, gender) {
            const wards = await this.getWards();
            const filteredWards = wards.filter(
                (ward) =>
                    ward.min_patient_age <= age &&
                    ward.max_patient_age >= age &&
                    (gender === ward.gender || ward.gender == "All")
            );
            if (filteredWards.length === 0) {
                this.beds = [];
                this.wards = [];
                return;
            }
            const bedPromises = filteredWards.map((ward) =>
                this.getBeds(ward.id)
            );
            const beds = (await Promise.all(bedPromises)).flat();
            this.beds = beds;
        },
        findWard(wardId) {
            return this.wards.find((ward) => ward.id === wardId);
        }
    },
    mounted() {
        if (this.treatmentLevel && this.age && this.gender && this.hospitalId) {
            this.getAllMatchingBeds(this.age, this.treatmentLevel, this.gender);
        }
    }
};
</script>

<style lang="scss">
div#fill-info-notification.cv-notification.bx--toast-notification {
    height: min-content;
    button.bx--toast-notification__close-button {
        display: none;
        visibility: hidden;
    }
    .bx--toast-notification__details {
        height: min-content;
    }
}
</style>
