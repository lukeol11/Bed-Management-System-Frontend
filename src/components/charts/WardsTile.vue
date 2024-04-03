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
            <div id="UpdateDisclaimer">Updated Daily at 00:00</div>
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
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");
#wardSelectorTile {
    width: 100%;
    height: 100%;
}
.selectors {
    display: flex;
    flex-direction: row;
}
.selectors .bx--form-item {
    max-width: 40em;
    width: 40em;
}

#UpdateDisclaimer {
    font-style: italic;
    font-family: "Roboto", sans-serif;
    color: #666;
    font-size: 0.9em;
    text-align: right;
    width: 100%;
}
</style>
