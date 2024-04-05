<template>
    <div class="userManagementView">
        <UsersList />
    </div>
</template>

<script>
import UsersList from "@/components/admin/UsersList.vue";
export default {
    name: "UserManagementView",
    components: {
        UsersList
    }
};
</script>
