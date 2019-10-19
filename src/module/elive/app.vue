<template>
  <div class="ry-app">
    <ry-head></ry-head>
    <transition name="fade">
      <keep-alive :include="['Ry-Main']">
        <router-view v-if="isLogin"></router-view>
      </keep-alive>
    </transition>

    <!-- <div id="aaaa"
      style="position: absolute; top: 100px; left: 0; background: red; color: white;"></div> -->

    <div class="ry-app-errmsg" v-if="msgError">
      会员信息无效
    </div>
    <div class="ry-app-errmsg" v-if="loginError">
      会员登录失败
    </div>

    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      color="#F6504D"
      loader="bars"
      :opacity="0.3"
      :z-index="99999"
    ></loading>

  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import {mapState} from 'vuex'
import {
  SET_LOGIN,
  SET_LOADING,
  SET_TOKEN,
} from './store/mutations-type'
import {LOGIN, DETAIL_LOGIN} from './interface'

import RyHead from '../../componments/elive/ryHead/ryHead'

const logHtml = function logHtml (key, msg) {
  // const div = document.createElement('div')
  // div.innerHTML = `--${key}--${msg}`
  // document.querySelector('#aaaa').appendChild(div)
}

window.onerror = function onerror (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
  logHtml('onerror', `${errorMessage}--${scriptURI}--${lineNumber}--${columnNumber}--${errorObj}`)
}

export default {
  name: 'RyApp',

  components: {
    Loading,
    RyHead,
  },

  data () {
    return {
      msgError: false,
      loginError: false,
    }
  },

  computed: {
    ...mapState({
      isLogin: state => state.login,
      isLoading: state => state.loading,
    }),
  },

  mounted () {
    this.preLogin()
  },

  methods: {
    preLogin () {
      // 因为部分路由使用的是异步加载，延迟200ms
      setTimeout(() => {
        if (this.$route.query.loginParams) {
        // if (this.$route.query.loginParams12) {
          this.hasLoginParams()
        } else if (this.$route.query.params) {
          this.hasParams()
        } else {
          this.noLoginParams()
        }
      }, 200)
    },
    hasLoginParams () {
      logHtml('preLogin', '有登录参数')

      this.toLogin()
    },
    noLoginParams () {
      // logHtml('preLogin', '无登录参数使用中途登录')
      // // eslint-disable-next-line
      // hybrid_app.merLogin(function(res) {
      //   logHtml('中途登录成功', res)
      // })

      // window.callback = function (res) {
      //   logHtml('window.callback', res)
      // }
      // eslint-disable-next-line
          // hybrid_app.merLogin(window.callback)

      if (localStorage.getItem('tokenId')) {
        this.loginSuccess(localStorage.getItem('tokenId'))
      } else {
        this.msgError = true
      }
    },
    toLogin (res) {
      // logHtml('toLogin res', res)
      this.$store.commit(SET_LOADING, true)

      this.$axios.post(LOGIN, {
        loginParams: this.$route.query.loginParams,
      })
        .then((data) => {
          if (data.data && data.data.result && data.data.result.data) {
            this.loginSuccess(data.data.result.data)
          } else {
            this.loginFail()
          }
        })
        .catch(() => {
          this.loginFail()
        })
        .finally(() => {
          this.$store.commit(SET_LOADING, false)
        })
    },
    hasParams () {
      this.$store.commit(SET_LOADING, true)

      this.$axios.post(DETAIL_LOGIN, {
        loginParams: this.$route.query.params,
      })
        .then((data) => {
          if (data.data && data.data.result && data.data.result.data) {
            this.loginSuccess(data.data.result.data)
            this.toMyPage()
          } else {
            this.loginFail()
          }
        })
        .catch(() => {
          this.loginFail()
        })
        .finally(() => {
          this.$store.commit(SET_LOADING, false)
        })
    },
    loginSuccess (token) {
      this.$store.commit(SET_LOGIN, true)
      this.$store.commit(SET_TOKEN, token)
    },
    loginFail () {
      this.$store.commit(SET_LOGIN, false)
      this.loginError = true
    },
    toMyPage () {
      this.$router.replace({
        name: 'my',
        query: {
          params: this.$route.query.params,
        },
      })
    },
  },

  /**
   * 监听子组件错误
   */
  errorCaptured (err, vm, info) {
    if (err && Object.prototype.toString.call(err.request) === '[object XMLHttpRequest]') {
      if (err.request.status === 200) {
        if (err.data && err.data.meta) {
          if (parseInt(err.data.meta.errno, 10) !== 0) {
            err.data.meta.msg && this.$toast(err.data.meta.msg)
          }
        }
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
}
</script>

<style lang="postcss">
@n ry{
  @b app{
    @e errmsg{
      width: 590px;
      line-height: 67px;
      text-align: center;
      opacity: 0.12;
      background: #858B9C;
      border-radius: 63.5px;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      position: relative;
      font-family: PingFangSC-Regular;
      font-size: 48px;
      color: #111A34;
      letter-spacing: 0;
      padding: 30px;
      word-break: break-all;
      white-space: normal;
    }
  }
}
</style>
