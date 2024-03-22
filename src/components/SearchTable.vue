<template>
    <div>
        <cv-search></cv-search>
        <cv-data-table :columns="columns" :zebra="true">
            <template slot="data">
                <cv-data-table-row
                    v-for="(result, index) in results"
                    :key="index"
                >
                    <cv-data-table-cell>{{ result.ward }}</cv-data-table-cell>
                    <cv-data-table-cell>{{ result.bedId }}</cv-data-table-cell>
                    <cv-data-table-cell v-if="result.patientName">{{
                        result.patientName
                    }}</cv-data-table-cell>
                    <cv-data-table-cell v-else>
                        <cv-tag label="Available" kind="green" />
                    </cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.dateOfBirth
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.treatmentLevel
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-button>View Bed</cv-button>
                    </cv-data-table-cell>
                </cv-data-table-row>
            </template>
        </cv-data-table>
    </div>
</template>

<script>
export default {
    name: "SearchTable",
    data() {
        return {
            columns: [
                "Ward",
                "Bed Id",
                "Patient Name",
                "Date of Birth",
                "Treatment Level",
                "Action"
            ],
            results: [
                {
                    ward: "A",
                    bedId: 1,
                    patientName: "John Doe",
                    dateOfBirth: "01/01/1970",
                    treatmentLevel: "High"
                },
                {
                    ward: "A",
                    bedId: 2,
                    patientName: "Jane Doe",
                    dateOfBirth: "01/01/1970",
                    treatmentLevel: "Low"
                },
                {
                    ward: "B",
                    bedId: 3,
                    patientName: "John Smith",
                    dateOfBirth: "01/01/1970",
                    treatmentLevel: "Medium"
                },
                {
                    ward: "B",
                    bedId: 4,
                    treatmentLevel: "High"
                }
            ]
        };
    }
};
</script>
