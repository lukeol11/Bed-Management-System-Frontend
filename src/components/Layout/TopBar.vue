<template>
    <div class="TopBar">
        <a class="HospitalName">{{ hospitalName }}</a>
    </div>
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
.TopBar {
    width: auto;
    height: 5.375rem;
    background: #fff;
    position: absolute;
    left: 20.6rem;
    top: 0px;
    .HospitalName {
        display: flex;
        width: 52.375rem;
        height: 3.125rem;
        flex-direction: column;
        justify-content: center;
        flex-shrink: 0;
        color: #000;
        font-family: Roboto;
        font-size: 1.75rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: 0.07813rem;
    }
}
</style>
