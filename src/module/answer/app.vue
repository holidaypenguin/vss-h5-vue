<template>
  <div class="vss-app">
    <transition name="fade">
      <router-view v-if="type === 1"></router-view>
      <div class="vss-app-error" v-if="type === 2">答题链接有误，请重试~~~</div>
    </transition>

    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      color="#00BE06"
      loader="bars"
      :opacity="0.3"
      :z-index="99999"
    ></loading>

  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import {
  mapState,
  mapMutations,
} from 'vuex'

import {
  // SET_LOGIN,
  SET_LOADING,
  SET_USERINFO,
  // SET_TOKEN,
  SET_PID,
  SET_OID,
} from './store/mutations-type'

import {
  GETSIGN,
} from 'module/answer/interface'

import {getUrlParams} from 'utils/url'

// import {GETOPENID} from './interface'

export default {
  name: 'VssApp',

  mixins: [],

  components: {
    Loading,
  },

  data () {
    return {
      routerName: '',
      type: 0,
      // defaultWxAppid: '',
      // code: '',
      // codeKey: 'code',
      // redirectUrlFull: '',
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.loading,
      pid: state => state.pid,
      oid: state => state.oid,
    }),
  },

  async created () {
    // await this.getUserToken()

    // await this.getUserInfo()

    // await this.toOAuth()
  },

  async mounted () {
    this.routerChange()
    this.routerName = this.$router && this.$router.currentRoute.name

    this.loadParams()
  },

  methods: {
    ...mapMutations([
      SET_LOADING,
      SET_USERINFO,
      SET_PID,
      SET_OID,
    ]),
    routerChange () {
      if (!this.$router) return

      this.$router.afterEach((to, from) => {
        this.routerName = to.name
      })
    },

    loadParams () {
      this[SET_PID](getUrlParams('pid'))
      this[SET_OID](getUrlParams('oid'))

      this.type = this.pid && this.oid ? 1 : 2
    },

    async loadConfig () {
      if (this.getting) return

      this.getting = true

      this[SET_LOADING](true)
      const {data = []} = await this.$axios.post(
        GETSIGN,
        {},
        {
          params: {
            url: location.href,
          },
        },
      ).finally((e) => {
        this.getting = false
        this[SET_LOADING](false)
      })

      // eslint-disable-next-line no-undef
      wx.config({
        debug: false, // 开启调试模式,
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'],
      })

      const title = '健康科普周周练'
      const desc = '普及健康知识，提高居民健康素养'
      // eslint-disable-next-line
      const link = `http://diaocha.frontlink.net/wxexam/wx/web/wx02d7084d96b12d5b/oauth1?pid=${this.pid}`
      const imgUrl = require('./images/share-icon.jpg')
      console.log(imgUrl)

      // eslint-disable-next-line no-undef
      wx.error((res) => {
        // eslint-disable-next-line no-undef
        console.log('--wx.error--', res)
      })

      // eslint-disable-next-line no-undef
      wx.ready((e) => { // 需在用户可能点击分享按钮前就先调用
      // eslint-disable-next-line no-console
        console.log('--wx.ready--', e)
        // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
        // eslint-disable-next-line no-undef
        wx.updateAppMessageShareData({
          title, // 分享标题
          desc, // 分享描述
          link,
          imgUrl, // 分享图标
          success () {
          // 设置成功
          },
        })

        // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
        // eslint-disable-next-line no-undef
        wx.updateTimelineShareData({
          title, // 分享标题
          link,
          imgUrl, // 分享图标
          success () {
          // 设置成功
          },
        })
      })
    },

    // async toOAuth () {
    //   this.code = getUrlParams(this.codeKey)
    //   if (!this.code) {
    //     location.href = this.getWxOAuthUrl()

    //     return
    //   }

    //   this[SET_LOADING](true)
    //   const originMsg = await this.$axios.post(GETOPENID, {
    //     authCode: this.code,
    //     parkId: this.parkId,
    //     source: this.source,
    //   }).catch((e) => {
    //     this.oauthError(e)

    //     return Promise.reject(e)
    //   })

    //   await this.oauthSuccess(originMsg)
    // },
    // getWxOAuthUrl () {
    //   return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
    //     this.defaultWxAppid
    //   }&redirect_uri=${
    //     encodeURIComponent(this.redirectUrlFull)
    //   }&response_type=code&scope=snsapi_base&state=1#wechat_redirect`
    // },
    async oauthSuccess ({code, msg, result: {data}} = {result: {}}) {
      this[SET_USERINFO](data)
      // this[SET_LOGIN](true)
      this[SET_LOADING](false)
    },
    oauthError () {
      this[SET_LOADING](false)
    },
  },
}

// const getQueryString = (name, url) => {
//   const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
//   const u = url ? new URL(url) : window.location
//   const r = u.search.substr(1).match(reg)
//   if (r != null) return decodeURIComponent(r[2])

//   return null
// }
</script>
