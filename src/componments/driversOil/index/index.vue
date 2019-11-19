<template>
  <div class="p-index">

    <Nav :title="title" type="index"></Nav>

    <div class="p-index-top">
      <van-dropdown-menu class="p-index-distance"
        active-color="#00BE06">
        <van-dropdown-item v-model="sort" :options="sortOpts"
          get-container=".p-index-top"
          @change="sortChangeHandler"/>
      </van-dropdown-menu>
      <van-dropdown-menu class="p-index-distance"
        active-color="#00BE06">
        <van-dropdown-item v-model="oilNo" :options="oilNoOpts"
          @change="oilNoChangeHandler"/>
      </van-dropdown-menu>
      <div class="p-index-top-msg">在线支付</div>
    </div>

    <div class="p-index-split"></div>

    <div class="p-index-list">
      <div class="p-index-item">
        <div class="p-index-left">
          <img class="p-index-icon" src=""/>
        </div>
        <div class="p-index-right">
          <div class="p-index-name">北京广开源加油站</div>
          <div class="p-index-addr">北京市朝阳区北四环路六公主坟村</div>
          <div class="p-index-money">6.00/升</div>
          <div class="p-index-other">
            <div class="p-index-num">92#</div>
            <div class="p-index-status p-index-status--1"></div>
            <div class="p-index-diff">0.4元</div>
          </div>
          <div class="p-index-go">3.1KM</div>
        </div>
      </div>
      <div class="p-index-item">
        <div class="p-index-left">
          <img class="p-index-icon" src=""/>
        </div>
        <div class="p-index-right">
          <div class="p-index-name">北京广开源加油站</div>
          <div class="p-index-addr">北京市朝阳区北四环路六公主坟村</div>
          <div class="p-index-money">6.00/升</div>
          <div class="p-index-other">
            <div class="p-index-num">92#</div>
            <div class="p-index-status p-index-status--1"></div>
            <div class="p-index-diff">0.4元</div>
          </div>
          <div class="p-index-go">3.1KM</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VanDropdownMenu from 'vant/lib/dropdown-menu'
import 'vant/lib/dropdown-menu/style'
import VanDropdownItem from 'vant/lib/dropdown-item'
import 'vant/lib/dropdown-item/style'
import {
  mapState,
} from 'vuex'

import Utils from '@/module/driversOil/utils'
import Nav from '../nav/nav.vue'
export default {
  name: 'Index',

  mixins: [Utils],

  components: {
    Nav,
    VanDropdownMenu,
    VanDropdownItem,
  },

  data () {
    return {
      sort: 1,
      sortOpts: [
        {text: '距离优先', value: 1},
        {text: '价格优先', value: 2},
      ],
      oilNo: 92,
      oilNoOpts: [
        {text: '92号汽油', value: 92},
        {text: '95号汽油', value: 95},
        {text: '98号汽油', value: 98},
        {text: '0号柴油', value: 0},
      ],
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
  },
  methods: {
    sortChangeHandler () {},
    oilNoChangeHandler () {},
  },
}
</script>

<style lang="postcss">
@n p{
  @b index{
    @e top{
      margin-top: 88px;
      padding: 14px 32px;
      display: flex;
      @e msg{
        flex: 1;
        text-align: right;
        line-height: 70px;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #00BE06;
      }
    }
    @e distance{
      width: 224px;
      height: 72px;
      margin-right: 32px;
      background: #FFFFFF;
      border: 1px solid #D9D9D9; /* no */
      border-radius: 6px;
      font-size: 32px;

      .van-dropdown-menu__title{
        font-size: 32px;
        line-height: 32px;
      }
    }
    @e split{
      height: 16px;
      background: #F2F2F7;
    }
    @e list{}
    @e item{
      padding: 32px;
      display: flex;

      + .p-index-item{
        border-top: 1px solid #D9D9D9; /* no */
      }
    }
    @e left{
      width: 100px;
      margin-right: 16px;
      display: flex;
      align-items: center;
    }
    @e icon{
      width: 100px;
      height: 100px;
      display: block;
    }
    @e right{
      flex: 1;
      position: relative;
    }
    @e name{
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #1A1A1A;
      line-height: 32px;
      margin-right: 182px;
      margin-bottom: 16px;
    }
    @e addr{
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #999999;
      line-height: 28px;
      margin-right: 182px;
      margin-bottom: 32px;
    }
    @e money{
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #00BE06;
      text-align: right;
      line-height: 32px;
      position: absolute;
      top: 0;
      right: 0;
    }
    @e other{
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #999999;
      line-height: 28px;
      margin-bottom: 10px;
      display: flex;
    }
    @e num{
      display: inline-block;
      margin-right: 48px;
    }
    @e status{
      display: inline-block;
      width: 16px;
      height: 24px;
      margin-top: 2px;
      @m 1{
        background: url(../images/down@2x.png);
        background-size: 100% 100%;
      }
      @m 2{
        background: url(../images/up@2x.png);
        background-size: 100% 100%;
      }
    }
    @e diff{
      display: inline-block;
      margin-left: 16px;
    }
    @e go{
      background: #FFFFFF;
      border: 2px solid #999999;
      border-radius: 24px;
      line-height: 48px;
      display: flex;
      position: absolute;
      bottom: 0;
      right: 0;
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
}
</style>
