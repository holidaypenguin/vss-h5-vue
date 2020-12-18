<template>
  <div class="vss-app">

    <div class="vss-app-body" style="padding-top: 1px;">

      <div class="vss-title">钱家巷包月</div>

      <div class="vss-line">
        <div class="vss-line-title">1、姓名</div>
        <div class="vss-line-input">
          <van-field
            label=""
            v-model="params.buyerName"
            @click.prevent.stop
            placeholder="请输入姓名"
          />
        </div>
      </div>

      <div class="vss-line">
        <div class="vss-line-title">2、手机号</div>
        <div class="vss-line-input">
          <van-field
            label=""
            v-model="params.phone"
            text='tel'
            maxlength='11'
            @click.prevent.stop
            placeholder="请输入手机号"
          />
        </div>
      </div>

      <div class="vss-line">
        <div class="vss-line-title">3、车牌号</div>
        <div class="vss-line-input">
          <van-field
            label=""
            v-model="params.plateno"
            maxlength='8'
            @click.prevent.stop
            placeholder="请输入车牌号"
          />
        </div>
      </div>

      <div class="vss-line">
        <div class="vss-line-title">4、起始日期</div>
        <div class="vss-line-input" @click="showStartAt = true">
          {{params.startDay}}
        </div>
        <van-calendar v-model="showStartAt" @confirm="startAtConfirm" />
      </div>

      <div class="vss-line">
        <div class="vss-line-title">5、包月时间</div>
        <div class="vss-line-input"  @click="showLong = true">
          {{params.month || 0}}个月
        </div>
        <van-action-sheet v-model="showLong" :actions="longActions" @select="longSelect" />
      </div>

      <div class="vss-line">
        <div class="vss-line-title">6、金额</div>
        <div class="vss-line-input">
          {{money || 0}} 元
        </div>
      </div>

      <div class="vss-pay" @click="saveMessage">去支付</div>

    </div>

    <van-popup v-model="showQrcode">
      <img :src="payUrl" alt="" class="vss-pay-qrcode">
    </van-popup>

    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      color="#ee0a24"
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
  SAVE_MESSAGE,
} from './interface'

import {DateFormat} from 'utils/date'
import {isWechatSource, isAliSource, getSource} from 'utils/source'

const wechatPay = 'http://img0.t.rongyi.com/123/20201217/b5900edb9410bf7cf7758f4e2a194b5c.png'
const aliPay = 'http://img0.t.rongyi.com/123/20201217/2a5b5ed4d49a125afe46d715bd69fbf0.jpg'

export default {
  name: 'VssApp',

  mixins: [],

  components: {
    Loading,
  },

  data () {
    return {
      isLoading: false,
      showStartAt: false,
      showLong: false,
      showQrcode: false,

      longActions: [
        {name: '1个月', value: 1},
        {name: '2个月', value: 2},
        {name: '3个月', value: 3},
        {name: '4个月', value: 4},
        {name: '5个月', value: 5},
        {name: '6个月', value: 6},
        {name: '7个月', value: 7},
        {name: '8个月', value: 8},
        {name: '9个月', value: 9},
        {name: '10个月', value: 10},
        {name: '11个月', value: 11},
        {name: '12个月', value: 12},
      ],

      payUrl: wechatPay,

      params: {
        buyerName: '',
        phone: '',
        plateno: '',
        startDay: DateFormat(Date.now(), 'yyyy-MM-dd'),
        month: '1',
        source: getSource(),
      },
    }
  },

  computed: {
    money () {
      return (this.params.month || 0) * 850
    },
  },

  async created () {
  },

  async mounted () {
  },

  methods: {
    startAtConfirm (date) {
      this.params.startDay = DateFormat(date, 'yyyy-MM-dd')
      this.showStartAt = false
    },
    longSelect (item) {
      this.params.month = item.value
      this.showLong = false
    },
    async saveMessage () {
      if (!this.params.buyerName) {
        return this.$toast('请输入姓名')
      }
      if (!this.params.phone) {
        return this.$toast('请输入手机号')
      }
      if (this.params.phone.length !== 11) {
        return this.$toast('请输入正确手机号')
      }
      if (!this.params.plateno) {
        return this.$toast('请输入车牌号')
      }
      if (this.params.plateno.length !== 7 && this.params.plateno.length !== 8) {
        return this.$toast('请输入正确车牌号')
      }
      if (!this.params.startDay) {
        return this.$toast('请输入起始日期')
      }
      if (!this.params.month) {
        return this.$toast('请输入包月时间')
      }
      if (this.isLoading) return

      this.isLoading = true

      await this.$axios
        .post(SAVE_MESSAGE, Object.assign({}, this.params, {
          orderFee: this.money,
        }))
        .then(() => {
          if (isWechatSource()) {
            this.payUrl = wechatPay
          } else if (isAliSource()) {
            this.payUrl = aliPay
          } else {
            this.payUrl = wechatPay
          }
          this.showQrcode = true
        })
        .finally((e) => {
          this.isLoading = false
        })
    },
  },
}

</script>
<style lang="postcss">
@import './styles/app.less'
</style>
