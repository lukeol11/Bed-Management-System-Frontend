<template>
    <div id="bedList">
        <h2>Bed Selection</h2>
        <cv-data-table :columns="columns" :zebra="true">
            <template slot="data">
                <cv-data-table-row
                    v-for="bed in filteredBeds"
                    :key="bed.bedId"
                    :class="`gender-${bed.gender}`"
                    :expandable="true"
                >
                    <cv-data-table-cell>{{
                        bed.ward_description
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{ bed.id }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        bed.description
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        <gender-tag :gender="bed.gender" :contrast="true" />
                    </cv-data-table-cell>
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
import GenderTag from "./Layout/GenderTag.vue";

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
    components: {
        GenderTag
    },
    data() {
        return {
            columns: ["Ward", "Bed Id", "Bed Name", "Bed Gender", "Action"],
            wards: [],
            beds: []
        };
    },
    computed: {
        filteredBeds() {
            return this.beds
                .map((bed) => {
                    return {
                        ...bed,
                        gender:
                            bed.room?.gender ||
                            this.findWard(bed.ward_id).gender,
                        ward_description: this.findWard(bed.ward_id).description
                    };
                })
                .sort((a, b) => {
                    const preferredGender = this.gender;

                    // Define the sorting criteria
                    const getGenderPriority = (gender) => {
                        if (gender === preferredGender) return 1;
                        if (gender === "All") return 2;
                        return 3;
                    };

                    // Get the priority for each bed
                    const aPriority = getGenderPriority(a.gender);
                    const bPriority = getGenderPriority(b.gender);

                    // Sort by priority
                    if (aPriority < bPriority) return -1;
                    if (aPriority > bPriority) return 1;
                    return 0;
                });
        }
    },
    watch: {
        treatmentLevel() {
            this.getAllMatchingBeds(this.age, this.treatmentLevel);
        },
        triggerUpdate() {
            this.getAllMatchingBeds(this.age, this.treatmentLevel);
        },
        hospitalId() {
            this.beds = [];
            this.getAllMatchingBeds(this.age, this.treatmentLevel);
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
        async getAllMatchingBeds(age, treatmentLevel) {
            const wards = await this.getWards();
            const filteredWards = wards.filter(
                (ward) =>
                    ward.min_patient_age <= age && ward.max_patient_age >= age
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
            this.getAllMatchingBeds(this.age, this.treatmentLevel);
        }
    }
};
</script>

<style lang="scss" scoped>
@use "sass:color";
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
tr {
    &.gender-All {
        td {
            background-color: #f7ff00;
            color: #5f5116;
        }
    }
    &.gender-Male {
        td {
            background-color: #bae6ff;
            color: #003a6d;
        }
    }
    &.gender-Female {
        td {
            background-color: #ff7bff;
            color: #320028;
        }
    }
}
.bx--data-table--zebra tbody tr:not(.bx--parent-row):nth-child(2n) {
    &.gender-All {
        td {
            background-color: color.scale(#f7ff00, $lightness: -5%);
            color: color.scale(#5f5116, $lightness: 5%);
        }
    }
    &.gender-Male {
        td {
            background-color: color.scale(#bae6ff, $lightness: -5%);
            color: color.scale(#003a6d, $lightness: 5%);
        }
    }
    &.gender-Female {
        td {
            background-color: color.scale(#ff7bff, $lightness: -5%);
            color: color.scale(#320028, $lightness: 5%);
        }
    }
}
</style>
