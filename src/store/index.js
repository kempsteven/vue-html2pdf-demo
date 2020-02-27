import Vue from 'vue';
import Vuex from 'vuex';
import { getField, updateField } from 'vuex-map-fields';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        controlValue: {
            showLayout: false,
            previewModal: true,
            paginateElementsByHeight: 1400,
            filename: 'Hee Hee',
            pdfQuality: 2,
            pdfFormat: 'a4',
            pdfOrientation: 'portrait',
            pdfContentWidth: '800px'
        }
    },

    mutations: {
        updateField
    },

    getters: {
        getField
    },
})