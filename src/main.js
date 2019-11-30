import Vue from 'vue'
import App from './App.vue'
import VueApexCharts from 'vue-apexcharts'
import Vuex from 'vuex'
import store from './store'

Vue.use(Vuex)

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
