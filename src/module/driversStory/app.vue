<template>
  <div class="vss-app">

    <div class="vss-app-body">
      <div class="vss-app-top">
        <div class="vss-app-top-time"></div>
      </div>
      <div class="vss-app-content1"></div>
      <div class="vss-app-link vss-app-line--left"></div>
      <div class="vss-app-link vss-app-line--right"></div>
      <div class="vss-app-coin"></div>
      <div class="vss-app-content2"></div>
      <div class="vss-app-link vss-app-line--left"></div>
      <div class="vss-app-link vss-app-line--right"></div>
      <div class="vss-app-content3"></div>
    </div>

    <div class="vss-app-bottom">
      本活动解释权归司机圈儿所有，如有疑问<br>
      请联系官方微信客服
    </div>

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
/* eslint-disable no-undef */
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import {
  // SET_LOGIN,
  SET_LOADING,
  // SET_TOKEN,
} from './store/mutations-type'

import {
  GETWXCONFIG,
  // GETSHAREFEED,
} from './interface'

export default {
  name: 'VssApp',

  components: {
    Loading,
  },

  data () {
    return {
      msgError: false,
      detail: {},
      debug: false,
      title: '',
      desc: '',
      imgUrl: '',
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.loading,
    }),
  },

  async created () {
  },

  async mounted () {
    // await this.search()
    await this.searchConfig()
  },

  methods: {
    ...mapMutations([
      SET_LOADING,
    ]),
    async searchConfig () {
      this[SET_LOADING](true)
      const {data} = await this.$axios.get(GETWXCONFIG, {params: {
        url: location.href.split('#')[0],
      }})

      // eslint-disable-next-line max-len
      // const {data} = {'code': 0, 'data': {'signature': '060b9c7c9921020b37ce0a5ece79fa58bcaab7f2', 'noncestr': 'b8aa1665-0b57-4df8-a861-a9a7aec34101', 'timestamp': 1573049567}, 'msg': 'SUCCESS', 'success': true}

      this[SET_LOADING](false)

      wx.config({
        debug: this.debug,
        appId: 'wx00359698d58c35cc', // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.noncestr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'showMenuItems',
          'hideMenuItems',
          'hideAllNonBaseMenuItem',
        ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      await this.wxReady()
      // wx.hideAllNonBaseMenuItem()
      // wx.showMenuItems({
      //   menuList: [
      //     'menuItem:share:appMessage',
      //     'menuItem:share:timeline',
      //   ],
      // })
      this.setAppData()
      this.setTimelineData()
    },
    wxReady () {
      return new Promise((resolve, reject) => {
        wx.ready(() => {
          resolve()
        })

        wx.error((e) => {
          reject(e)
        })
      })
    },
    setAppData () {
      const shareData = {
        title: this.title,
        desc: this.desc,
        link: location.href.split('#')[0],
        imgUrl: this.imgUrl,
      }

      wx.updateAppMessageShareData(Object.assign(shareData, {
        success (e) {
        },
      }))
    },

    setTimelineData () {
      wx.updateTimelineShareData({
        title: this.title, // 分享标题
        link: location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: this.imgUrl, // 分享图标
        success () {
          // 设置成功
        },
      })
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
