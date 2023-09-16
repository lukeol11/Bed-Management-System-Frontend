<template>
    <cv-header class="topBar" aria-label="Carbon header">
        <cv-skip-to-content href="#main-content">
            Skip to content
        </cv-skip-to-content>
        <cv-header-name href="javascript:void(0)">
            <cv-select
                :items="hospitalList"
                :selected="hospitalName"
                @change="changeHospital"
            >
                <cv-select-option selected>{{ hospitalName }}</cv-select-option>
                <cv-select-option
                    v-for="hospital in hospitalsList"
                    :key="hospital"
                >
                    {{ hospital }}
                </cv-select-option>
            </cv-select>
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
        },
        hospitalsList: {
            type: Array,
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
    .cv-select {
        width: 25rem;
        .bx--select-input {
            background: #fff;
            border-bottom: 0px;
            color: #000;
            font-family: Roboto, sans-serif;
            font-size: 1.25rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            letter-spacing: 0.07813rem;
        }
        option.bx--select-option {
            color: #000;
            font-family: Roboto, sans-serif;
            font-size: 1.25rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            letter-spacing: 0.07813rem;
        }
    }
}
</style>
