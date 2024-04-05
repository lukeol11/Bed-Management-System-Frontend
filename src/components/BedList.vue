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
                        <cv-button @click="assignBed(bed.id)">Assign</cv-button>
                    </cv-data-table-cell>
                </cv-data-table-row>
            </template>
        </cv-data-table>
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
        }
    },
    methods: {
        assignBed(bedId) {
            this.$emit("assignBed", bedId);
        },
        async getBeds(wardId) {
            try {
                let activeBeds = [];
                const response = await fetch(`/api/beds/all/${wardId}`);
                const beds = await response.json();
                const bedsPromises = beds.map(async (bed) => {
                    if (!(await this.isBedActive(bed.id))) {
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
                    `/api/wards/all?hospital_id=${this.hospitalId}`
                );
                const wards = await response.json();
                this.wards = wards;
                return wards;
            } catch (err) {
                console.error(err);
            }
        },
        async isBedActive(bedId) {
            try {
                const response = await fetch(`/api/beds/active/${bedId}`);
                const bedDetails = await response.json();
                return bedDetails[0]?.id ? true : false;
            } catch (err) {
                console.error(err);
            }
        },
        async getAllMatchingBeds(age, treatmentLevel, gender) {
            const wards = await this.getWards();
            const filteredWards = wards.filter(
                (ward) =>
                    ward.treatment_level === treatmentLevel &&
                    ward.min_patient_age <= age &&
                    ward.max_patient_age >= age &&
                    (gender === ward.gender || ward.gender == "All")
            );
            const bedPromises = filteredWards.map((ward) =>
                this.getBeds(ward.id)
            );
            const beds = (await Promise.all(bedPromises)).flat();
            this.beds = beds;
        },
        findWard(wardId) {
            return this.wards.find((ward) => ward.id === wardId);
        }
    }
};
</script>
