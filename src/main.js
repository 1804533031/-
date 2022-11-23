import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import ECharts from 'vue-echarts'
import 'echarts'
import 'default-passive-events'

createApp(App)
  .use(store)
  .use(Vant)
  .use(router)
  .component('ECharts', ECharts)
  .mount('#app')
