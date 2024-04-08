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
                            <cv-button
                                kind="primary"
                                @click="
                                    postApproveRequest(
                                        result.id,
                                        result.requestedBedId
                                    )
                                "
                                >Approve</cv-button
                            >
                            <cv-button
                                kind="danger"
                                @click="deleteRequest(result.id)"
                                >Delete</cv-button
                            >
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
            results: []
        };
    },
    methods: {
        async getRequests() {
            try {
                const response = await fetch(
                    `/api/transfers/all?hospital_id=${this.selectedHospital.id}`
                );
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async findHospital(id) {
            try {
                const response = await fetch(`/api/hospitals/find?id=${id}`);
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async findPatient(id) {
            try {
                const response = await fetch(`/api/patients/find?id=${id}`);
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async findWard(id) {
            try {
                const response = await fetch(`/api/wards/find?id=${id}`);
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async findUser(id) {
            try {
                const response = await fetch(`/api/users/find?id=${id}`);
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async findBed(id) {
            try {
                const response = await fetch(`/api/beds/find/${id}`);
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async getResults() {
            const requests = await this.getRequests();
            const results = [];
            requests.forEach(async (request) => {
                if (!request.bedApproved) {
                    const patient = await this.findPatient(request.patientId);
                    const user = await this.findUser(request.createdBy);
                    const hospital = await this.findHospital(
                        request.hospitalId
                    );
                    const bedRequested = await this.findBed(
                        request.bedRequested
                    );
                    const wardRequested = await this.findWard(
                        bedRequested.ward_id
                    );
                    const currentBed = await this.findBed(request.currentBed);
                    const currentWard = await this.findWard(currentBed.ward_id);
                    results.push({
                        id: request.id,
                        patientName: `${patient.first_name} ${patient.last_name}`,
                        hospital: hospital.description,
                        currentWard: currentWard.description,
                        currentBed: currentBed.description,
                        requestedWard: wardRequested.description,
                        requestedBed: bedRequested.description,
                        requestedBedId: bedRequested.id,
                        requestBy: `${user.first_name} ${user.last_name}`,
                        requestTime: new Date(
                            request.createdAt
                        ).toLocaleString()
                    });
                }
            });
            console.log(results);
            this.results = results;
        },
        async deleteRequest(id) {
            try {
                const response = await fetch(`/api/transfers/delete/${id}`, {
                    method: "DELETE"
                });
                if (response.status === 200) {
                    this.getResults();
                }
            } catch (err) {
                console.error(err);
            }
        },
        async postApproveRequest(requestId, bedId) {
            try {
                const response = await fetch(`/api/transfers/approve`, {
                    method: "POST",
                    body: JSON.stringify({
                        id: requestId,
                        approvedAt: new Date().toISOString(),
                        approvedBy: this.userDetails.id,
                        bedApproved: bedId
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log(response.status);
                if (response.status === 201) {
                    this.getResults();
                }
            } catch (err) {
                console.error(err);
            }
        }
    },
    computed: {
        selectedHospital() {
            return this.$store.getters.getSelectedHospital;
        },
        userDetails() {
            return this.$store.getters.getUserDetails;
        }
    },
    mounted() {
        this.getResults();
    },
    watch: {}
};
</script>

<style scoped>
.bx--btn-set .bx--btn {
    width: 50%;
}
</style>
