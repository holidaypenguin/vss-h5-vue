<template>
  <div class="p-index">

    <Nav :title="title" type="index"
      @order="orderHandler"
      @help="helpHandler"></Nav>

    <div class="p-index-top">
      <van-dropdown-menu class="p-index-distance"
        active-color="#00BE06">
        <van-dropdown-item v-model="params.sort" :options="sortOpts"
          get-container=".p-index-top"
          @change="sortChangeHandler"/>
      </van-dropdown-menu>
      <van-dropdown-menu class="p-index-distance"
        active-color="#00BE06">
        <van-dropdown-item v-model="params.oilNo" :options="oilNoOpts"
          @change="oilNoChangeHandler"/>
      </van-dropdown-menu>
      <div class="p-index-top-msg">在线支付</div>
    </div>

    <div class="p-index-split"></div>

    <div class="p-index-list">
      <div class="p-index-item"
        v-for="(item) in list"
        :key="item.gasId">
        <div class="p-index-left">
          <img class="p-index-icon" :src="item.gasLogoSmall"/>
        </div>
        <div class="p-index-right">
          <div class="p-index-name">{{item.gasName}}</div>
          <div class="p-index-addr">{{item.gasAddress}}</div>
          <div class="p-index-money">{{item.oilPriceMap.priceYfq}}/升</div>
          <div class="p-index-other">
            <div class="p-index-num">{{item.oilPriceMap.oilName}}</div>
            <div :class="[
              'p-index-status',
              `p-index-status--${item.oilPriceMap.diffPriceType}`,
            ]"></div>
            <div class="p-index-diff">{{item.oilPriceMap.difPrice}}元</div>
          </div>
          <div class="p-index-go"
            @click="itemClickHandler(item.id)">{{item.dis}}</div>
        </div>
      </div>
    </div>

    <div class="p-index-loading" v-show="loadingNext">
      <loading
        :active.sync="loadingNext"
        :can-cancel="false"
        :is-full-page="false"
        color="#F6504D"
        loader="bars"
        :opacity="0.3"
        :z-index="1"
      ></loading>
    </div>
  </div>
</template>

<script>
import VanDropdownMenu from 'vant/lib/dropdown-menu'
import 'vant/lib/dropdown-menu/style'
import VanDropdownItem from 'vant/lib/dropdown-item'
import 'vant/lib/dropdown-item/style'
import Loading from 'vue-loading-overlay'

import {
  mapState,
  mapMutations,
} from 'vuex'

import Dom from 'utils/dom'

import {
  SET_LOADING,
  SET_LOADING_NEXT,
} from '../../../module/driversOil/store/mutations-type'

import {
  GETLIST,
} from '../../../module/driversOil/interface'

