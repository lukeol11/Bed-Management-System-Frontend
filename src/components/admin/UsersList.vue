<template>
    <div id="usersList">
        <cv-modal :visible="askPassword">
            <template slot="title"> Password </template>
            <template slot="content">
                <cv-text-input
                    id="password"
                    label="Password"
                    type="password"
                    v-model="password"
                />
                <cv-button @click="firebaseSignup">Sign up</cv-button>
            </template>
        </cv-modal>
        <cv-data-table :columns="columns" :zebra="true">
            <template slot="data">
                <cv-data-table-row
                    v-for="(result, index) in filteredResults"
                    :key="index"
                >
                    <cv-data-table-cell>{{ result.id }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.first_name
                    }}</cv-data-table-cell>
                    <cv-data-table-cell>{{
                        result.last_name
                    }}</cv-data-table-cell>
                    <cv-data-table-cell
                        ><cv-tag
                            :label="String(result.can_approve_requests)"
                            :kind="
                                result.can_approve_requests ? 'green' : 'red'
                            "
                    /></cv-data-table-cell>
                    <cv-data-table-cell
                        ><cv-tag
                            :label="String(result.can_administrate)"
                            :kind="result.can_administrate ? 'green' : 'red'"
                    /></cv-data-table-cell>
                    <cv-data-table-cell> {{ result.email }}</cv-data-table-cell>
                    <cv-data-table-cell>
                        {{ result.phone_number }}</cv-data-table-cell
                    >
                    <cv-data-table-cell>
                        <cv-button kind="danger" @click="deleteUser(result.id)"
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
                            v-model="newUser.first_name"
                        ></cv-text-input>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-text-input
                            v-model="newUser.last_name"
                        ></cv-text-input>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-checkbox
                            value="false"
                            v-model="newUser.can_approve_requests"
                        ></cv-checkbox>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-checkbox
                            value="false"
                            v-model="newUser.can_administrate"
                        ></cv-checkbox>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-text-input v-model="newUser.email"></cv-text-input>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-text-input
                            v-model="newUser.phone_number"
                        ></cv-text-input>
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-button @click="askPassword = true"
                            >Create</cv-button
                        >
                    </cv-data-table-cell>
                </cv-data-table-row>
            </template>
        </cv-data-table>
        <router-view></router-view>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
    name: "UsersList",
    data() {
        return {
            users: [],
            password: "",
            columns: [
                "ID",
                "First Name",
                "Last Name",
                "Can Approve Requests",
                "Can Administrate",
                "Email",
                "Phone Number",
                "Action"
            ],
            newUser: {
                first_name: "",
                last_name: "",
                can_approve_requests: false,
                can_administrate: false,
                email: "",
                phone_number: ""
            },
            askPassword: false
        };
    },
    methods: {
        async getUsers() {
            try {
                const response = await fetch(
                    `/api/users/all?hospital_id=${this.selectedHospital.id}`
                );
                const users = await response.json();
                this.users = users;
            } catch (err) {
                console.error(err);
            }
        },
        async deleteUser(userId) {
            try {
                await fetch(`/api/users/delete/${userId}`, {
                    method: "DELETE"
                });
                this.refreshData();
            } catch (err) {
                console.error(err);
            }
        },
        refreshData() {
            this.getUsers();
        },
        async createUser() {
            const userData = {
                ...this.newUser,
                hospital_id: this.selectedHospital.id,
                created_at: new Date().toISOString(),
                created_by: this.userHospitalId
            };
            console.info("Creating user:", userData);
            try {
                const response = await fetch("/api/users/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });

                if (!response.ok) {
                    throw new Error("Failed to create user");
                }
                this.newUser = {
                    first_name: "",
                    last_name: "",
                    can_approve_requests: false,
                    can_administrate: false,
                    email: "",
                    phone_number: ""
                };
                this.refreshData();
            } catch (err) {
                console.error(err);
            }
        },
        firebaseSignup() {
            const auth = getAuth();
            createUserWithEmailAndPassword(
                auth,
                this.newUser.email,
                this.password
            )
                .then((userCredential) => {
                    console.info("Account created!", userCredential.user.email);
                    this.askPassword = false;
                    this.createUser();
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    },
    watch: {},
    computed: {
        selectedHospital() {
            return this.$store.getters.getSelectedHospital;
        },
        filteredResults() {
            return this.users;
        },
        userHospitalId() {
            return this.$store.getters.getUserDetails.hospital_id;
        }
    },
    mounted() {
        this.getUsers();
    }
};
</script>
