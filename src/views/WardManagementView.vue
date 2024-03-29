<template>
    <div class="WardManagementView">
        <WardsList />
    </div>
</template>

<script>
import WardsList from "@/components/admin/WardsList.vue";
export default {
    name: "WardManagementView",
    components: {
        WardsList
    }
};
</script>
