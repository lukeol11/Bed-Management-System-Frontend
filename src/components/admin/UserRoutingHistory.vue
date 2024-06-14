<template>
    <div>
        <cv-date-picker
            v-model="selectedDates"
            kind="range"
            placeholder="dd/mm/yyyy"
            :calOptions="dateFormat"
        />
        <cv-data-table
            :title="`${userDetails.first_name} ${userDetails.last_name}'s Browsing History`"
            :columns="columns"
            :zebra="true"
        >
            <template slot="data">
                <cv-data-table-row
                    v-for="(result, index) in userHistory"
                    :key="index"
                >
                    <cv-data-table-cell>
                        <a :href="result.from">{{ result.from }}</a>
                    </cv-data-table-cell>
                    <cv-data-table-cell
                        ><a :href="result.to">{{ result.to }}</a>
                    </cv-data-table-cell>
                    <cv-data-table-cell
                        >{{ formatTimestamp(result.timestamp) }}
                    </cv-data-table-cell>
                </cv-data-table-row>
            </template>
        </cv-data-table>
    </div>
</template>

<script>
const { formatInTimeZone } = require("date-fns-tz");

export default {
    name: "UserRoutingHistory",
    data() {
        return {
            userDetails: {},
            columns: ["From", "To", "Timestamp"],
            selectedDates: {},
            dateFormat: { dateFormat: "d/m/Y" },
            userHistory: []
        };
    },
    computed: {
        userId() {
            return this.$route.params.userId;
        }
    },
    watch: {
        selectedDates() {
            if (this.selectedDates.startDate && this.selectedDates.endDate) {
                this.getRoutingHistory(
                    this.userId,
                    this.selectedDates.startDate,
                    this.selectedDates.endDate
                );
            }
        },
        userId() {
            this.getUserDetails(this.userId);
            this.selectedDates = {};
            this.userHistory = [
                {
                    to: "Select a date range to view routing history",
                    from: "",
                    timestamp: ""
                }
            ];
        }
    },
    methods: {
        formatTimestamp(timestamp) {
            return formatInTimeZone(
                timestamp,
                "Europe/London",
                "HH:mm:ss dd/mm/yyyy"
            );
        },
        async getUserDetails(id) {
            const userDetails = await fetch(`/api/users/find?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                }
            });
            this.userDetails = await userDetails.json();
        },
        async getRoutingHistory(userId, from, to) {
            const toDate = this.stringToDate(to);
            toDate.setHours(23);
            toDate.setMinutes(59);
            toDate.setSeconds(59);

            const result = await fetch(
                `/api/routing-history/find?startDate=${this.stringToDate(
                    from
                )}&endDate=${toDate}&userId=${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                }
            );
            this.userHistory = await result.json();
        },
        stringToDate(dateString) {
            const [day, month, year] = dateString.split("/").map(Number);
            const date = new Date(year, month - 1, day);
            return date;
        },
        open(route) {
            this.$router.push(route);
        }
    },
    async mounted() {
        this.getUserDetails(this.userId);
    }
};
</script>
