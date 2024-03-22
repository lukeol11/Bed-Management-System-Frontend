<template>
    <div class="create">
        <AddPatient />
        <BedList />
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
</style>
