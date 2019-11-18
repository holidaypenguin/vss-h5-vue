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

import '../../public/styles/reset.css'
import '../../public/styles/screen.less'
import './styles/main.postcss'
import '../../componments/driversOil/style/app.postcss'
import 'vue2-toast/lib/toast.css'

import {
  // SET_LOGIN,
  SET_LOADING,
  // SET_TOKEN,
} from './store/mutations-type'

Vue.use(interponents())
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
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
  },

  /**
   * 监听子组件错误
   */
  errorCaptured (err, vm, info) {
    if (err && Object.prototype.toString.call(err.request) === '[object XMLHttpRequest]') {
      if (hasResponseErrorMsg(err)) {
        err.data.msg && this.$toast(err.data.msg)
      } else {
        this.$toast('请求失败')
      }
    }
    // eslint-disable-next-line no-console
    console.warn(err)
    if (err) {
      this.$store.commit(SET_LOADING, false)
    }

    return false
  },
})

const hasResponseErrorMsg = function (err) {
  return err.request.status === 200 &&
    err.data &&
    err.data.code &&
    parseInt(err.data.code, 10) !== 0 &&
    err.data.msg
}

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

  // setTitle((to.meta && to.meta.title) || '积多多福利社')
})
