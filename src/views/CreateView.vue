<template>
    <div class="create">
        <AddPatient />
        <BedList action="Assign" />
    </div>
</template>

<script>
import AddPatient from "@/components/AddPatient.vue";
import BedList from "@/components/BedList.vue";

export default {
    name: "CreateView",
    components: {
        AddPatient,
        BedList
    }
};
</script>

<style scoped>
.create {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}
.create #bedList {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    border-left: 0.1em solid #000;
}
</style>
