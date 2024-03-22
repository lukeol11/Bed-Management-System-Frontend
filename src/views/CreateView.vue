<template>
    <div class="create">
        <AddPatient />
    </div>
</template>

<script>
import AddPatient from "@/components/AddPatient.vue";
export default {
    name: "CreateView",
    components: {
        AddPatient
    }
};
</script>
