<template>
    <div id="addPatient">
        <cv-text-input label="First Name" v-model="firstName"></cv-text-input>
        <cv-text-input label="Last Name" v-model="lastName"></cv-text-input>
        <cv-date-picker
            dateLabel="Date of Birth"
            v-model="dateOfBirth"
        ></cv-date-picker>
        <!-- <cv-dropdown label="Treatment" v-model="selectedTreatment">
            <cv-dropdown-item
                v-for="treatment in treatmentLevels"
                :key="treatment.id"
                :value="String(treatment.id)"
            >
                {{ treatment.name }}
            </cv-dropdown-item>
        </cv-dropdown> -->
        <cv-dropdown label="Gender" v-model="selectedGender">
            <cv-dropdown-item
                v-for="gender in genders"
                :key="gender"
                :value="String(gender)"
            >
                {{ gender }}
            </cv-dropdown-item>
        </cv-dropdown>

        <cv-button @click="searchForm">Search</cv-button>
    </div>
</template>

<script>
export default {
    name: "AddPatient",
    data() {
        return {
            firstName: "",
            lastName: "",
            dateOfBirth: null,
            selectedTreatment: 5,
            selectedGender: null,
            treatmentLevels: [],
            genders: ["Male", "Female"]
        };
    },
    methods: {
        searchForm() {
            const patientDetails = {
                firstName: this.firstName,
                lastName: this.lastName,
                dateOfBirth: this.dateOfBirth,
                treatment: this.selectedTreatment,
                gender: this.selectedGender
            };
            console.log(patientDetails);
            this.$emit("patientDetails", patientDetails);
        },
        async getTreatmentLevels() {
            try {
                const response = await fetch(`/api/wards/treatment_levels`);
                const treatmentLevels = await response.json();
                this.treatmentLevels = treatmentLevels;
            } catch (err) {
                console.error(err);
            }
        }
    },
    created() {
        this.getTreatmentLevels();
    }
};
</script>

<style scoped>
#addPatient {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    border-right: 0.1em solid #000;
}
#addPatient div {
    margin: 1em;
}
</style>
