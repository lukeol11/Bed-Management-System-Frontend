<template>
    <div id="bedsList">
        <cv-data-table
            :title="`Ward ${wardId}`"
            :columns="columns"
            :zebra="true"
        >
            <template slot="data">
                <cv-data-table-row
                    v-for="(result, index) in filteredResults"
                    :key="index"
                >
                    <cv-data-table-cell>{{ result.id }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.description
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-button kind="danger" @click="deleteBed(result.id)"
                            >Delete</cv-button
                        >
                    </cv-data-table-cell>
                </cv-data-table-row>
                <cv-data-table-row>
                    <cv-data-table-cell>
                        <Cv-tag label="Auto" kind="cyan" />
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-text-input
                            v-model="newBed.description"
                        ></cv-text-input>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-button @click="createBed">Create</cv-button>
                    </cv-data-table-cell>
                </cv-data-table-row>
            </template>
        </cv-data-table>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "BedsList",
    data() {
        return {
            beds: [],
            columns: ["ID", "Description", "Action"],
            newBed: {
                description: ""
            }
        };
    },
    methods: {
        async getBeds() {
            try {
                const response = await fetch(`/api/beds/all/${this.wardId}`);
                const beds = await response.json();
                this.beds = beds;
            } catch (err) {
                console.error(err);
            }
        },
        async deleteBed(bedId) {
            try {
                await fetch(`/api/beds/delete/${bedId}`, {
                    method: "DELETE"
                });
                this.getBeds();
            } catch (err) {
                console.error(err);
            }
        },
        async createBed() {
            const date = new Date().toISOString();
            const bedData = {
                ...this.newBed,
                ward_id: this.wardId,
                disabled: false,
                created_at: date,
                updated_at: date
            };
            console.info("Creating bed:", bedData);
            try {
                const response = await fetch("/api/beds/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bedData)
                });

                if (!response.ok) {
                    throw new Error("Failed to create ward");
                }
                this.newbed = {
                    description: ""
                };
                this.getBeds();
            } catch (err) {
                console.error(err);
            }
        }
    },
    computed: {
        selectedHospital() {
            return this.$store.getters.getSelectedHospital;
        },
        filteredResults() {
            return this.beds;
        },
        wardId() {
            return this.$route.params.wardId;
        }
    },
    watch: {
        wardId() {
            this.getBeds();
        }
    }
};
</script>
