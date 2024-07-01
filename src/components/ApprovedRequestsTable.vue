<template>
    <div id="approvedRequestsTable">
        <cv-data-table
            :title="`Approved Requests`"
            :columns="columns"
            :zebra="true"
        >
            <template slot="data">
                <cv-data-table-row
                    v-for="(result, index) in requests"
                    :key="index"
                >
                    <cv-data-table-cell>{{ result.id }}</cv-data-table-cell>
                    <cv-data-table-cell
                        >{{ result.patientName
                        }}<gender-tag
                            :gender="result.patientGender"
                            :abbreviated="true"
                    /></cv-data-table-cell>
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
                        {{ result.approvedBy }}
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        {{ result.approvedTime }}
                    </cv-data-table-cell>
                </cv-data-table-row>
            </template>
        </cv-data-table>
    </div>
</template>

<script>
import GenderTag from "./tags/GenderTag.vue";

export default {
    name: "ApprovedRequestsTable",
    components: {
        GenderTag
    },
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
                "Approved By",
                "Approved At"
            ]
        };
    },
    props: {
        requests: {
            type: Array,
            required: true
        }
    }
};
</script>
