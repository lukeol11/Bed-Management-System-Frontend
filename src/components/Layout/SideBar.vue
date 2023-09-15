<template>
    <div class="Sidebar">
        <div class="Header">
            <div class="BedManagementSystem">
                Bed<br />Management<br />System
            </div>
            <hospital-bed-icon />
        </div>
        <div class="NavigationSection">
            <a class="Home">Home</a>
            <a class="ManageRequests">Manage Requests</a>
        </div>
        <div class="Footer">
            <div class="LogOut">Log Out</div>
            <logout-icon />
        </div>
    </div>
</template>

<script>
import HospitalBedIcon from "@carbon/icons-vue/es/hospital-bed/32";
import LogoutIcon from "@carbon/icons-vue/es/logout/32";

export default {
    name: "SideBar",
    components: {
        HospitalBedIcon,
        LogoutIcon
    }
};
</script>

<style lang="scss">
.Sidebar {
    width: 20.6rem;
    height: 100vh;
    background: #2e3648;
    position: absolute;
    .Header {
        color: #fff;
        text-align: center;
        .BedManagementSystem {
            display: inline-block;
            text-align: center;
            font-family: Roboto;
            font-size: 1.875rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            letter-spacing: 0.07rem;
        }
        svg {
            display: inline-block;
        }
        padding-top: 1em;
        padding-bottom: 1em;
    }
    .NavigationSection {
        width: 20.6rem;
        height: 40rem;
        background: #323e58;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        gap: 3rem;
        .Home,
        .ManageRequests {
            color: #fff;
            text-align: center;
            font-family: Roboto;
            font-size: 1.5rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            letter-spacing: 0.07813rem;
        }
    }
    .Footer {
        color: #fff;
        text-align: center;
        font-family: Roboto;
        font-size: 2rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: 0.07813rem;
    }
}
</style>
