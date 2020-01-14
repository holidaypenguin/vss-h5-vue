<template>
  <div class="vss-app">
    <div class="vss-app-loading-bg" v-if="!end"></div>

    <Nav v-if="!isWx" :title="title" type=""
      @share="shareHandler"
      @back="backHandler"></Nav>

    <img ref='logo' width="0"
      src="../../componments/driversStory/images/logo-b.png" alt="">

    <div class="vss-app-body">
      <div class="vss-app-top">
        <img src="../../componments/driversStory/images/top.png" alt=""
          class="vss-app-top-img"
          @load="topLoadHandler"
          @error="topErrorHandler">
        <div class="vss-app-top-time">活动时间：2020年1月15-1月31日</div>
        <div class="vss-app-top-red">
          <img src="../../componments/driversStory/images/red.png" alt=""
            class="vss-app-top-red-img">
        </div>
      </div>
      <div class="vss-app-content1">
        2019转瞬即逝，2020即将到来，忙碌了一年的网约车师傅们在工作中遇到了各种各样的乘客，
        有些人让你心情愉悦，有些人让你无比气愤，你都遇到过哪些与乘客相关的故事呢？
        现在你可以来讲述你与乘客之间不得不说的故事，更有机会获得千元现金大奖哦~
      </div>
      <div class="vss-app-link"></div>
      <div class="vss-app-coin">
        <img src="../../componments/driversStory/images/coin.png" alt=""
            class="vss-app-coin-img">
      </div>
      <div class="vss-app-content2">
        <div class="vss-app-content2-header">
          活动奖励
        </div>
        <div class="vss-app-content2-first">
          <img src="../../componments/driversStory/images/first.png" alt=""
            class="vss-app-content2-img"
            @load="firstLoadHandler"
            @error="firstErrorHandler">
        </div>
        <div class="vss-app-content2-line">
          <div class="vss-app-content2-next">
            <img src="../../componments/driversStory/images/second.png" alt=""
              class="vss-app-content2-img">
          </div>
          <div class="vss-app-content2-next">
            <img src="../../componments/driversStory/images/third.png" alt=""
              class="vss-app-content2-img">
          </div>
        </div>
        <div class="vss-app-content2-bg">
          <img src="../../componments/driversStory/images/hua.png" alt=""
            class="vss-app-content2-img">
        </div>
      </div>
      <template v-if="dataList && dataList.length > 0">
        <div class="vss-app-link"></div>
        <div class="vss-app-content2 vss-app-content3">
          <div class="vss-app-content2-header vss-app-content3-header">
            点赞排行
          </div>
          <div class="vss-app-content3-line"
            v-for="(item, index) in dataList"
            :key="index">
            <div :class="[
              'vss-app-content3-num',
              `vss-app-content3-num--${index}`,
              ]">{{index+1}}</div>
            <div class="vss-app-content3-a">
              <div class="vss-app-content3-b">{{item.name}}</div>
              <div class="vss-app-content3-c">{{item.favourCount}}个点赞</div>
            </div>
          </div>
        </div>
      </template>
      <div class="vss-app-link"></div>
      <div class="vss-app-content2 vss-app-content4">
        <div class="vss-app-content2-header vss-app-content4-header">
          活动说明
        </div>
        <div class="vss-app-content4-line">
          <span class="vss-app-content4-line-left">活动规则：</span>
          #网约车师傅和乘客的故事，讲述自己和乘客的故事，获点赞最多者依次排名。
        </div>
        <div class="vss-app-content4-line">
          <span class="vss-app-content4-line-left">领奖方式：</span>
          添加公众号司机圈儿 (driversite)，在公众号联系 官方工作人员领取。
        </div>
        <div class="vss-app-content4-line">
          <span class="vss-app-content4-line-left">活动时间：</span>
          1月15-1月31号。
        </div>
        <div class="vss-app-content4-line">
          <span class="vss-app-content4-line-left">公布获奖时间：</span>
          2月1号。
        </div>
        <div class="vss-app-content4-line">
          <span class="vss-app-content4-line-left">领奖时间：</span>
          2月2号-2月7日，过期不领奖作废。
        </div>
        <div class="vss-app-content4-line">
          <span class="vss-app-content4-line-left">公布方式：</span>
          司机圈儿 APP、司机圈儿 (driversite)公众号。
        </div>

        <div class="vss-app-content4-button-wrap" v-if="isWx">
          <div class="vss-app-content4-button" @click="downloadHandler">
          </div>
        </div>
      </div>

      <div class="vss-app-bottom">
        本活动解释权归司机圈儿所有，如有任何疑问<br>
        请联系官方微信客服司机圈儿 (driversite)
      </div>
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

import Nav from '../../componments/driversStory/nav/nav'
import Sdk from './sdk'

import Q from './sdk/q'

import {
  GETWXCONFIG,
  GETRANK,
} from './interface'

import Cookie from '../../public/utils/cookie'

const topDefer = Q.defer()
const firstDefer = Q.defer()

export default {
  name: 'VssApp',

  components: {
    Loading,
    Nav,
  },

  data () {
    return {
      msgError: false,
      detail: {},
      debug: false,
      title: '讲故事赢现金',
      desc:
        `2019转瞬即逝，2020即将到来，${
          '忙碌了一年的网约车师傅们在工作中遇到了各种各样的乘客，'
        }${'有些人让你心情愉悦，有些人让你无比气愤，你都遇到过哪些与乘客相关的故事呢？'
        }${'现在你可以来讲述你与乘客之间不得不说的故事，更有机会获得千元现金大奖哦~'}`,
      imgUrl: '',
      isLoading: false,
      end: false,
      dataList: [],
      isWx: window.navigator.userAgent.indexOf('MicroMessenger') > 0,
      OS: Cookie.getItem('OS'),
    }
  },

  computed: {
  },

  async created () {
    this.end = false
  },

  async mounted () {
    await this.search()

    this.loadEnd()
    this.imgUrl = this.$refs.logo.src

    this.isWx && await this.searchConfig()
    // await this.searchConfig()
  },

  methods: {
    topLoadHandler () {
      topDefer.resolve()
    },
    topErrorHandler () {
      topDefer.reject()
    },
    firstLoadHandler () {
      firstDefer.resolve()
    },
    firstErrorHandler () {
      firstDefer.reject()
    },
    async loadEnd () {
      this.isLoading = true
      await Promise.all([
        topDefer.promise,
        firstDefer.promise,
      ])
      this.isLoading = false
      this.end = true
    },
    async searchConfig () {
      this.isLoading = true
      const {data} = await this.$axios.get(GETWXCONFIG, {params: {
        url: location.href.split('#')[0],
      }})

      // eslint-disable-next-line max-len
      // const {data} = {'code': 0, 'data': {'signature': '060b9c7c9921020b37ce0a5ece79fa58bcaab7f2', 'noncestr': 'b8aa1665-0b57-4df8-a861-a9a7aec34101', 'timestamp': 1573049567}, 'msg': 'SUCCESS', 'success': true}

      this.isLoading = false

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

    async search () {
      this.isLoading = true
      const {data} = await this.$axios.get(GETRANK)

      this.dataList = data

      this.isLoading = false
      this.rankList = data
    },

    shareHandler () {
      Sdk.share(
        this.title,
        this.desc,
        this.imgUrl,
        location.href.split('#')[0],
      )
    },
    backHandler () {
      Sdk.nativeBack()
    },
    downloadHandler () {
      window.location.href = 'https://www.driversite.cn/index.html'
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
