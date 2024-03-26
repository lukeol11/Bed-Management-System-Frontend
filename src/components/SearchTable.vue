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
                    <cv-data-table-cell
                        ><div v-if="result.patientName">
                            {{ result.patientName }}
                        </div>
                        <cv-tag v-else label="Available" kind="green" />
                    </cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.dateOfBirth
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.treatmentLevel
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-button>View Bed</cv-button>
                        <cv-button
                            kind="secondary"
                            :disabled="!result.patientName"
                            >Transfer</cv-button
                        >
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
            fullResults: this.data,
            columns: [
                "Ward",
                "Bed ID",
                "Patient Name",
                "Date of Birth",
                "Treatment Level",
                "Actions"
            ]
        };
    },
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    computed: {
        results() {
            return this.data.filter((result) => {
                if (this.patientsOnly) {
                    return result.patientName;
                }
                return true;
            });
        }
    }
};
</script>
