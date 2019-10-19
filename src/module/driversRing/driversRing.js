/* eslint-disable no-console */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app.vue'

import '../../public/styles/reset.css'
import '../../public/styles/screen.less'
import './styles/main.postcss'
import '../../componments/driversRing/style/app.postcss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App,
  },
})
