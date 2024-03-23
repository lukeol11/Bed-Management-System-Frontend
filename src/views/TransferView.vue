<template>
    <div class="transferView">
        <div id="lef">
            <SearchTable
                :select-action="true"
                :patientsOnly="true"
                :transferAction="false"
                :viewBedAction="false"
            />
        </div>
        <div id="right">
            <cv-select
                :items="hospitalsList"
                :selected="selectedHospital"
                label=""
                @change="changeHospital"
            >
                <cv-select-option selected>{{
                    selectedHospital
                }}</cv-select-option>
                <cv-select-option
                    v-for="hospital in hospitalsList"
                    :key="hospital"
                >
                    {{ hospital }}
                </cv-select-option>
            </cv-select>
            <BedList action="Transfer" />
        </div>
    </div>
</template>

<script>
import SearchTable from "@/components/SearchTable.vue";
import BedList from "@/components/BedList.vue";
export default {
    name: "TransferView",
    data() {
        return {
            hospitalsList: [
                "Hospital 1",
                "Hospital 2",
                "Hospital 3",
                "Hospital 4"
            ],
            selectedHospital: "Hospital 1"
        };
    },
    components: {
        SearchTable,
        BedList
    }
};
</script>

<style scoped>
.transferView {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}
#left,
#right {
    width: 45%;
}
</style>
