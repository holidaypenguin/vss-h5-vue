<template>
  <div class="p-detail">

    <Nav :title="title" type="detail"
      @back="backHandler"></Nav>

    <div class="p-detail-top">
      <div class="p-detail-top-bg"></div>
      <div class="p-detail-top-inner">
        <div class="p-detail-top-name">北京广开源加油站</div>
        <div class="p-detail-top-pay">在线支付</div>
        <div class="p-detail-top-addr">北京市朝阳区北四环路六公主坟村</div>
        <div class="p-detail-top-go">导航</div>
      </div>
    </div>

    <div class="p-detail-name">
      <div class="p-detail-name-left">在线支付</div>
      <div class="p-detail-name-right">选择加油所用油枪号</div>
    </div>

    <div class="p-detail-tab">
      <div class="p-detail-tab-item p-detail-tab-item--on">
        <div class="p-detail-tab-title p-detail-tab-title--on">92#</div>
      </div>
      <div class="p-detail-tab-item">
        <div class="p-detail-tab-title">92#</div>
      </div>
    </div>

    <div class="p-detail-msg">
      <div class="p-detail-msg-left">¥5.50</div>
      <div class="p-detail-msg-right">
        <div class="p-detail-msg-line p-detail-msg-line--line1">
          比国际价省
          <span class="p-detail-msg-more">1.2元</span>
        </div>
        <div class="p-detail-msg-line">
          仅限在线支付，以更新价格为准
        </div>
      </div>
    </div>

    <div class="p-detail-num">
      <div class="p-detail-num-inner">
        <div class="p-detail-num-item">1号枪</div>
        <div class="p-detail-num-item p-detail-num-item--on">1号枪</div>
        <div class="p-detail-num-item">1号枪</div>
        <div class="p-detail-num-item">1号枪</div>
        <div class="p-detail-num-item">1号枪</div>
        <div class="p-detail-num-item">1号枪</div>
      </div>
    </div>

    <div class="p-detail-button p-detail-button--on">
      在线优惠支付
    </div>

  </div>
</template>

<script>
import Utils from '@/module/driversOil/utils'
import Nav from '../nav/nav.vue'
export default {
  name: 'Detail',

  mixins: [Utils],

  components: {
    Nav,
  },

  props: {
    id: {
      default: '',
    },
  },

  data () {
    return {
      title: '加油优惠',
    }
  },

  computed: {
  },

  async created () {
  },

  async mounted () {

  },

  methods: {
    backHandler () {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="postcss">
@n p{
  @b detail{
    /* overflow: auto; */

    @e top{
      @e bg{
        height: 258px;
        background-image: linear-gradient(270deg, #00E00E 0%, #00BE06 100%);
      }
      @e inner{
        background: #FFFFFF;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10);
        border-radius: 6px;
        margin: -138px 32px 48px 32px;
        overflow: hidden;
        background: url(../images/oil-bg@2x.png) no-repeat #FFFFFF;
        background-size: 200px 200px;
        background-position: 470px 28px;
        position: relative;
      }
      @e name{
        width: 420px;
        font-family: PingFangSC-Medium;
        font-size: 40px;
        color: #1A1A1A;
        line-height: 40px;
        word-break: break-all;
        margin: 32px auto 32px 20px;
      }
      @e pay{
        background: #FFFFFF;
        border: 1px solid #B3B3B3; /* no */
        border-radius: 24px;
        line-height: 48px;
        padding: 0 16px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #999999;
        min-width: 128px;
        margin: 0 auto 32px 20px;
        display: inline-block;
      }
      @e addr{
        width: 420px;
        margin: 0 auto 32px 20px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #999999;
        line-height: 28px;
        word-break: break-all;
      }
      @e go{
        background: #FFFFFF;
        border: 2px solid #999999;
        border-radius: 24px;
        line-height: 48px;
        display: flex;
        position: absolute;
        bottom: 32px;
        right: 20px;
        font-size: 24px;
        color: #666666;
        padding-right: 24px;

        &::before{
          width: 28px;
          height: 28px;
          content: ' ';
          display: block;
          margin: 10px 16px 10px 24px;
          background: url(../images/go@2x.png);
          background-size: 100% 100%;
        }
      }
    }

    @e name{
      margin: 0 0 32px 32px;
      display: flex;
      @e left{
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #1A1A1A;
        line-height: 36px;
      }
      @e right{
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #999999;
        line-height: 28px;
        margin-top: 8px;
        margin-left: 16px;
      }
    }

    @e tab{
      padding-left: 35px;
      padding-bottom: 20px;
      border-bottom: 1px solid #D9D9D9; /* no */

      @e item{
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #666666;
        text-align: center;
        line-height: 28px;
        min-width: 66px;
        text-align: center;
        margin-right: 50px;
        padding-top: 8px;
        display: inline-block;
        position: relative;
        @m on{
          padding-top: 0;
          font-family: PingFangSC-Medium;
          font-size: 36px;
          color: #1A1A1A;
          text-align: center;
          line-height: 36px;
          position: relative;
          z-index: 2;
          &::after{
            background: #00BE06;
            border-radius: 8px;
            content: ' ';
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            height: 16px;
            bottom: -8px;
          }
        }
      }
      @e title{
        position: relative;
        z-index: 5;
        @m on{
        }
      }
    }

    @e msg{
      margin: 32px;
      display: flex;
      @e left{
        font-family: PingFangSC-Medium;
        font-size: 56px;
        color: #F7B500;
        line-height: 56px;
        margin-right: 16px;
      }
      @e right{
        flex: 1;
      }
      @e line{
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #999999;
        line-height: 24px;
        display: flex;

        @m line1{
          margin-bottom: 8px;
        }
      }
      @e more{
        color: #1A1A1A;
        margin-left: 36px;
      }
    }

    @e num{
      margin: 32px;
      font-size: 0;
      overflow: hidden;
      @e inner{
        margin-right: -36px;
      }
      @e item{
        background: #F9F9F9;
        border-radius: 12px;
        width: 144.5px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #666666;
        margin-right: 36px;
        margin-bottom: 32px;
        display: inline-block;
        @m on{
          color: #FFFFFF;
          background-image: linear-gradient(270deg, #00E00E 0%, #00BE06 100%);
        }
      }
    }

    @e button{
      background: #D9D9D9;
      border-radius: 44px;
      width: 590px;
      height: 88px;
      line-height: 88px;
      margin: 0 auto 32px auto;
      font-family: PingFangSC-Regular;
      font-size: 36px;
      color: #FFFFFF;
      text-align: center;
      @m on{
        background-image: linear-gradient(270deg, #00E00E 0%, #00BE06 100%);
      }
    }
  }
}
</style>
