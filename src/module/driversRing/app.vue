<template>
  <div class="vss-app" @click="wrapHandler">
    <div class="wrap" ref="wrap">
      <div class="item item-1">
        <div class="bg"></div>
        <div class="logo"></div>
        <div class="name">司机圈</div>
        <div class="title"></div>
        <div class="msg">全网5000万司机的选择</div>
        <div class="button scale15">免费下载 司机圈儿app</div>
        <div class="next scale25"></div>
      </div>
      <div class="item item-2">
        <div class="title">吐露心声相互交流</div>
        <div class="msg">拒绝沉默，讨论网约车运行中发现的问题</div>
        <div class="msg">相互交流，学习更多的技巧</div>
        <div class="phone"></div>
        <div class="next scale25"></div>
        <div class="bottom">
          <div class="logo"></div>
          <div class="center">
            <div class="t1">司机圈儿</div>
            <div class="t2">全网5000万司机的选择</div>
          </div>
          <div class="button scale15">免费下载</div>
        </div>
      </div>
      <div class="item item-3">
        <div class="title">工作、娱乐一个都不能少</div>
        <div class="msg">拒绝平庸乏味，生活并不只有工作</div>
        <div class="msg">不再为每次的堵车心烦</div>
        <div class="phone"></div>
        <div class="bottom">
          <div class="logo"></div>
          <div class="center">
            <div class="t1">司机圈儿</div>
            <div class="t2">全网5000万司机的选择</div>
          </div>
          <div class="button scale15">免费下载</div>
        </div>
      </div>
    </div>

    <div class="p-download" v-show="showTips">
      <div class="p-download-wrap">
        <div class="p-download-icon"></div>
        <div class="p-download-msg">
          <div class="p-download-msg-inner">
            司机圈儿
          </div>
        </div>
        <div class="p-download-tips">微信/QQ内无法下载应用</div>
      </div>

      <div class="p-download-top">
        请点击右上角<br>
        选择“浏览器中打开”
      </div>
    </div>
  </div>
</template>
<script>

import iSlider from '../../public/utils/iSlider'

const isWx = navigator.userAgent.toLocaleLowerCase().indexOf('micromessenger') > 0

const isJump = location.hash === '#jump'

export default {
  name: 'VssApp',

  components: {
  },

  data () {
    return {
      myslider: undefined,
      showTips: isJump && isWx,
    }
  },

  computed: {
  },

  created () {
  },

  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },

  methods: {
    init () {
      // eslint-disable-next-line new-cap
      this.myslider = new iSlider({
        wrap: this.$refs.wrap,
        item: '.item',
        onslide (index) {
          // eslint-disable-next-line no-console
          // console.log(index)
        },
      })
      // eslint-disable-next-line no-console
      // console.info(this.myslider)
    },
    wrapHandler (e) {
      switch (e.target.classList[0]) {
        case 'button':
          if (isWx) {
            this.showTips = true

            return
          }
          location.href = 'https://www.driversite.cn/index.html'
          break
        case 'next':
          this.myslider.next()
          break
        default:
          break
      }
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
            // err.data.meta.msg && this.$toast(err.data.meta.msg)
          }
        }
      } else {
        // this.$toast('请求失败')
      }
    }
    // eslint-disable-next-line no-console
    console.warn(err)
    if (err) {
      // this.$store.commit(SET_LOADING, false)
    }

    return false
  },
}
</script>
