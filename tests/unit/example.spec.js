import { shallowMount } from "@vue/test-utils";
import TopBar from "@/components/Layout/TopBar.vue";

describe("TopBar.vue", () => {
    it("renders props.msg when passed", () => {
        const wrapper = shallowMount(TopBar, {
            propsData: {
                selectedHospital: "test",
                hospitalList: ["Test", "Test2"]
            }
        });
        expect(wrapper.text()).toContain("test");
    });
});
