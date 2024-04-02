<template>
    <cv-tile id="wardSelectorTile">
        <div class="selectors">
            <cv-dropdown label="Ward">
                <cv-dropdown-item
                    v-for="ward in wards"
                    :key="ward.id"
                    :value="ward.description"
                    @change="emitSelectedWard(ward)"
                >
                    {{ ward.description }}
                </cv-dropdown-item>
            </cv-dropdown>
            <cv-toggle value="test" label="Chart" @change="emitChart()">
                <template slot="text-left">Discharges</template>
                <template slot="text-right">Availability</template>
            </cv-toggle>
        </div>
        <slot></slot>
    </cv-tile>
</template>

<script>
export default {
    name: "WardSelectorTile",
    data() {
        return {
            wards: [],
            chart: "discharges"
        };
    },
    methods: {
        async getWards() {
            this.wards = [];
            try {
                const response = await fetch(
                    `/api/wards/all?hospital_id=${this.$store.getters.getSelectedHospital.id}`
                );
                const wards = await response.json();
                wards.forEach((ward) => {
                    this.wards.push({
                        id: ward.id,
                        description: ward.description
                    });
                });
            } catch (err) {
                console.error(err);
            }
        },
        emitSelectedWard(ward) {
            this.$emit("ward", ward);
        },
        emitChart() {
            this.chart =
                this.chart === "discharges" ? "availability" : "discharges";
            this.$emit("chart", this.chart);
        }
    },
    watch: {
        selectedHospital() {
            this.getWards();
        }
    },
    computed: {
        selectedHospital() {
            return this.$store.getters.getSelectedHospital;
        }
    },
    mounted() {
        this.getWards();
    }
};
</script>

<style scoped>
#wardSelectorTile {
    width: 100%;
    height: 100%;
}
div.bx--form-item
    label.bx--toggle-input__label
    span.bx--toggle__switch
    .bx--toggle__switch::before {
    background-color: #f00;
}
.selectors {
    display: flex;
    flex-direction: row;
}
</style>
