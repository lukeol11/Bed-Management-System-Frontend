<template>
    <div class="create">
        <AddPatient @patientDetails="handlePatientDetails" />
        <BedList
            :age="patientAge"
            :treatmentLevel="Number(patientDetails.treatment)"
            :gender="patientDetails.gender"
            :hospitalId="selectedHospital.id"
            @assignBed="assignBed"
        />
    </div>
</template>

<script>
import AddPatient from "@/components/AddPatient.vue";
import BedList from "@/components/BedList.vue";

export default {
    name: "CreateView",
    data() {
        return {
            patientDetails: {},
            patientAge: 0
        };
    },
    components: {
        AddPatient,
        BedList
    },
    computed: {
        selectedHospital() {
            return this.$store.getters.getSelectedHospital;
        }
    },
    methods: {
        handlePatientDetails(patientDetails) {
            this.patientAge = this.findPatientAge(patientDetails.dateOfBirth);
            this.patientDetails = patientDetails;
        },
        findPatientAge(dateOfBirth) {
            const dob = new Date(dateOfBirth.split("/").reverse().join("-"));
            const diff_ms = Date.now() - dob.getTime();
            const age_dt = new Date(diff_ms);
            return Math.abs(age_dt.getUTCFullYear() - 1970);
        },
        assignBed(bedId) {
            console.log("Bed assigned", bedId, this.patientDetails);
            // post /api/beds/occupancy
            // {
            //   "patient_id": 0,
            //   "bed_id": 0,
            //   "time_booked": "2024-04-05T15:12:01.247Z",
            //   "created_by": 0,
            //   "created_at": "2024-04-05T15:12:01.247Z"
            // }
        }
    }
};
</script>

<style scoped>
.create {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}
.create #bedList {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    border-left: 0.1em solid #000;
}
</style>
