/* eslint-disable no-console */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './log'
import 'vant/lib/index.css'
import Vue from 'vue'
import App from './app.vue'
import store from './store'
import interponents from './interponents.js'
import Toast from 'vue2-toast'
// import Vant from 'vant'
import {Calendar, Field, Popup, ActionSheet} from 'vant'

import '../../public/styles/reset.css'
import '../../public/styles/screen.less'
import './styles/main.postcss'
import 'vue2-toast/lib/toast.css'

Vue.use(Calendar)
Vue.use(Field)
Vue.use(Popup)
Vue.use(ActionSheet)
Vue.use(interponents())
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

    return false
  },
})

const hasResponseErrorMsg = function (err) {
  return err.data &&
    err.data.code &&
    parseInt(err.data.code, 10) !== 0 &&
    err.data.msg
}
