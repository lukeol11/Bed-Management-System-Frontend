<template>
    <div id="requestsTable">
        <CombinedTransferTables :userSpecific="false" />
    </div>
</template>

<script>
import CombinedTransferTables from "@/components/transfer_tables/CombinedTransferTables.vue";

export default {
    name: "RequestsView",
    components: {
        CombinedTransferTables
    }
};
</script>
