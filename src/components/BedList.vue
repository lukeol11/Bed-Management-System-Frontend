<template>
    <div id="bedList">
        <h2>Bed Selection</h2>
        <cv-data-table :columns="columns" :zebra="true">
            <template slot="data">
                <cv-data-table-row v-for="bed in beds" :key="bed.bedId">
                    <cv-data-table-cell>{{ bed.ward }}</cv-data-table-cell>
                    <cv-data-table-cell>{{ bed.bedId }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        bed.description
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-button>{{ action }}</cv-button>
                    </cv-data-table-cell>
                </cv-data-table-row>
            </template>
        </cv-data-table>
    </div>
</template>

<script>
export default {
    name: "BedList",
    props: {
        action: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            columns: ["Ward", "Bed Id", "Desription", "Action"],
            beds: [
                {
                    ward: "A",
                    bedId: 1,
                    description: "example"
                },
                {
                    ward: "A",
                    bedId: 2,
                    description: "example"
                },
                {
                    ward: "B",
                    bedId: 3,
                    description: "example"
                },
                {
                    ward: "B",
                    bedId: 4,
                    description: "example"
                }
            ]
        };
    }
};
</script>

<style scoped></style>
