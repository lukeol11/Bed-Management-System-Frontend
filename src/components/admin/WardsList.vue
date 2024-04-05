<template>
    <div id="wardsList">
        <cv-data-table :columns="columns" :zebra="true">
            <template slot="data">
                <cv-data-table-row
                    v-for="(result, index) in filteredResults"
                    :key="index"
                >
                    <cv-data-table-cell>{{ result.id }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.description
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.min_patient_age
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.max_patient_age
                    }}</cv-data-table-cell>
                    <cv-data-table-cell v-if="treatmentLevels.length">{{
                        getTreatmentLevelName(result.treatment_level)
                    }}</cv-data-table-cell>
                    <cv-data-table-cell v-else>{{
                        result.treatment_level
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.location
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        {{ result.gender }}</cv-data-table-cell
                    >
                    <cv-data-table-cell>
                        <cv-button @click="open(result.id)">Open</cv-button>
                        <cv-button kind="danger" @click="delete result.id"
                            >Delete</cv-button
                        >
                    </cv-data-table-cell>
                </cv-data-table-row>
                <cv-data-table-row>
                    <cv-data-table-cell>
                        {{ highestId + 1 }}
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-text-input></cv-text-input>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-number-input></cv-number-input>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-number-input></cv-number-input>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-dropdown>
                            <cv-dropdown-item
                                v-for="treatmentLevel in treatmentLevels"
                                :key="treatmentLevel.name"
                                :value="String(treatmentLevel.id)"
                            >
                                {{ treatmentLevel.name }}
                            </cv-dropdown-item>
                        </cv-dropdown>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-text-input></cv-text-input>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-dropdown>
                            <cv-dropdown-item
                                v-for="gender in genders"
                                :key="gender"
                                :value="gender"
                            >
                                {{ gender }}
                            </cv-dropdown-item>
                        </cv-dropdown>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-button>Create</cv-button>
                    </cv-data-table-cell>
                </cv-data-table-row>
            </template>
        </cv-data-table>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "WardsList",
    data() {
        return {
            wards: [],
            columns: [
                "ID",
                "Description",
                "Min Patient Age",
                "Max Patient Age",
                "Treatment Level",
                "Location",

                "Gender",
                "Action"
            ],
            genders: ["All", "Male", "Female"],
            lastSelected: undefined,
            treatmentLevels: []
        };
    },
    methods: {
        async getWards() {
            try {
                const response = await fetch(
                    `/api/wards/all?hospital_id=${this.selectedHospital.id}`
                );
                const wards = await response.json();
                this.wards = wards;
            } catch (err) {
                console.error(err);
            }
        },
        async getTreatmentLevels() {
            try {
                const response = await fetch(`/api/wards/treatment_levels`);
                const treatmentLevels = await response.json();
                this.treatmentLevels = treatmentLevels;
            } catch (err) {
                console.error(err);
            }
        },
        getTreatmentLevelName(id) {
            return this.treatmentLevels.find(
                (treatmentLevel) => treatmentLevel.id === id
            ).name;
        },
        open(route) {
            if (this.lastSelected !== route) {
                this.lastSelected = route;
                this.$router.push(`/admin/wards/${route}`);
            }
        },
        async delete(bedId) {
            try {
                await fetch(`/api/beds/delete/${bedId}`, {
                    method: "DELETE"
                }).then((response) => {
                    if (response.ok) {
                        this.refreshData();
                    }
                });
            } catch (err) {
                console.error(err);
            }
        },
        refreshData() {
            this.getWards();
        }
    },
    computed: {
        highestId() {
            return this.wards.reduce((acc, ward) => {
                return ward.id > acc ? ward.id : acc;
            }, 0);
        },
        selectedHospital() {
            return this.$store.getters.getSelectedHospital;
        },
        filteredResults() {
            return this.wards;
        },
        wardId() {
            return this.$route.params.wardId;
        }
    },
    mounted() {
        this.getTreatmentLevels();
        this.getWards();
    }
};
</script>