import Utils from '@/module/driversOil/utils'
import Nav from '../nav/nav.vue'
export default {
  name: 'Index',

  mixins: [Utils],

  components: {
    Nav,
    VanDropdownMenu,
    VanDropdownItem,
    Loading,
  },

  data () {
    return {
      sortOpts: [
        {text: '距离优先', value: 1},
        {text: '价格优先', value: 2},
      ],
      oilNoOpts: [
        {text: '92号汽油', value: 92},
        {text: '95号汽油', value: 95},
        {text: '98号汽油', value: 98},
        {text: '0号柴油', value: 0},
      ],
      params: {
        sort: 1,
        oilNo: 92,
        lng: 126.55,
        lat: 43.85,
      },
      page: {
        page: 1,
        count: this.$store.state.pageSize,
        gonext: false,
        // totalPage: 1,
      },
      getting: false,
      listWrapEl: undefined,
      listEl: undefined,
      scrollTop: 0,
      list: [],
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.loading,
      loadingNext: state => state.loadingNext,
    }),
  },

  async created () {
  },

  async mounted () {
    await this.search()
    this.$nextTick(() => {
      this.listWrapEl = this.$parent.$el
      this.listEl = this.$el
      this.nextPage()
    })
  },

  activated () {
    this.$nextTick(() => {
      this.listWrapEl && this.listWrapEl.scrollTo(0, this.scrollTop || 0)
    })
  },

  methods: {
    ...mapMutations([
      SET_LOADING,
      SET_LOADING_NEXT,
    ]),
    nextPage () {
      Dom.on(this.listWrapEl, 'scroll', this.addData)
    },
    addData () {
      const scrollTop = parseFloat(this.listWrapEl.scrollTop)
      this.scrollTop = scrollTop

      if (!this.page.gonext) return

      const clientHeight = parseFloat(this.listWrapEl.clientHeight)
      const mainHeight = parseFloat(this.listEl.clientHeight)
      const totalheight = clientHeight + scrollTop // 浏览器的高度加上滚上去的高度

      if (totalheight >= mainHeight - 200) {
        // 当文档的高度小于或者等于总的高度加100的时候，开始动态加载数据
        this.$nextTick(() => {
          this.search(this.page.page + 1)
        })
      }
    },
    async search (pageNo = 1) {
      if (this.getting) return

      this.getting = true

      // if (pageNo !== 1 && pageNo > this.page.totalPage) {
      //   this.page.gonext = false
      //   this.getting = false

      //   return
      // }
      this[pageNo === 1 ? SET_LOADING : SET_LOADING_NEXT](true)
      // this.axios.post(`${API_HOST}/api/auth/login`, obj, {
      //         headers: {
      //             'Content-Type': 'application/x-www-form-urlencoded'
      //         }
      //     })
      const {data: {gasList}} = await this.$axiosForm.post(
        GETLIST,
        Object.assign(this.params, {
          count: this.page.count,
          page: pageNo,
        }),
        {
          headers: {
            token: '',
          },
        },
      ).catch((e) => {
        this.getting = false
        this[pageNo === 1 ? SET_LOADING : SET_LOADING_NEXT](false)

        return Promise.reject(e)
      })

      if (pageNo === 1) {
        this.list = []
      }
      this.adjustList(gasList)
      this.list = this.list.concat(gasList)

      this.page.page = pageNo
      // this.page.totalPage = parseInt((count + this.page.count - 1) / page.count, 10) || 0
      this.page.gonext = gasList.length >= this.page.count

      this.getting = false
      this[pageNo === 1 ? SET_LOADING : SET_LOADING_NEXT](false)
    },
    adjustList (gasList) {
      if (!gasList || gasList.length < 1) return

      gasList.map(gas => {
        const oilPriceList = JSON.parse(gas.oilPrice)
        gas.oilPriceMap = oilPriceList.filter(oil => oil.oilNo === this.params.oilNo)[0]

        if (!gas.oilPriceMap) return

        const difPrice = gas.oilPriceMap.priceYfq - gas.oilPriceMap.priceOfficial
        gas.oilPriceMap.diffPriceType = difPrice > 0 ? 2 : difPrice < 0 ? 1 : 0
        gas.oilPriceMap.difPrice = Math.abs(parseFloat(difPrice.toFixed(2)))
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    itemClickHandler (id) {
      this.$router.push({
        name: 'detail',
        params: {
          id,
        },
      })
    },
    async sortChangeHandler () {
      await this.search()
    },
    async oilNoChangeHandler () {
      await this.search()
    },
    orderHandler () {
      this.$router.push({
        name: 'order',
      })
    },
    helpHandler () {
      this.$router.push({
        name: 'help',
      })
    },
  },
}
</script>

<style lang="postcss">
@n p{
  @b index{
    overflow: auto;
    @e top{
      margin-top: 89px;
      padding: 14px 32px;
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      background: #FFFFFF;
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
      margin-top: 189px;
      height: 16px;
      background: #F2F2F7;
    }
    @e list{
      padding-bottom: 40px;
    }
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
      border-radius: 12 px;
    }
    @e right{
      flex: 1;
      position: relative;
    }
    @e name{
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #1A1A1A;
      line-height: 1.2;
      margin-right: 182px;
      margin-bottom: 16px;
    }
    @e addr{
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #999999;
      line-height: 1.2;
      margin-right: 182px;
      margin-bottom: 32px;
    }
    @e money{
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #00BE06;
      text-align: right;
      line-height: 1.2;
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
    @e loading{
      position: relative;
      height: 100px;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
}
</style>
