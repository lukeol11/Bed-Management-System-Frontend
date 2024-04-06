<template>
    <div>
        <cv-search @input="handleSearch"></cv-search>
        <cv-data-table :columns="columns" :zebra="true">
            <template slot="data">
                <cv-data-table-row
                    v-for="(result, index) in filteredResults"
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
                        <cv-button @click="openBed(result.bedId)"
                            >View Bed</cv-button
                        >
                        <cv-button
                            kind="secondary"
                            :disabled="!result.patientName"
                            @click="openTransfer(result.bedId)"
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
            searchQuery: "",
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
        filteredResults() {
            if (!this.searchQuery) {
                return this.fullResults;
            }
            return this.fullResults.filter((result) => {
                return Object.values(result).some((value) => {
                    if (value === null || value === undefined) {
                        return false;
                    }
                    return value
                        .toString()
                        .toLowerCase()
                        .includes(this.searchQuery.toLowerCase());
                });
            });
        }
    },
    methods: {
        handleSearch(value) {
            this.searchQuery = value;
        },
        openBed(bedId) {
            this.$router.push(`/bed/${bedId}`);
        },
        openTransfer(bedId) {
            this.$router.push(`/transfer/${bedId}`);
        }
    }
};
</script>
