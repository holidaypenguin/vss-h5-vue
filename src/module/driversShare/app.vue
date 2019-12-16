<template>
  <div class="vss-app wrap">
    <template v-if="detail && detail.feed">
      <div class="head">
        <div class="head-icon">
          <img :src="detail.feed.uidPhotoUrl" alt="">
        </div>
        <div class="head-center">
          <div class="head-center-name">{{detail.feed.uidName}}</div>
          <div class="head-center-msg">
            <span>{{detail.feed.createTimeDesc}}</span>
            <span>{{detail.feed.platformName}}</span>
          </div>
        </div>
      </div>
      <div class="msg">
        {{detail.feed.content}}
      </div>
    </template>

    <div class="imgList">
      <div class="imgItem-wrap"
        v-for="(item, index) in imagesExtand"
        :key="index + 9">
        <div class="imgItem">
          <img alt="" :src="item">
        </div>
      </div>
    </div>
    <div class="feed" v-if="detail && detail.commentFeedViewList">
      <div class="feed-head">全部评论</div>
      <div class="feed-item"
        v-for="(item, index) in detail.commentFeedViewList"
        :key="index">
        <div class="feed-item-left">
          <img :src="item.fromUidPhotoUrl" alt="">
        </div>
        <div class="feed-item-right">
          <div class="feed-item-name">{{item.fromUidName}}</div>
          <div class="feed-item-msg">
            <!-- <span>第1楼</span> -->
            <span>{{item.createTimeDesc}}</span>
          </div>
          <div class="feed-item-content">{{item.content}}</div>
          <!-- <div class="feed-item-comment">
            <div class="feed-item-comment-item">
              <span class="feed-item-comment-name">无敌破坏王：</span>
              <span class="feed-item-comment-content">你是人间四月天，笑容温暖了我的整个春天，愿你们的冬天永远不缺暖阳。</span>
            </div>
            <div class="feed-item-comment-item">
              <span class="feed-item-comment-name">醉死芳华：</span>
              <span class="feed-item-comment-content">回复 </span>
              <span class="feed-item-comment-name">秋鸿：</span>
              <span class="feed-item-comment-content">就特么你牛逼</span>
            </div>
          </div> -->
        </div>
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

    <a class="downloadapp" href="https://m.driversite.cn">下载</a>

    <div class="logggg" ref="logggg" v-if="debug">
      <div>日志2</div>
      <div v-for="(log, index) in logggg" :key="index">
        {{log}}
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-undef */
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import {
  mapState,
  mapMutations,
} from 'vuex'

import {
  // SET_LOGIN,
  SET_LOADING,
  // SET_TOKEN,
} from './store/mutations-type'

import {
  GETWXCONFIG,
  GETSHAREFEED,
} from './interface'

export default {
  name: 'VssApp',

  components: {
    Loading,
  },

  data () {
    return {
      msgError: false,
      // eslint-disable-next-line max-len
      url: 'https://mirror-gold-cdn.xitu.io/16df2f823216daedc4a?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
      feedUid: getQueryString('feedUid'),
      feedId: getQueryString('feedId'),
      shareSign: getQueryString('shareSign'),
      detail: {},
      signature: '',
      imagesExtand: [],
      logggg: [],
      debug: false,
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
    window.error = (e) => {
      this.logggg.push(e)
    }
    this.logggg.push('> mounted')
    await this.search()
    await this.searchConfig()
  },

  methods: {
    ...mapMutations([
      SET_LOADING,
    ]),
    async searchConfig () {
      this.logggg.push('> searchConfig start')
      this[SET_LOADING](true)
      const {data} = await this.$axios.get(GETWXCONFIG, {params: {
        url: location.href.split('#')[0],
      }})

      // eslint-disable-next-line max-len
      // const {data} = {'code': 0, 'data': {'signature': '060b9c7c9921020b37ce0a5ece79fa58bcaab7f2', 'noncestr': 'b8aa1665-0b57-4df8-a861-a9a7aec34101', 'timestamp': 1573049567}, 'msg': 'SUCCESS', 'success': true}

      this.logggg.push('> searchConfig data', data)
      this.signature = data.signature
      this[SET_LOADING](false)

      this.logggg.push(JSON.stringify({
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
      }))

      this.logggg.push('> wx.config')

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
      this.logggg.push('> 微信准备好了吗')
      await this.wxReady()
      this.logggg.push('> 微信准备好了')
      // wx.hideAllNonBaseMenuItem()
      // wx.showMenuItems({
      //   menuList: [
      //     'menuItem:share:appMessage',
      //     'menuItem:share:timeline',
      //   ],
      // })
      this.setAppData()
      // this.setAppData2()
      this.setTimelineData()
    },
    wxReady () {
      this.logggg.push('> wxReady start')

      return new Promise((resolve, reject) => {
        wx.ready(() => {
          this.logggg.push('> wxReady ready')
          resolve()
        })

        wx.error((e) => {
          this.logggg.push('> wxReady error')
          reject(e)
        })
      })
    },
    setAppData () {
      this.logggg.push('> 配置微信分享朋友1 start')
      const data = this.detail.feed

      const shareData = {
        title: data.title || data.content,
        desc: data.content,
        link: location.href.split('#')[0],
        imgUrl: this.imagesExtand[0],
      }

      this.logggg.push(`> 配置微信分享朋友1 data  ${JSON.stringify(shareData)}`)

      wx.updateAppMessageShareData(Object.assign(shareData, {
        success (e) {
          this.logggg.push('> 配置微信分享朋友1 end')
        },
      }))
    },

    setAppData2 () {
      this.logggg.push('> 配置微信分享朋友2 start')
      const data = this.detail.feed

      const shareData = {
        title: data.title || data.content,
        desc: data.content,
        link: location.href.split('#')[0],
        imgUrl: this.imagesExtand[0],
      }

      this.logggg.push(`> 配置微信分享朋友2 data  ${JSON.stringify(shareData)}`)

      wx.onMenuShareAppMessage(Object.assign(shareData, {
        success (e) {
          this.logggg.push('> 配置微信分享朋友2 end')
        },
      }))
    },
    setTimelineData () {
      this.logggg.push('> 配置微信分享朋友圈 start')
      const data = this.detail.feed
      wx.updateTimelineShareData({
        title: data.title || data.content, // 分享标题
        link: location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: this.imagesExtand[0], // 分享图标
        success () {
          // 设置成功
          this.logggg.push('> 配置微信分享朋友圈 end')
        },
      })
    },

    async search () {
      this.logggg.push('> search start')
      this[SET_LOADING](true)
      const {data} = await this.$axios.get(GETSHAREFEED, {params: {
        feedUid: this.feedUid,
        feedId: this.feedId,
        shareSign: this.shareSign,
      }})

      this.detail.feed = data.feed
      this.detail.commentFeedViewList = data.commentFeedViewList
      this.logggg.push('> search end')
      this[SET_LOADING](false)
      this.setImagesExtand()
    },
    setImagesExtand () {
      this.imagesExtand = this.detail &&
        this.detail.feed &&
        this.detail.feed.imagesExtand
        ? this.detail.feed.imagesExtand.split(';') : []
      this.logggg.push(`> setImagesExtand end imagesExtand.length=${this.imagesExtand.length}`)
    },
  },
}

const getQueryString = (name, url) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const u = url ? new URL(url) : window.location
  const r = u.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])

  return null
}
</script>
