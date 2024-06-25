<template>
    <cv-tag :label="gender" :kind="getColor(gender)" class="GenderTag" />
</template>

<script>
export default {
    name: "GenderTag",
    props: {
        gender: {
            type: String,
            default: "None"
        }
    },
    methods: {
        getColor(gender) {
            if (gender === "Male") {
                return "cyan";
            } else if (gender === "Female") {
                return "magenta";
            } else if (gender === "All" || "Any") {
                return "green";
            } else {
                return "grey";
            }
        }
    }
};
</script>

<style lang="scss">
.GenderTag {
    &.bx--tag--magenta {
        background-color: #ff7bff;
        color: #320028;
    }
    &.bx--tag--green {
        background-color: #f7ff00;
        color: #5f5116;
    }
}
</style>
