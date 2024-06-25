<template>
    <div id="bedsList">
        <cv-data-table
            :title="`${wardDetails.description} Beds`"
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
                    <cv-data-table-cell
                        >{{ result.room?.description || "N/A" }}
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-tag
                            :label="getGender(result.room?.gender)"
                            :kind="
                                getColor(
                                    result.room?.gender || wardDetails.gender
                                )
                            "
                        />
                    </cv-data-table-cell>
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
                        <cv-select
                            v-model="newBed.room_id"
                            :hideLabel="true"
                            label=""
                        >
                            <cv-select-option
                                v-for="room in rooms"
                                :key="room.description"
                                :value="String(room.id)"
                            >
                                {{ room.description }}
                            </cv-select-option>
                        </cv-select>
                    </cv-data-table-cell>
                    <cv-data-table-cell> </cv-data-table-cell>
                    <cv-data-table-cell>
                        <cv-button
                            @click="createBed"
                            :disabled="!newBed.description"
                            >Create Bed</cv-button
                        >
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
            columns: ["ID", "Name", "Room", "Gender", "Action"],
            newBed: {
                description: "",
                room_id: "0"
            },
            wardDetails: {},
            rooms: []
        };
    },
    methods: {
        async getBeds() {
            try {
                const response = await fetch(`/api/beds/all/${this.wardId}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                const beds = await response.json();
                this.beds = beds;
            } catch (err) {
                console.error(err);
            }
        },
        getColor(gender) {
            if (gender === "Male") {
                return "cyan";
            } else if (gender === "Female") {
                return "magenta";
            } else if (gender === "All") {
                return "green";
            } else {
                return "red";
            }
        },
        getGender(roomGender) {
            if (roomGender) {
                return roomGender;
            } else if (this.wardDetails) {
                return this.wardDetails.gender;
            } else {
                console.log(this.wardDetails);
                return "error";
            }
        },
        async deleteBed(bedId) {
            try {
                await fetch(`/api/beds/delete/${bedId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                this.getBeds();
            } catch (err) {
                console.error(err);
            }
        },
        async getRooms() {
            try {
                const response = await fetch(
                    `/api/rooms/all?ward_id=${this.wardId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                        }
                    }
                );
                let rooms = await response.json();
                rooms = rooms.map((room) => ({
                    id: String(room.id),
                    description: room.description,
                    gender: room.gender,
                    ward_id: room.ward_id
                }));
                if (response.ok) {
                    this.rooms = [
                        { id: 0, description: "N/A" },
                        { id: 999999, description: "Create New Room" },
                        ...rooms
                    ];
                } else {
                    throw new Error("Failed to get rooms");
                }
            } catch (err) {
                console.error(err);
            }
        },
        async createBed() {
            const date = new Date().toISOString();
            let roomId = Number(this.newBed.room_id);
            if (roomId === 0) {
                roomId = null;
            }
            const bedData = {
                description: this.newBed.description,
                room_id: roomId,
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
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    },
                    body: JSON.stringify(bedData)
                });

                if (response.ok) {
                    this.$store.commit("ADD_NOTIFICATION", {
                        kind: "success",
                        title: "Bed created successfully",
                        caption: `Bed "${bedData.description}" has been created successfully`
                    });
                } else {
                    this.$store.commit("ADD_NOTIFICATION", {
                        kind: "error",
                        title: "Failed to create bed",
                        caption: `Failed to create bed "${bedData.description}"`
                    });
                    throw new Error("Failed to create bed");
                }
                this.newbed = {
                    description: "",
                    room_id: "0"
                };
                this.getBeds();
            } catch (err) {
                console.error(err);
            }
        },
        async findWard(wardId) {
            try {
                this.wardDetails = {};
                const response = await fetch(`/api/wards/find?id=${wardId}`, {
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAuthToken}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to find ward");
                }
                this.wardDetails = await response.json();
                this.getBeds();
            } catch (err) {
                this.$store.commit("ADD_NOTIFICATION", {
                    kind: "error",
                    title: "Failed to find ward",
                    caption: `Failed to find ward id: "${wardId}"`
                });
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
            this.findWard(this.wardId);
            this.getRooms();
        }
    },
    mounted() {
        this.findWard(this.wardId);
        this.getRooms();
    }
};
</script>

<style lang="scss" scoped>
#bedsList {
    .bx--tag--magenta {
        background-color: #ff7bff;
        color: #320028;
    }
    .bx--tag--green {
        background-color: #f7ff00;
        color: #5f5116;
    }
}
</style>
