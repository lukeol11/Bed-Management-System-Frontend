<template>
    <div>
        <requests-table />
    </div>
</template>

<script>
import RequestsTable from "@/components/RequestsTable.vue";
export default {
    name: "RequestsView",
    components: {
        RequestsTable
    }
};
</script>
