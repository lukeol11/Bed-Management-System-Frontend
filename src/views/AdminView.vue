<template>
    <div class="adminView">
        <cv-tile kind="clickable"><hospital-bed-icon />Manage Beds</cv-tile>
        <cv-tile kind="clickable"><users-icon />Manage Users</cv-tile>
    </div>
</template>

<script>
import HospitalBedIcon from "@carbon/icons-vue/es/hospital-bed/32";
import UsersIcon from "@carbon/icons-vue/es/user/32";
export default {
    name: "AdminView",
    components: {
        HospitalBedIcon,
        UsersIcon
    }
};
</script>

<style scoped>
.adminView {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
}
.cv-tile {
    width: 50%;
    height: 60%;
    font-size: 2rem;
    font-weight: 500;
    font-family: Roboto, sans-serif;
    text-align: center;
    margin: 2rem;
}

.adminView .cv-tile svg {
    margin-left: 30%;
    margin-right: 30%;
    margin-top: 20%;
    margin-bottom: 10%;
    width: 40%;
    height: 40%;
}
</style>
