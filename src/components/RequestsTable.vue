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
                        <cv-button-set>
                            <cv-button
                                kind="primary"
                                @click="
                                    approveRequest(
                                        result.requestedBedId,
                                        result.patientId,
                                        result.id,
                                        userDetails.id,
                                        result.currentBedId
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
        <ApprovedRequestsTable :requests="approvedRequests" />
    </div>
</template>

<script>
import { formatInTimeZone } from "date-fns-tz";
import ApprovedRequestsTable from "./ApprovedRequestsTable.vue";
import GenderTag from "./Layout/GenderTag.vue";
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
            results: [],
            approvedRequests: []
        };
    },
    components: {
        ApprovedRequestsTable,
        GenderTag
    },
    methods: {
        formatTimestamp(timestamp) {
            return formatInTimeZone(
                timestamp,
                "Europe/London",
                "HH:mm:ss dd/MM/yyyy"
            );
        },
        async getRequests() {
            try {
                const response = await fetch(
                    `/api/transfers/all?hospital_id=${this.selectedHospital.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        }
                    }
                );
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async findHospital(id) {
            try {
                const response = await fetch(`/api/hospitals/find?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async findPatient(id) {
            try {
                const response = await fetch(`/api/patients/find?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async findWard(id) {
            try {
                const response = await fetch(`/api/wards/find?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async findUser(id) {
            try {
                const response = await fetch(`/api/users/find?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async findBed(id) {
            try {
                const response = await fetch(`/api/beds/find/${id}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const data = await response.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async getResults() {
            const requests = await this.getRequests();
            const results = [];
            const approvedRequests = [];
            requests.forEach(async (request) => {
                const patient = await this.findPatient(request.patientId);
                const user = await this.findUser(request.createdBy);
                const bedRequested = await this.findBed(request.bedRequested);
                const wardRequested = await this.findWard(bedRequested.ward_id);
                const currentBed = await this.findBed(request.currentBed);
                const currentWard = await this.findWard(currentBed.ward_id);
                const currentHospital = await this.findHospital(
                    currentWard.hospital_id
                );
                if (!request.bedApproved) {
                    results.push({
                        id: request.id,
                        patientName: `${patient.first_name} ${patient.last_name}`,
                        patientId: patient.id,
                        patientGender: patient.gender,
                        hospital: currentHospital.description,
                        currentWard: currentWard.description,
                        currentBed: currentBed.description,
                        currentBedId: currentBed.id,
                        requestedWard: wardRequested.description,
                        requestedBed: bedRequested.description,
                        requestedBedId: bedRequested.id,
                        requestBy: `${user.first_name} ${user.last_name}`,
                        requestTime: new Date(
                            request.createdAt
                        ).toLocaleString()
                    });
                } else {
                    const approvedBy = await this.findUser(request.approvedBy);

                    approvedRequests.push({
                        id: request.id,
                        patientName: `${patient.first_name} ${patient.last_name}`,
                        patientId: patient.id,
                        patientGender: patient.gender,
                        hospital: currentHospital.description,
                        currentWard: currentWard.description,
                        currentBed: currentBed.description,
                        currentBedId: currentBed.id,
                        requestedWard: wardRequested.description,
                        requestedBed: bedRequested.description,
                        requestedBedId: bedRequested.id,
                        requestBy: `${user.first_name} ${user.last_name}`,
                        requestTime: this.formatTimestamp(
                            new Date(request.createdAt)
                        ),
                        approvedBy: `${approvedBy.first_name} ${approvedBy.last_name}`,
                        approvedTime: this.formatTimestamp(
                            new Date(request.approvedAt)
                        )
                    });
                }
            });
            this.results = results;
            this.approvedRequests = approvedRequests;
        },
        async deleteRequest(id) {
            try {
                const response = await fetch(`/api/transfers/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                if (response.status === 200) {
                    this.getResults();
                }
            } catch (err) {
                console.error(err);
            }
        },
        async approveRequest(
            requestedBedId,
            patientId,
            requestId,
            createdBy,
            currentBedId
        ) {
            this.postApproveRequest(requestId, requestedBedId);
            this.checkoutPatient(patientId, currentBedId);
            this.assignBed(requestedBedId, patientId, createdBy);
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
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                if (response.status === 201) {
                    this.getResults();
                }
            } catch (err) {
                console.error(err);
            }
        },
        async checkoutPatient(patientId, bedId) {
            try {
                await fetch(
                    `/api/beds/checkout?patient_id=${patientId}&bed_id=${bedId}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        },
                        body: JSON.stringify({
                            checkout_time: new Date().toISOString()
                        })
                    }
                );
                await fetch(`/api/beds/disable/${bedId}`, {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
            } catch (error) {
                console.error(error);
            }
        },
        async assignBed(bedId, patientId, createdBy) {
            try {
                fetch("/api/beds/occupancy", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    },
                    body: JSON.stringify({
                        patient_id: patientId,
                        bed_id: bedId,
                        time_booked: new Date().toISOString(),
                        created_by: createdBy,
                        created_at: new Date().toISOString()
                    })
                });
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
        },
        transferRequests() {
            return this.$store.getters.getTransferRequests;
        }
    },
    mounted() {
        this.getResults();
    },
    watch: {
        transferRequests(newVal, oldVal) {
            if (newVal.length > oldVal.length && oldVal.length > 0) {
                this.getResults();
            }
        }
    }
};
</script>

<style scoped>
.bx--btn-set .bx--btn {
    width: 50%;
}
</style>
