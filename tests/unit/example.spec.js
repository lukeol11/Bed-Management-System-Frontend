import { shallowMount, createLocalVue } from "@vue/test-utils";
import TopBar from "@/components/Layout/TopBar.vue";
import Vuex from "vuex";
import CarbonComponentsVue from "@carbon/vue";
import { describe, it, expect, vi } from "vitest";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(CarbonComponentsVue);

describe("TopBar.vue", () => {
    let store;

    beforeEach(() => {
        store = new Vuex.Store({
            state: {},
            getters: {
                allHospitals: vi.fn(() => {
                    return [
                        {
                            id: 1,
                            description: "Hospital 1"
                        }
                    ];
                }),
                getUserDetails: vi.fn(() => {
                    return {
                        hospital_id: 1
                    };
                })
            },
            mutations: {
                SET_SELECTED_HOSPITAL: vi.fn()
            }
        });
    });

    it("renders basic html topbar", () => {
        const wrapper = shallowMount(TopBar, {
            localVue,
            store
        });
        expect(wrapper.html()).toContain("cv-inline-loading-stub");
    });
});
