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
                    <cv-data-table-cell v-if="!bedsOnly"
                        ><div v-if="result.patientName">
                            {{ result.patientName }}
                        </div>
                        <cv-tag v-else label="Available" kind="green" />
                    </cv-data-table-cell>
                    <cv-data-table-cell v-if="!bedsOnly">{{
                        result.dateOfBirth
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.treatmentLevel
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-button v-if="viewBedAction">View Bed</cv-button>
                        <cv-button
                            v-if="transferAction"
                            kind="secondary"
                            :disabled="!result.patientName"
                            >Transfer</cv-button
                        >
                        <cv-button v-if="selectAction">Select</cv-button>
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
            fullResults: [
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
                    dateOfBirth: "01/01/1970",
                    bedId: 4,
                    patientName: "Jane Doe",
                    treatmentLevel: "High"
                }
            ]
        };
    },
    computed: {
        results() {
            return this.fullResults.filter((result) => {
                if (this.patientsOnly) {
                    return result.patientName;
                }
                return true;
            });
        }
    },
    props: {
        viewBedAction: {
            type: Boolean,
            default: true
        },
        transferAction: {
            type: Boolean,
            default: true
        },
        selectAction: {
            type: Boolean,
            default: false
        },
        patientsOnly: {
            type: Boolean,
            default: false
        }
    }
};
</script>
