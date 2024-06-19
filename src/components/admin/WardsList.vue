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
                        <cv-button kind="danger" @click="deleteWard(result.id)"
                            >Delete</cv-button
                        >
                    </cv-data-table-cell>
                </cv-data-table-row>
                <cv-data-table-row>
                    <cv-data-table-cell>
                        <Cv-tag label="Auto" kind="cyan" />
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-text-input
                            v-model="newWard.description"
                        ></cv-text-input>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-number-input
                            v-model.number="newWard.min_patient_age"
                        ></cv-number-input>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-number-input
                            v-model.number="newWard.max_patient_age"
                        ></cv-number-input>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-select
                            :hideLabel="true"
                            v-model="newWard.treatment_level"
                            label=""
                        >
                            <cv-select-option
                                v-for="treatmentLevel in treatmentLevels"
                                :key="treatmentLevel.name"
                                :value="String(treatmentLevel.id)"
                            >
                                {{ treatmentLevel.name }}
                            </cv-select-option>
                        </cv-select>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-text-input
                            v-model="newWard.location"
                        ></cv-text-input>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-select
                            :hideLabel="true"
                            v-model="newWard.gender"
                            label=""
                        >
                            <cv-select-option
                                v-for="gender in genders"
                                :key="gender"
                                :value="gender"
                            >
                                {{ gender }}
                            </cv-select-option>
                        </cv-select>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-button @click="createWard">Create</cv-button>
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
            treatmentLevels: [],
            newWard: {
                description: "",
                min_patient_age: 0,
                max_patient_age: 0,
                treatment_level: "0",
                location: "",
                gender: ""
            }
        };
    },
    methods: {
        async getWards() {
            try {
                const response = await fetch(
                    `/api/wards/all?hospital_id=${this.selectedHospital.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        }
                    }
                );
                const wards = await response.json();
                this.wards = wards;
            } catch (err) {
                console.error(err);
            }
        },
        async getTreatmentLevels() {
            try {
                const response = await fetch(`/api/wards/treatment_levels`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
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
        async deleteWard(wardId) {
            try {
                await fetch(`/api/wards/delete/${wardId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                this.refreshData();
            } catch (err) {
                console.error(err);
            }
        },
        refreshData() {
            this.getWards();
        },
        async createWard() {
            const wardData = {
                ...this.newWard,
                hospital_id: this.selectedHospital.id
            };
            console.info("Creating ward:", wardData);
            try {
                const response = await fetch("/api/wards/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        }
                    },
                    body: JSON.stringify(wardData)
                });

                if (response.ok) {
                    this.$store.commit("ADD_NOTIFICATION", {
                        kind: "success",
                        title: "Ward created successfully",
                        caption: `Ward "${wardData.description}" has been created successfully</br>Ward Details:</br>Min Patient Age: ${wardData.min_patient_age}</br>Max Patient Age: ${wardData.max_patient_age}</br>Treatment Level: ${wardData.treatment_level}</br>Location: ${wardData.location}</br>Gender: ${wardData.gender}`
                    });
                } else {
                    this.$store.commit("ADD_NOTIFICATION", {
                        kind: "error",
                        title: "Failed to create ward",
                        caption: `Failed to create ward "${wardData.description}"`
                    });
                    throw new Error("Failed to create ward");
                }
                this.newWard = {
                    description: "",
                    min_patient_age: 0,
                    max_patient_age: 0,
                    treatment_level: "0",
                    location: "",
                    gender: ""
                };
                this.refreshData();
            } catch (err) {
                console.error(err);
            }
        }
    },
    computed: {
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
