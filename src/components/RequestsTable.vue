<template>
    <div id="requestsTable">
        <cv-data-table
            :title="`Transfer Requests`"
            :columns="columns"
            :zebra="true"
        >
            <template slot="data">
                <cv-data-table-row
                    v-for="(result, index) in results"
                    :key="index"
                >
                    <cv-data-table-cell>{{ result.id }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.patientName
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.hospital
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.currentWard
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.currentBed
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.requestedWard
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.requestedBed
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.requestBy
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.requestTime
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-button-set>
                            <cv-button kind="primary">Approve</cv-button>
                            <cv-button kind="danger">Delete</cv-button>
                        </cv-button-set>
                    </cv-data-table-cell>
                </cv-data-table-row>
            </template>
        </cv-data-table>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "RequestsTable",
    data() {
        return {
            columns: [
                "ID",
                "Patient Name",
                "Current Hospital",
                "Current Ward",
                "Current Bed",
                "Requested Ward",
                "Requested Bed",
                "Request by",
                "Request Made At",
                "Action"
            ],
            results: [
                {
                    id: 1,
                    patientName: "John Doe",
                    hospital: "University Hospital",
                    currentWard: "CDU",
                    currentBed: "Bed 1",
                    requestedWard: "CDU",
                    requestedBed: "Bed 2",
                    requestBy: "Doctor 1",
                    requestTime: "2021-01-01 12:00:00"
                },
                {
                    id: 2,
                    patientName: "Jane Doe",
                    hospital: "University Maternity Hospital",
                    currentWard: "Maternity",
                    currentBed: "Bed 2",
                    requestedWard: "POCU",
                    requestedBed: "Bed 3",
                    requestBy: "Doctor 2",
                    requestTime: "2021-01-01 12:00:00"
                }
            ]
        };
    },
    methods: {},
    computed: {
        selectedHospital() {
            return this.$store.getters.getSelectedHospital;
        }
    },
    mounted() {},
    watch: {}
};
</script>

<style scoped>
.bx--btn-set .bx--btn {
    width: 50%;
}
</style>
