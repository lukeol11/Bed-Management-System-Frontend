<template>
    <div class="adminView">
        <div class="tilesContainer">
            <cv-tile kind="clickable" @click="open('wards')">
                Manage Wards/Beds</cv-tile
            >
            <cv-tile kind="clickable" @click="open('users')">
                Manage Users</cv-tile
            >
        </div>
        <router-view id="managementView"></router-view>
    </div>
</template>

<script>
export default {
    name: "AdminView",
    components: {},
    methods: {
        open(route) {
            if (this.$route.name !== route) {
                this.$router.push({ name: route });
            }
        }
    }
};
</script>

<style scoped>
.adminView {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tilesContainer {
    width: 100%;
    display: flex;
    justify-content: center;
}

.cv-tile {
    width: calc(50% - 4rem);
    height: 20%;
    font-size: 2rem;
    font-weight: 500;
    font-family: Roboto, sans-serif;
    text-align: center;
    margin: 2rem;
}

#managementView {
    width: 100%;
    margin-top: 1rem;
}
</style>
