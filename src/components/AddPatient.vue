<template>
    <div id="addPatient">
        <cv-text-input label="First Name" v-model="firstName"></cv-text-input>
        <cv-text-input label="Last Name" v-model="lastName"></cv-text-input>
        <cv-date-picker
            dateLabel="Date of Birth"
            v-model="dateOfBirth"
        ></cv-date-picker>
        <cv-dropdown label="Treatment" v-model="selectedTreatment">
            <cv-dropdown-item
                v-for="treatment in treatments"
                :key="treatment"
                :value="treatment"
            >
                {{ treatment }}
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
            selectedTreatment: null,
            treatments: [
                "Medication",
                "Surgery",
                "Physiotherapy",
                "Counselling",
                "Other"
            ]
        };
    },
    methods: {
        searchForm() {
            const patientDetails = {
                firstName: this.firstName,
                lastName: this.lastName,
                dateOfBirth: this.dateOfBirth,
                treatment: this.selectedTreatment
            };
            console.log(patientDetails);
            this.$emit("search", patientDetails);
        }
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
</style>
