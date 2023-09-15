<template>
    <cv-header class="topBar" aria-label="Carbon header">
        <cv-skip-to-content href="#main-content">
            Skip to content
        </cv-skip-to-content>
        <cv-header-name href="javascript:void(0)">
            <cv-select />
        </cv-header-name>
        <template v-slot:left-panels> </template>
        <template v-slot:right-panels> </template>
    </cv-header>
</template>

<script>
export default {
    name: "TopBar",
    props: {
        hospitalName: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss">
.bx--header.topBar {
    left: 16rem;
    background: #fff;
    border-bottom: 0px;
}
</style>
