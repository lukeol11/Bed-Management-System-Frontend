<template>
    <div class="searchView">
        <SearchTable :data="results" :bedsOnly="false" />
    </div>
</template>

<script>
import SearchTable from "@/components/SearchTable.vue";
export default {
    name: "SearchView",
    components: {
        SearchTable
    },
    data() {
        return {
            results: []
        };
    },
    computed: {
        selectedHospital() {
            return this.$store.getters.getSelectedHospital;
        }
    },
    methods: {
        async getBeds(wardId) {
            try {
                const response = await fetch(`/api/beds/all/${wardId}`);
                const beds = await response.json();
                return beds;
            } catch (err) {
                console.error(err);
            }
        },
        async getWards() {
            try {
                const response = await fetch(
                    `/api/wards/all?hospital_id=${this.selectedHospital.id}`
                );
                const wards = await response.json();
                return wards;
            } catch (err) {
                console.error(err);
            }
        },
        async getPatients(bedId) {
            let activeBeds;
            try {
                const response = await fetch(`/api/beds/active/${bedId}`);
                activeBeds = await response.json();
            } catch (err) {
                console.error(err);
            }
            let patients = [];
            try {
                const patientPromises = activeBeds.map((bed) => {
                    return fetch(`/api/patients/find?id=${bed.patient_id}`);
                });
                const patientResponses = await Promise.all(patientPromises);
                patients = await Promise.all(
                    patientResponses.map((response) => response.json())
                );
            } catch (err) {
                console.error(err);
            }

            return patients;
        },
        async getTreatmentLevels() {
            try {
                const response = await fetch(`/api/wards/treatment_levels`);
                const treatmentLevels = await response.json();
                return treatmentLevels;
            } catch (err) {
                console.error(err);
            }
        },
        async findMatching() {
            const wards = await this.getWards();
            const bedsPromises = wards.map((ward) => this.getBeds(ward.id));
            const beds = (await Promise.all(bedsPromises)).flat();
            const patients = await Promise.all(
                beds.map((bed) => this.getPatients(bed.id))
            );
            const treatmentLevels = await this.getTreatmentLevels();
            const results = beds.map((bed, index) => {
                const patient = patients[index][0];
                const ward = wards.find((ward) => ward.id === bed.ward_id);
                const treatmentLevel = treatmentLevels.find(
                    (level) => level.id === ward.treatment_level_id
                );
                return {
                    ward: ward.description,
                    bedId: bed.id,
                    patientName: patient
                        ? `${patient.first_name} ${patient.last_name}`
                        : null,
                    dateOfBirth: patient ? patient.date_of_birth : null,
                    treatmentLevel: ward ? treatmentLevel.name : null
                };
            });
            this.results = results;
        }
    },
    watch: {
        selectedHospital() {
            this.findMatching();
        }
    },
    mounted() {
        this.findMatching();
    }
};
</script>
