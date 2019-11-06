<template>
  <div class="vss-app wrap">
    <div class="logggg" ref="logggg">
      <div>日志1</div>
      <div v-for="(log, index) in logggg" :key="index">
        {{log}}
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-undef */

import {
  mapState,
  mapMutations,
} from 'vuex'

import {
  // SET_LOGIN,
  SET_LOADING,
  // SET_TOKEN,
} from './store/mutations-type'

// import {
//   GETWXCONFIG,
//   GETSHAREFEED,
// } from './interface'

export default {
  name: 'VssApp',

  components: {
  },

  data () {
    return {
      msgError: false,
      // eslint-disable-next-line max-len
      feedUid: getQueryString('feedUid'),
      feedId: getQueryString('feedId'),
      shareSign: getQueryString('shareSign'),
      detail: {},
      signature: '',
      imagesExtand: [],
      logggg: [],
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
    this.logggg.push('mounted')
    await this.search()
    await this.searchConfig()
  },

  methods: {
    ...mapMutations([
      SET_LOADING,
    ]),
    async searchConfig () {
      this.logggg.push('searchConfig')
      this[SET_LOADING](true)
      // const {data} = await this.$axios.get(GETWXCONFIG, {params: {
      //   url: location.href.split('#')[0],
      // }})

      // eslint-disable-next-line max-len
      const {data} = {'code': 0, 'data': {'signature': '662ce163d5477e7c4c55f26da02edecd568b7b0b', 'noncestr': '550b3096-e4b6-4827-9fc3-08e0379847e5', 'timestamp': 1572873683303}, 'msg': 'SUCCESS', 'success': true}

      this.signature = data.signature
      this[SET_LOADING](false)

      this.logggg.push(JSON.stringify({
        debug: true,
        appId: 'wx00359698d58c35cc', // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.noncestr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData',
          // 'onMenuShareTimeline',
          // 'onMenuShareAppMessage',
          'showMenuItems',
          'hideMenuItems',
          'hideAllNonBaseMenuItem',
        ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      }))

      this.logggg.push('wx.config')

      wx.config({
        debug: true,
        appId: 'wx00359698d58c35cc', // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.noncestr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData',
          // 'onMenuShareTimeline',
          // 'onMenuShareAppMessage',
          'showMenuItems',
          'hideMenuItems',
          'hideAllNonBaseMenuItem',
        ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      this.logggg.push('微信准备好了吗')
      await this.wxReady()
      this.logggg.push('微信准备好了')
      // eslint-disable-next-line no-console
      console.log('微信准备好了')
      wx.hideAllNonBaseMenuItem()
      wx.showMenuItems({
        menuList: [
          'menuItem:share:appMessage',
          'menuItem:share:timeline',
        ],
      })
      this.setAppData()
      // this.setAppData2()
      this.setTimelineData()
    },
    wxReady () {
      this.logggg.push('wxReady start')

      return new Promise((resolve, reject) => {
        wx.ready(() => {
          this.logggg.push('wxReady ready')
          // eslint-disable-next-line no-console
          console.log('wxReady')
          resolve()
        })

        wx.error((e) => {
          this.logggg.push('wxReady error')
          reject(e)
        })
      })
    },
    setAppData () {
      const data = this.detail.feed
      wx.updateAppMessageShareData({
        title: data.title || data.content, // 分享标题
        desc: data.content, // 分享描述
        link: location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: this.imagesExtand[0], // 分享图标
        success () {
          alert('updateAppMessageShareData success')
          // eslint-disable-next-line no-console
          console.log('updateAppMessageShareData success')
        },
      })

      // wx.onMenuShareAppMessage({
      //   title: data.title || data.content,
      //   desc: data.content,
      //   link: location.href.split("#")[0],
      //   imgUrl: this.imagesExtand[0],
      //   success () {
      //     // eslint-disable-next-line no-console
      //     console.log('onMenuShareAppMessage success')
      //   },
      // })
    },

    setAppData2 () {
      const data = this.detail.feed

      wx.onMenuShareAppMessage({
        title: data.title || data.content,
        desc: data.content,
        link: location.href.split('#')[0],
        imgUrl: this.imagesExtand[0],
        success (e) {
          // eslint-disable-next-line no-console
          console.log('onMenuShareAppMessage success', e)
        },
      })
    },
    setTimelineData () {
      const data = this.detail.feed
      wx.updateTimelineShareData({
        title: data.title || data.content, // 分享标题
        link: location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: this.imagesExtand[0], // 分享图标
        success () {
          // 设置成功
        },
      })
    },

    async search () {
      this[SET_LOADING](true)
      // const {data} = await this.$axios.get(GETSHAREFEED, {params: {
      //   feedUid: this.feedUid,
      //   feedId: this.feedId,
      //   shareSign: this.shareSign,
      // }})

      // eslint-disable-next-line max-len
      const {data} = {'code': 0, 'data': {'commentFeedViewList': [{'cid': 26332037296160768, 'commentCount': 0, 'commentPNMore': false, 'content': '我靠', 'createTime': '2019-10-31 15:54:07', 'createTimeDesc': '4天前', 'favourCount': 0, 'favourDone': false, 'feedId': 25361367422730240, 'feedUid': 213, 'fromUid': 204, 'fromUidName': '', 'fromUidPhotoUrl': '', 'fromUidPlatformName': '', 'id': 26332037296160768, 'pid': 25619382499540992, 'residualCount': 0, 'updateTime': '2019-10-31 15:54:07'}, {'cid': 26246503819378688, 'commentCount': 0, 'commentPNMore': false, 'content': '大家都觉得假的', 'createTime': '2019-10-31 10:14:14', 'createTimeDesc': '4天前', 'favourCount': 0, 'favourDone': false, 'feedId': 25361367422730240, 'feedUid': 213, 'fromUid': 2, 'fromUidName': '', 'fromUidPhotoUrl': '', 'fromUidPlatformName': '', 'id': 26246503819378688, 'pid': 25619382499540992, 'residualCount': 0, 'updateTime': '2019-10-31 10:14:14'}, {'cid': 26081489972101120, 'commentCount': 0, 'commentPNMore': false, 'content': 'pomposo', 'createTime': '2019-10-30 23:18:32', 'createTimeDesc': '4天前', 'favourCount': 0, 'favourDone': false, 'feedId': 25361367422730240, 'feedUid': 213, 'fromUid': 204, 'fromUidName': '', 'fromUidPhotoUrl': '', 'fromUidPlatformName': '', 'id': 26081489972101120, 'pid': 25619382499540992, 'residualCount': 0, 'updateTime': '2019-10-30 23:18:32'}, {'cid': 26081469529063424, 'commentCount': 0, 'commentPNMore': false, 'content': '西新桥', 'createTime': '2019-10-30 23:18:27', 'createTimeDesc': '4天前', 'favourCount': 0, 'favourDone': false, 'feedId': 25361367422730240, 'feedUid': 213, 'fromUid': 204, 'fromUidName': '', 'fromUidPhotoUrl': '', 'fromUidPlatformName': '', 'id': 26081469529063424, 'pid': 25619382499540992, 'residualCount': 0, 'updateTime': '2019-10-30 23:18:27'}, {'cid': 25868231684128768, 'commentCount': 0, 'commentPNMore': false, 'content': '6到不行', 'createTime': '2019-10-30 09:11:07', 'createTimeDesc': '5天前', 'favourCount': 0, 'favourDone': false, 'feedId': 25361367422730240, 'feedUid': 213, 'fromUid': 204, 'fromUidName': '', 'fromUidPhotoUrl': '', 'fromUidPlatformName': '', 'id': 25868231684128768, 'pid': 25594909767499776, 'residualCount': 0, 'updateTime': '2019-10-30 09:11:07'}], 'feed': {'collectCount': 1, 'collectCountDesc': '1', 'collectDone': false, 'commentCount': 26, 'commentCountDesc': '26', 'communityId': 8, 'content': '交通论坛会个锤子🔨', 'contentShort': '交通论坛会个锤子🔨', 'createTime': '2019-10-28 23:37:01', 'createTimeDesc': '6天前', 'extand': false, 'favourCount': 1, 'favourCountDesc': '1', 'favourDone': false, 'fid': 25361367422730240, 'id': 25361367422730240, 'imagesExtand': 'https://image-video-feed-all.oss-cn-beijing.aliyuncs.com/ios/online/imagesExtand/15722770176169.jpg_213;https://image-video-feed-all.oss-cn-beijing.aliyuncs.com/ios/online/imagesExtand/15722770174735.jpg_213', 'platformName': '东风出行', 'title': '', 'uid': 213, 'uidName': '银建一分董师傅', 'uidPhotoUrl': 'https://image-video-feed-all.oss-cn-beijing.aliyuncs.com/ios/online/HeadPortrait/15722677171199.jpg_213', 'updateTime': '2019-10-28 23:37:01'}}, 'msg': 'SUCCESS', 'success': true}

      this.detail.feed = data.feed
      this.detail.commentFeedViewList = data.commentFeedViewList
      this[SET_LOADING](false)
      this.setImagesExtand()
    },
    setImagesExtand () {
      this.imagesExtand = this.detail &&
        this.detail.feed &&
        this.detail.feed.imagesExtand
        ? this.detail.feed.imagesExtand.split(';') : []
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
