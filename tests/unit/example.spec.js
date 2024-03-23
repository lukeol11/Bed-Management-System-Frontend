import { shallowMount, createLocalVue } from "@vue/test-utils";
import TopBar from "@/components/Layout/TopBar.vue";
import Vuex from "vuex";
import CarbonComponentsVue from "@carbon/vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(CarbonComponentsVue);

describe("TopBar.vue", () => {
    let store;

    beforeEach(() => {
        store = new Vuex.Store({
            state: {},
            getters: {
                allHospitals: jest.fn(() => {
                    return [
                        {
                            id: 1,
                            description: "Hospital 1"
                        }
                    ];
                }),
                getUserDetails: jest.fn(() => {
                    return {
                        hospital_id: 1
                    };
                })
            },
            mutations: {
                SET_SELECTED_HOSPITAL: jest.fn()
            }
        });
    });

    it("renders basic html topbar", () => {
        const wrapper = shallowMount(TopBar, {
            localVue,
            store
        });
        expect(wrapper.html()).toContain("cv-select");
    });
});
