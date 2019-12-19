<template>
  <div class="p-order">

    <Nav :title="title" type="order"
      @back="backHandler"></Nav>

    <div class="p-order-split"></div>

    <div class="p-order-list">
      <div class="p-order-item"
        v-for="(item) in list"
        :key="item.orderId">
        <div class="p-order-line1">
          <div class="p-order-line1-left">{{item.gasName}}</div>
          <div class="p-order-line1-right">
            支付
            <span class="p-order-line1-right-num">{{item.amountPay}}</span>
            元 优惠{{item.amountDiscounts}}元
          </div>
        </div>
        <div class="p-order-line2">
          <div class="p-order-line2-left">{{item.oilNo}}</div>
          <div class="p-order-line2-right">{{item.gunNo}}号枪 {{item.litre}}升</div>
        </div>
        <div class="p-order-line3">
          <div class="p-order-line3-left">{{item.payTime}}</div>
          <!-- p-order-line3-right--2 -->
          <div class="p-order-line3-right">
            {{item.orderStatusName || ''}}
          </div>
        </div>
        <div class="p-order-go"
          @click="itemClickHandler(item.gasId)">去加油</div>
      </div>
    </div>

    <div class="p-order-empty"
      v-if="!list || list.length < 1">
      <div class="p-order-empty-icon"></div>
      <div class="p-index-empty-msg">暂时没有加油记录哦～</div>
    </div>

    <div class="p-order-loading" v-show="loadingNext">
      <loading
        :active.sync="loadingNext"
        :can-cancel="false"
        :is-full-page="false"
        color="#00BE06"
        loader="bars"
        :opacity="0.3"
        :z-index="1"
      ></loading>
    </div>
  </div>
</template>

<script>
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
  GETORDER,
} from '../../../module/driversOil/interface'

import Utils from '@/module/driversOil/utils'
import Nav from '../nav/nav.vue'
export default {
  name: 'Order',

  mixins: [Utils],

  components: {
    Nav,
    Loading,
  },

  data () {
    return {
      params: {
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
      // tokenId: state => state.tokenId,
    }),
  },

  async created () {
  },

  async mounted () {
    await this.getUserToken()
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

      this[pageNo === 1 ? SET_LOADING : SET_LOADING_NEXT](true)

      const gasPriceList = await this.searchServer(pageNo)
        .catch((e) => {
          this.getting = false
          this[pageNo === 1 ? SET_LOADING : SET_LOADING_NEXT](false)

          // 返回code 1029的时候，提示登录页面
          this.toLoginServer(e)

          return Promise.reject(e)
        })

      if (pageNo === 1) {
        this.list = []
      }
      this.list = this.list.concat(gasPriceList)

      this.page.page = pageNo
      // this.page.totalPage = parseInt((count + this.page.count - 1) / page.count, 10) || 0
      this.page.gonext = gasPriceList.length >= this.page.count

      this.getting = false
      this[pageNo === 1 ? SET_LOADING : SET_LOADING_NEXT](false)
    },
    async searchServer (pageNo) {
      const {data: {gasPriceList = []}} = await this.$axiosForm.post(
        GETORDER,
        Object.assign(this.params, {
          count: this.page.count,
          page: pageNo,
        }),
        {
          headers: {
            token: this.tokenId,
          },
        },
      )

      return gasPriceList
    },
    toLoginServer (e) {
      if (e && e.data && parseInt(e.data.code, 10) === 10029) {
        setTimeout(() => {
          this.toLogin().then(() => {
            this.search()
          })
        }, 2000)
      }
    },
    backHandler () {
      // this.$router.go(-1)
      this.nativeBack()
    },
    itemClickHandler (id) {
      this.$router.push({
        name: 'detail',
        params: {
          id,
        },
      })
    },
  },
}
</script>

<style lang="postcss">
@n p{
  @b order{
    overflow: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    @e split{
      margin-top: 88px;
      height: 16px;
      background: #F2F2F7;
    }
    @e list{
      flex: 1;
      padding-bottom: 40px;
      -webkit-overflow-scrolling: touch;
      overflow: scroll;
      &::-webkit-scrollbar{
        width: 0;
        height: 0;
      }
    }
    @e item{
      padding: 32px;
      position: relative;
      border-bottom: 1px solid #D9D9D9; /* no */

      + .p-order-item{
      }
    }

    @e line1{
      display: flex;
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #1A1A1A;
      line-height: 32px;
      margin-bottom: 16px;
      @e left{
        flex: 1;
        word-break: break-all;
      }
      @e right{
        flex: 1;
        word-break: break-all;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #1A1A1A;
        text-align: right;
        line-height: 28px;
        /* display: flex; */

        @e num{
          color: #FF5C01;
        }
      }
    }
    @e line2{
      display: flex;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #999999;
      line-height: 28px;
      margin-bottom: 16px;
      @e left{
        margin-right: 16px;
      }
      @e right{}
    }
    @e line3{
      display: flex;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #999999;
      line-height: 28px;
      @e left{
        margin-right: 16px;
      }
      @e right{
        @m 2{
          color: #5191FE;
        }
      }
    }

    @e go{
      background: #FFFFFF;
      border: 2px solid #999999;
      border-radius: 24px;
      line-height: 48px;
      display: flex;
      position: absolute;
      bottom: 32px;
      right: 32px;
      font-size: 24px;
      color: #666666;
      padding: 0 24px;

      /* &::before{
        width: 28px;
        height: 28px;
        content: ' ';
        display: block;
        margin: 10px 16px 10px 24px;
        background: url(../images/go@2x.png);
        background-size: 100% 100%;
      } */
    }
    @e loading{
      position: relative;
      height: 100px;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    @e empty{
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin-top: 88px;
      @e icon{
        width: 280px;
        height: 214px;
        margin: 0 auto;
        background: url(../images/order-empty.png);
        background-size: 100% 100%;
      }
      @e msg{
        margin-top: 48px;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #999999;
        text-align: center;
        line-height: 1;
        margin-bottom: 80px;
      }
    }
  }
}
</style>
