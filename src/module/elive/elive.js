/* eslint-disable no-console */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import interponents from '../../public/services/interponents.js'
import filters from '../../public/filters'
import Toast from 'vue2-toast'
// import './icbc/icbc_client_core'
import './icbc/hybrid_app2'

import '../../public/styles/reset.css'
import '../../public/styles/screen.less'
import '../../componments/common/jiduoduo/styles/main.postcss'
import '../../componments/common/jiduoduo/styles/transition.css'
import './styles/main.css'
import 'vue2-toast/lib/toast.css'

Vue.use(interponents(router))
Vue.use(filters)
// http://blog.gdfengshuo.com/example/#/vue2-toast
Vue.use(Toast, {
  type: 'center',
  duration: 3000,
  wordWrap: true,
  width: 'auto',
})

Vue.config.productionTip = false

/* eslint-disable no-new */
const elive = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
  },
})

router.beforeEach((to, from, next) => {
  console.log('-----------------beforeEach------------------')
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('-----------------beforeResolve------------------')
  next()
})

router.afterEach((to, from) => {
  console.log('-----------------afterEach------------------')
  elive.$children[0].$children[0].$data.currentRouteName = to.name

  // setTitle((to.meta && to.meta.title) || '积多多福利社')
})
